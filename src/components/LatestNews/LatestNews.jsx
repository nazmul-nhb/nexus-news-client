import useGetArticles from "../../hooks/useGetArticles";


const LatestNews = () => {
    const { isLoading, data: latestNews } = useGetArticles(['latestNews'], 'sort=time_descending&size=4');

    return (
        <section className="w-1/3 grid grid-cols-2 gap-2">
            {
                latestNews?.map(article=><div className="border p-2" key={article._id}>
                    <img src={article.thumb_image} alt={article.headline} />
                    <h4 className="">{article.headline}</h4>
                </div>)
            }
        </section>
    );
};

export default LatestNews;