import { Helmet } from "react-helmet-async";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Publishers from "../../components/Publishers/Publishers";
import UsersStats from "../../components/UsersStats/UsersStats";


const Home = () => {

    return (
        <section className="space-y-8">
            <Helmet>
                <title>Home - Nexus News</title>
            </Helmet>

            <TrendingArticles />

            <Publishers/>

            <UsersStats/>
        </section>
    );
};

export default Home;
