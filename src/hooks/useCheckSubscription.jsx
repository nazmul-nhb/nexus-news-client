import useAxiosSecure from './useAxiosSecure';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import useNexusUsers from './useNexusUsers';
import Swal from 'sweetalert2';

const useCheckSubscription = () => {
    const { user, userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: nexusUser = {} } = useNexusUsers(['nexusUser', user?.email], user?.email);

    const checkSubscription = () => {
        if (user?.email && !userLoading) {
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
        }
    }
    return checkSubscription;
};

export default useCheckSubscription;