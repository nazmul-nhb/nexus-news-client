import { useEffect } from "react";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";


const Home = () => {

    useEffect(() => {
        document.title = "Home - Nexus News";
    }, []);

    return (
        <section className="mx-6 md:mx-10 p-2 md:px-4">
            This is Home!
            <TrendingArticles/>
        </section>
    );
};

export default Home;
