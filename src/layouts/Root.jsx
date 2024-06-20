import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SiteTitle from '../components/SiteTitle/SiteTitle';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useGetUserType from '../hooks/useGetUserType';

const Root = () => {
    const { user, userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { premiumUser } = useGetUserType();

    const { data: nexusUser = {} } = useQuery({
        enabled: !!user && !userLoading,
        queryKey: ['nexusUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/single?email=${user?.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (!user || !user.email || !premiumUser) return;
        const intervalId = setInterval(() => {
            const now = moment();
            const expiration = moment(nexusUser?.expires_on);

            if (now.isAfter(expiration)) {
                toast.error('Your Subscription Has expired.');
                // reset the user subscription properties
                const resetUserSubscription = async () => {
                    const updatedUser = { isPremium: false };

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
                resetUserSubscription();
            }
        }, 30000);
        // clear interval
        return () => clearInterval(intervalId);

    }, [nexusUser, user, axiosSecure, navigate, premiumUser]);

    return (
        <>
            <SiteTitle />
            <Navbar />
            <main className="max-w-[1920px] mx-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Root;
