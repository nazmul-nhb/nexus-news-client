import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    

    const { isLoading: paymentLoading, data: paymentInfo = {} } = useQuery({
        queryKey: ['paymentInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`);
            return res.data;
        }
    })

    // console.log(price);
    const { price, plan, expires_in } = paymentInfo;

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/payment/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
        console.log(price);
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.error('confirm error')
        }
        else {
            console.log('payment intent: ', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id: ', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment info in the database
                const updatedPaymentInfo = {
                    user: user?.email,
                    transactionId: paymentIntent.id,
                    premium_taken: moment().format("YYYY-MM-DD HH:mm:ss"),
                    status: 'paid'
                }

                const res = await axiosSecure.patch(`/payment/${user?.email}`, updatedPaymentInfo);

                if (res.data.modifiedCount > 0) {
                    toast.success('Payment Successful!');
                    const updatedUser = {
                        premium_taken: moment().format("YYYY-MM-DD HH:mm:ss"),
                        expires_on: moment().clone().add(expires_in?.duration, expires_in?.time).format("YYYY-MM-DD HH:mm:ss"),
                        isPremium: true,
                        current_plan: plan
                    }
                    // update user info after successful payment
                    const result = await axiosSecure.patch(`/users/${user?.email}`, updatedUser);
                    console.log('user: ', result);
                    if (result.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Congratulations!",
                            text: "Now You’re a Premium User!",
                            icon: "success"
                        });
                        navigate('/premium-articles');
                    }
                }
            }
        }
    }

    if (paymentLoading) {
        return <ArticleLoading />
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
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
            <button className="border rounded-lg border-nexus-secondary px-3  my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;