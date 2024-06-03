import { Helmet } from "react-helmet-async";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";


const Home = () => {

    return (
        <section className="">
            <Helmet>
                <title>Home - Nexus News</title>
            </Helmet>

            <TrendingArticles />
        </section>
    );
};

export default Home;
