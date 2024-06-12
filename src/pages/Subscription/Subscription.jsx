import { FaSackDollar } from "react-icons/fa6";
import customStyles from '../../utilities/selectStyles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Plans from "../../components/Plans/Plans";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useNexusUsers from "../../hooks/useNexusUsers";
import moment from "moment";
import { buttonLoader } from "../../components/LoadingSpinners/Loaders";
import banner from '../../assets/sub-banner.jpg'
import { buttonNormal } from "../../utilities/buttonStyles";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import useUserRole from "../../hooks/useUserRole";
import useGetUserType from "../../hooks/useGetUserType";

const animatedComponents = makeAnimated();

const subscriptionOptions = [
    { value: 'minute', label: 'Minute Monitor' },
    { value: 'week', label: 'Weekly Wrap-Up' },
    { value: 'month', label: 'Monthly Marvel' },
    { value: 'year', label: 'Yearly Yonder' }
]

const Subscription = () => {
    const { user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { isFetching, data: nexusUser = {} } = useNexusUsers(['nexusUser', user?.email], user?.email);
    const { role } = useUserRole();
    const { premiumUser } = useGetUserType();

    const handleSubscription = (e) => {
        e.preventDefault();

        if (role === 'admin') {
            return Swal.fire({
                title: 'Alert!',
                text: 'Admins Need Not Buy Subscriptions!',
                icon: 'warning',
                confirmButtonText: 'Close'
            });
        }

        // check if a user is already subscribed and return with a modal
        if (premiumUser && nexusUser?.expires_on) {
            const expiration = moment(nexusUser.expires_on);
            const duration = moment.duration(expiration.diff(moment()));

            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            return Swal.fire({
                title: `Already Subscribed to ${nexusUser?.current_plan}!`,
                text: `You Have An Active Plan with ${days} Day(s) and ${hours} Hour(s) Remaining!`,
                icon: "success"
            });
        }

        const { label } = selectedPlan;
        let subscriptionPlan = { plan: label, status: 'pending', user: user?.email };

        switch (selectedPlan.value) {
            case "minute":
                subscriptionPlan.price = 1;
                subscriptionPlan.expires_in = { duration: 1, time: 'minute' };
                break;
            case "week":
                subscriptionPlan.price = 5;
                subscriptionPlan.expires_in = { duration: 1, time: 'week' };
                break;
            case "month":
                subscriptionPlan.price = 15;
                subscriptionPlan.expires_in = { duration: 1, time: 'month' };
                break;
            case "year":
                subscriptionPlan.price = 150;
                subscriptionPlan.expires_in = { duration: 1, time: 'year' };
                break;

            default:
                subscriptionPlan.price = 0;
                break;
        }

        Swal.fire({
            title: "Go to Payment Page?",
            text: `You Have Selected "${subscriptionPlan?.plan}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed to Payment!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/payment', subscriptionPlan)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId || res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                            navigate('/payment');
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Something Went Wrong! Try Di!',
                                icon: 'error',
                                confirmButtonText: 'Close'
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.response,
                            icon: 'error',
                            confirmButtonText: 'Close'
                        });
                    })
            }
        })
    }

    if (isFetching) return buttonLoader;

    return (
        <section className="mx-auto md:py-8 py-2 px-8 md:px-14 flex flex-col items-center gap-5 pb-8">
            <Helmet>
                <title>Subscriptions - Nexus News</title>
            </Helmet>
            {/* TO-DO: Add Banner Later */}
            {/* Banner */}
            <figure className="relative -mt-2 md:-mt-8 opacity-95">
                <img className="w-full aspect-[1.8/1]" src={banner} alt="Banner" />
                <div className="absolute font-black text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-nexusBG text-white text-lg md:text-2xl lg:text-5xl">SUBSCRIBE TO OUR PREMIUM PLANS</div>
            </figure>

            <SectionHeader subHeading={'Our Premium Plans'} />
            <Plans inSubscriptionPage={true} />
            <form className="flex flex-col gap-3 items-center" onSubmit={handleSubscription}>
                <div className="w-[240px] flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-secondary">
                        <label className="font-medium" htmlFor="subscription"><FaSackDollar /></label>
                        <Select isClearable
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setSelectedPlan}
                            options={subscriptionOptions}
                            required
                            placeholder="Select Plan"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-secondary focus:outline-0" id='subscription' name='subscription'
                        />
                    </div>
                </div>
                <div className='flex items-center justify-center'><button className={buttonNormal} type="submit">Subscribe</button></div>
            </form >
        </section>

    );
};

export default Subscription;