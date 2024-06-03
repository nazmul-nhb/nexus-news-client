import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ArticleLoading from "../LoadingSpinners/ArticleLoading";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const LatestHeadlines = () => {
    const axiosPublic = useAxiosPublic();
    const { isLoading, data: latestArticles = [] } = useQuery({
        queryKey: ['latestArticles'],
        queryFn: async () => {
            const res = await axiosPublic('/articles?sort=time_descending&size=12')
            return res.data;
        }
    });

    if (isLoading){
        return <ArticleLoading/>
    }

    return (
        <div className="flex items-center gap-3">
            <h3 className="">Latest: </h3>
            <Marquee pauseOnHover={true} speed={25}>
                <div className="flex gap-2">
                    {
                        latestArticles?.map(article => <div key={article._id} >
                            <Link to={`/news/${article._id}`}><h3 className=""> • {article.headline}</h3></Link>
                        </div>)
                    }
                </div>
            </Marquee>
        </div>
    );
};

export default LatestHeadlines;