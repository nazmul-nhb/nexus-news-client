import { Helmet } from "react-helmet-async";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Publishers from "../../components/Publishers/Publishers";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Plans from "../../components/Plans/Plans";
import PublishersList from "../../components/PublishersList/PublishersList";
import LatestNews from "../../components/LatestNews/LatestNews";
import UsersStats from "../../components/Graphs/UsersStats/UsersStats";


const Home = () => {
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            // setShowSubscriptionModal(true);
        }, 10000);
    }, []);

    return (
        <section className="space-y-8 mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>Home - Nexus News</title>
            </Helmet>

            <div className="flex flex-col lg:flex-row justify-between gap-3">
                <TrendingArticles />
                <LatestNews />
            </div>

            <Publishers />

            <PublishersList />

            <UsersStats />

            <Plans />

            {/* Subscription Modal */}
            {showSubscriptionModal &&
                <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-11 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5fe] border shadow-lg h-full rounded-lg p-6 flex flex-col justify-around'>
                        <IoIosCloseCircle onClick={() => setShowSubscriptionModal(false)} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-primary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />
                        <h3 className="animate__animated animate__headShake text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Hello</h3>
                    </div>
                </dialog>
            }
        </section>
    );
};

export default Home;
