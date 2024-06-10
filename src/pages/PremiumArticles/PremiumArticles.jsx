import { Helmet } from "react-helmet-async";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import useGetArticles from "../../hooks/useGetArticles";
import { articleLoader } from "../../components/LoadingSpinners/Loaders";

const PremiumArticles = () => {
    const { isLoading, data: premiumArticles } = useGetArticles(['premiumArticles'], 'isPremium=true');

    // console.log(premiumArticles);

    if (isLoading) return articleLoader;

    return (
        <section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>Premium Articles - Nexus News</title>
            </Helmet>
            <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {
                    premiumArticles?.map(article => <ArticleCard
                        key={article._id}
                        article={article}
                    />
                    )
                }
            </div>
        </section>
    );
};

export default PremiumArticles;