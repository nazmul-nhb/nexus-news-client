import { useEffect } from "react";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";


const Home = () => {

    useEffect(() => {
        document.title = "Home - Nexus News";
    }, []);

    return (
        <section className="">
            <TrendingArticles/>
        </section>
    );
};

export default Home;
