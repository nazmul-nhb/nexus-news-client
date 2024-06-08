import ArticleCard from "../../components/ArticleCard/ArticleCard";
import useGetArticles from "../../hooks/useGetArticles";

const PremiumArticles = () => {
    const { isLoading, data: premiumArticles } = useGetArticles(['premiumArticles'], 'isPremium=true');

console.log(premiumArticles);
    
    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {
                premiumArticles?.map(article =><ArticleCard
                     key={article._id}
                     article={article}
                     fromPremium={true}
                      />
                )
            }
            </div>
        </section>
    );
};

export default PremiumArticles;