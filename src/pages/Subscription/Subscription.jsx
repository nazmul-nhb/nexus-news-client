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

    const handleSubscription = (e) => {
        e.preventDefault();

        // check if a user is already subscribed and return with a modal
        if (nexusUser?.isPremium && nexusUser?.expires_on) {
            const expiration = moment(nexusUser.expires_on);
            const duration = moment.duration(expiration.diff(moment()));

            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            return Swal.fire({
                title: `Already Subscribed to ${nexusUser?.current_plan}!`,
                text: `You Have An Active Plan with ${days} Days and ${hours} Hours Remaining!`,
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
            text: `You have selected ${subscriptionPlan?.plan}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Take Me to Payment Page!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/payment', subscriptionPlan)
                    .then(res => {
                        if (res.data.insertedId || res.data.modifiedCount > 0) {
                            navigate('/payment');
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Error Happened! Try Again!',
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

    return (
        <section className="mx-auto my-2 md:my-8 py-2 px-8 md:px-14">
            <Helmet>
                <title>Subscription - Nexus News</title>
            </Helmet>
            {/* TO-DO: Add Banner Later */}
            {/* Banner */}
            <figure>
                <img src="" alt="" />
                Banner Goes Here
            </figure>

            <Plans inSubscriptionPage={true} />

            <form onSubmit={handleSubscription}>
                <div className="w-[240px] flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                        <label className="font-medium" htmlFor="subscription"><FaSackDollar /></label>
                        <Select isClearable
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setSelectedPlan}
                            options={subscriptionOptions}
                            required
                            placeholder="Select Plan"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0" id='subscription' name='subscription'
                        />
                    </div>
                </div>
                <button type="submit">Subscribe</button>
            </form >
        </section>

    );
};

export default Subscription;