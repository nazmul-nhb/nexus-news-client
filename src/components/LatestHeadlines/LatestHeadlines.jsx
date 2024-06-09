import Marquee from "react-fast-marquee";
import moment from "moment";
import useGetArticles from "../../hooks/useGetArticles";
import useHandleArticleDetails from "../../hooks/useHandleArticleDetails";
import logo from '../../assets/logo-bw.png'
import { buttonLoader } from "../LoadingSpinners/Loaders";

const LatestHeadlines = () => {
    const handleGoToArticleDetails = useHandleArticleDetails();
    const { isLoading, data: latestArticles } = useGetArticles(['latestArticles'], 'sort=time_descending&size=12');

    if (isLoading) {
        return buttonLoader;
    }

    return (
        <div className="flex items-center gap-2">
            <figure className="flex items-center text-nexus-primary pr-2">
                <img className="h-6" src={logo} alt="logo" />
                <h3 className="">Latest: </h3>
            </figure>
            <Marquee pauseOnHover={true} speed={20}>
                <div className="flex items-center">
                    {
                        latestArticles?.map(article => <div key={article._id} >
                            <button onClick={() => handleGoToArticleDetails(article._id)}>
                                <h3 className="text-nexus-secondary hover:text-nexus-primary transition-all duration-300">
                                    <span className="mx-3">•</span>
                                    {article.headline} ({moment(article.posted_on).fromNow()})
                                </h3>
                            </button>
                        </div>)
                    }
                </div>
            </Marquee>
        </div>
    );
};

export default LatestHeadlines;