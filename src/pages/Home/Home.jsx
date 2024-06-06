import { Helmet } from "react-helmet-async";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Publishers from "../../components/Publishers/Publishers";


const Home = () => {

    return (
        <section className="">
            <Helmet>
                <title>Home - Nexus News</title>
            </Helmet>

            <TrendingArticles />

            <Publishers/>
        </section>
    );
};

export default Home;
