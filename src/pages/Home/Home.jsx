import { Helmet } from "react-helmet-async";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Publishers from "../../components/Publishers/Publishers";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Plans from "../../components/Plans/Plans";
import PublishersList from "../../components/PublishersList/PublishersList";
import LatestNews from "../../components/LatestNews/LatestNews";
import UsersStats from "../../components/Graphs/UsersStats/UsersStats";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
// import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { buttonNormal } from "../../utilities/buttonStyles";


const Home = () => {
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setShowSubscriptionModal(true);
            // Swal.fire({
            //     title: "Hi There!",
            //     text: `Get Exciting Features! Get Our Premium Plans!`,
            //     icon: "warning",
            //     showCancelButton: true,
            //     confirmButtonColor: "#3085d6",
            //     cancelButtonColor: "#d33",
            //     confirmButtonText: "Buy Subscription!"
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         navigate('/subscription');
            //     }
            // });
        }, 10000);
    }, [navigate]);

    return (
        <section className="space-y-8 mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
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

            {/* Subscription Modal */}
            {showSubscriptionModal &&
                <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-11 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5fe] border shadow-lg h-full rounded-lg p-6 flex flex-col items-center justify-around'>
                        <IoIosCloseCircle onClick={() => setShowSubscriptionModal(false)} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-primary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />
                        <h3 className="animate__animated animate__headShake text-center text-nexus-secondary font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Hello There</h3>
                        <h5 className="max-[430px]:text-lg text-2xl text-nexus-primary font-bold">Did You Know about Our Premium Plans?</h5>
                        <Link onClick={() => setShowSubscriptionModal(false)} className={buttonNormal} to={'/subscription'}>Visit Here!</Link>
                    </div>
                </dialog>
            }
        </section>
    );
};

export default Home;
