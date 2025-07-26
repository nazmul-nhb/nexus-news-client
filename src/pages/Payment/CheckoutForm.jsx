import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { articleLoader, buttonLoader } from '../../components/LoadingSpinners/Loaders';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { buttonInvert } from '../../utilities/buttonStyles';

const CheckoutForm = () => {
	const [error, setError] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [transactionId, setTransactionId] = useState('');
	const [isStripeLoading, setIsStripeLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const navigate = useNavigate();

	// load payment info
	const { isLoading: paymentLoading, data: paymentInfo = {} } = useQuery({
		queryKey: ['paymentInfo', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/payment/${user?.email}`);
			return res.data;
		},
	});

	const { price, plan, expires_in } = paymentInfo;

	useEffect(() => {
		if (price > 0) {
			axiosSecure.post('/payment/create-payment-intent', { price }).then((res) => {
				setClientSecret(res.data.clientSecret);
			});
		}
		// console.log(price);
	}, [axiosSecure, price]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsStripeLoading(true);

		if (!stripe || !elements) {
			setIsStripeLoading(false);
			return;
		}

		const card = elements.getElement(CardElement);

		if (card === null) {
			setIsStripeLoading(false);
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			console.error('Payment Error: ', error);
			setError(error.message);
			setIsStripeLoading(false);
		} else {
			console.log('Payment Method: ', paymentMethod);
			setError('');
		}

		// confirm payment
		const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || 'anonymous',
						name: user?.displayName || 'anonymous',
					},
				},
			}
		);

		if (confirmError) {
			console.error('confirm error');
			setIsStripeLoading(false);
		} else {
			// console.log('payment intent: ', paymentIntent)
			if (paymentIntent.status === 'succeeded') {
				// console.log('transaction id: ', paymentIntent.id);
				setTransactionId(paymentIntent.id);
				setIsStripeLoading(false);

				// now save the payment info in the database
				const updatedPaymentInfo = {
					user: user?.email,
					transactionId: paymentIntent.id,
					premium_taken: moment().format('YYYY-MM-DD HH:mm:ss'),
					status: 'paid',
				};

				const res = await axiosSecure.patch(
					`/payment/${user?.email}`,
					updatedPaymentInfo
				);

				if (res.data.modifiedCount > 0) {
					toast.success('Payment Successful!');
					const updatedUser = {
						premium_taken: moment().format('YYYY-MM-DD HH:mm:ss'),
						expires_on: moment()
							.clone()
							.add(expires_in?.duration, expires_in?.time)
							.format('YYYY-MM-DD HH:mm:ss'),
						isPremium: true,
						current_plan: plan,
						last_transaction_ID: paymentIntent.id,
					};

					// update user info after successful payment
					const result = await axiosSecure.patch(
						`/users/${user?.email}`,
						updatedUser
					);

					if (result.data.modifiedCount > 0) {
						Swal.fire({
							title: 'Congratulations!',
							text: 'Now You’re A Premium User!',
							icon: 'success',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Go to Profile!',
						}).then((result) => {
							if (result.isConfirmed) {
								navigate('/profile');
							}
						});
					}
				}
			}
		}
	};

	if (paymentLoading) {
		return articleLoader;
	}

	return (
		<section className="mx-auto pt-6 flex flex-col lg:flex-row lg:items-center justify-center gap-6">
			{paymentInfo ? (
				<Fragment>
					<div className="text-base md:text-lg space-y-5 text-center px-6 py-3 shadow-md shadow-nexus-primary border border-nexus-primary bg-nexusBG rounded-xl">
						<SectionHeader subHeading={'Pay for Your Plan'} />
						<h4 className="font-medium">
							Selected Plan:{' '}
							<span className="text-nexus-primary font-bold">{plan}</span>
						</h4>
						<h4 className="font-medium">
							Validity:{' '}
							<span className="text-nexus-primary font-bold">
								{expires_in?.duration} {expires_in?.time}
							</span>
						</h4>
						<h4 className="font-medium">
							Subscription Fee:{' '}
							<span className="text-nexus-primary font-bold">${price}</span>
						</h4>
					</div>
					<form className="flex-1 space-y-5" onSubmit={handleSubmit}>
						<SectionHeader subHeading={'Enter Your Card Information'} />
						<CardElement
							className="shadow-md shadow-nexus-primary border border-nexus-primary bg-nexusBG px-3 py-1 rounded-3xl"
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
									invalid: {
										color: '#9e2146',
									},
								},
							}}
						/>
						<div className="flex items-center justify-center">
							<button
								className={buttonInvert}
								type="submit"
								disabled={!stripe || !clientSecret}
							>
								{isStripeLoading ? buttonLoader : 'Pay Now'}
							</button>
						</div>
						<p className="text-red-600 text-center">{error}</p>
						{transactionId && (
							<p className="text-green-700 flex items-center justify-center">
								{' '}
								Your Transaction ID: {transactionId}
							</p>
						)}
					</form>
				</Fragment>
			) : (
				<p className="text-red-600 font-bold flex items-center justify-center">
					You Did Not Select Any Plan!
				</p>
			)}
		</section>
	);
};

export default CheckoutForm;
