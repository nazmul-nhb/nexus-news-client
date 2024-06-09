import useGetArticles from "../../hooks/useGetArticles";
import { articleLoader } from "../LoadingSpinners/Loaders";
import SectionHeader from "../SectionHeader/SectionHeader";


const LatestNews = () => {
    const { isLoading, data: latestNews } = useGetArticles(['latestNews'], 'sort=time_descending&size=4');

    if (isLoading) return articleLoader;
    return (
        <div className="flex-grow w-full lg:w-1/3 ">
            <SectionHeader heading={"Latest News"}/>
            <div className="grid md:grid-cols-2 gap-2">
                {
                    latestNews?.map(article => <div className="border p-2" key={article._id}>
                        <img src={article.thumb_image} alt={article.headline} />
                        <h4 className="">{article.headline}</h4>
                    </div>)
                }
            </div>
        </div>
    );
};

export default LatestNews;