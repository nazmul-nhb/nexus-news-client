import { Helmet } from "react-helmet-async";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Publishers from "../../components/Publishers/Publishers";
import { useEffect } from "react";
import Plans from "../../components/Plans/Plans";
import PublishersList from "../../components/PublishersList/PublishersList";
import LatestNews from "../../components/LatestNews/LatestNews";
import UsersStats from "../../components/Graphs/UsersStats/UsersStats";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Environment from "../../components/Environment/Environment";
import useGetUserType from "../../hooks/useGetUserType";

const Home = () => {
    const navigate = useNavigate();
    const { premiumUser } = useGetUserType();

    useEffect(() => {
        setTimeout(() => {
            if (!premiumUser) {
                Swal.fire({
                    title: "Check Out Our Premium Plans!",
                    text: `Get Exciting Features! Subscribe to Premium Plans Now!`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Subscribe!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/subscription');
                    }
                });
            }
        }, 30000);
    }, [navigate, premiumUser]);

    return (
        <section className="space-y-8 mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>Home - Nexus News</title>
            </Helmet>

            <div className="flex flex-col lg:flex-row justify-between gap-3">
                <TrendingArticles />
                <LatestNews />
            </div>

            <div className="border-t w-full my-16 h-5 lg:h-12"></div>
            <SectionHeader heading={"All Publishers"} subHeading={"Our Top Publishers"} />

            <div className="w-[99%]">
                <Publishers />
            </div>

            <SectionHeader subHeading={"Other Publishers"} />
            <PublishersList />

            <div className="border-t w-full my-16 h-5 lg:h-12"></div>
            <SectionHeader heading={"User Statistics"} />
            <UsersStats />

            <div className="border-t w-full my-16 h-5 lg:h-12"></div>
            <SectionHeader heading={"Our Premium Plans"} />
            <Plans />

            <div className="border-t w-full my-16 h-5 lg:h-12"></div>
            <Environment />
        </section>
    );
};

export default Home;
