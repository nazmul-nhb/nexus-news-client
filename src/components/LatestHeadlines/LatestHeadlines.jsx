import ArticleLoading from "../LoadingSpinners/ArticleLoading";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import moment from "moment";
import useGetArticles from "../../hooks/useGetArticles";

const LatestHeadlines = () => {
    const { isLoading, data: latestArticles } = useGetArticles(['latestArticles'], 'sort=time_descending&size=12');

    if (isLoading) {
        return <ArticleLoading />
    }

    return (
        <div className="flex items-center gap-3">
            <h3 className="">Latest: </h3>
            <Marquee pauseOnHover={true} speed={25}>
                <div className="flex items-center">
                    {
                        latestArticles?.map(article => <div key={article._id} >
                            <Link to={`/news/${article._id}`}>
                                <h3 className="text-nexus-primary hover:text-nexus-secondary transition-all duration-300">
                                    <span className="mx-3">•</span>
                                    {article.headline} ({moment(article.posted_on).fromNow()})
                                </h3>
                            </Link>
                        </div>)
                    }
                </div>
            </Marquee>
        </div>
    );
};

export default LatestHeadlines;