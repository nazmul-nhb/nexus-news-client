import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const useHandleArticleDetails = () => {
    const { user, userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [articleID, setArticleID] = useState(null);
    const [article, setArticle] = useState({});

    const { data: nexusUser = {} } = useQuery({
        enabled: !!user && !userLoading,
        queryKey: ['nexusUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/single?email=${user?.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        const fetchArticle = async () => {
            if (user && articleID) {
                try {
                    const res = await axiosSecure(`/articles/${articleID}`);
                    setArticle(res.data);
                } catch (error) {
                    console.error("Error fetching article:", error);
                }
            }
        };
        fetchArticle();
    }, [articleID, axiosSecure, user]);

    const handleGoToArticleDetails = (id) => {
        setArticleID(id);
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

        if (!article) {
            return;
        }

        if (user && article?.isPremium && !nexusUser?.isPremium) {
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
    }
    return handleGoToArticleDetails;
};

export default useHandleArticleDetails;