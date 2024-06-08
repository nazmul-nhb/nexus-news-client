import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useNexusUsers from "../../hooks/useNexusUsers";
import moment from "moment";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SubscriptionChecker = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: nexusUser = {} } = useNexusUsers(['nexusUser', user?.email], user?.email);

    useEffect(() => {
        if (!user || !user.email || !nexusUser.expires_on) return;
        const intervalId = setInterval(() => {
            const now = moment();
            const expiration = moment(nexusUser?.expires_on);

            if (now.isAfter(expiration)) {
                toast.info('Your subscription has expired.');
                // reset the user subscription properties
                const resetUser = async () => {
                    const updatedUser = {
                        isPremium: false,
                        premium_taken: null,
                        expires_on: null,
                        current_plan: null
                    };

                    const res = await axiosSecure.patch(`/users/${user?.email}`, updatedUser);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Expired!",
                            text: `Your Subscription Has Expired! Renew Now?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Renew Subscription!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // redirect to subscription page
                                navigate('/subscription');
                            }
                        })
                    }
                };
                // call reset function
                resetUser();
            }
        }, 60000);
        // clear interval
        return () => clearInterval(intervalId);

    }, [nexusUser, user, axiosSecure, navigate]);
    return null;
};

export default SubscriptionChecker;
