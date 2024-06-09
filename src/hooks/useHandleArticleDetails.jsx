import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import useGetUserType from "./useGetUserType";

const useHandleArticleDetails = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const { premiumUser } = useGetUserType();

    const handleGoToArticleDetails = async (id) => {
        if (!user) {
            Swal.fire({
                title: "Not Logged In!",
                text: `Please Login to Read the Article!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Proceed to Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        try {
            const res = await axiosSecure(`/articles/${id}`);
            const securedArticle = res.data;

            if (securedArticle.isPremium && !premiumUser) {
                Swal.fire({
                    title: "Premium Article!",
                    text: `This Article Needs Subscription to Read!`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Proceed to Subscription!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/subscription');
                    }
                });
                return;
            }
            navigate(`/news/${id}`);
        } catch (error) {
            console.error("Error Fetching Article:", error);
        }
    };
    return handleGoToArticleDetails;
};

export default useHandleArticleDetails;
