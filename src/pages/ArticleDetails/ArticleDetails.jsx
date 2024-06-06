import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SameCategoryArticles from "../../components/SameCategoryArticles/SameCategoryArticles";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: article, refetch } = useQuery({
        enabled: !!id,
        queryKey: ['article', id],
        queryFn: async () => {
            const res = await axiosSecure(`/articles/${id}`)
            return res.data;
        }
    });

    // refetch if clicked on the similar id links
    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    if (isLoading) {
        return <ArticleLoading />
    }

    const { headline, view_count, full_image, tags, publisher, description } = article;

    return (
        <section className="grid lg:grid-cols-7 gap-6 mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{headline} - Nexus News</title>
            </Helmet>
            <div className="col-span-5">
                <h3 className="">{headline}</h3>
                <img src={full_image} alt={headline} />
                <br /><br />
                View: {view_count}
                <p>{description}</p>
                <h3>{publisher}</h3>
                {
                    tags?.map((tag, index) => <div key={index}>
                        <h5 className="first-letter:capitalize">{tag}</h5>
                    </div>)
                }
            </div>


            <div className="col-span-2">
                <h3 className="">Related Articles</h3>
                <SameCategoryArticles tags={tags} />
            </div>
        </section>
    );
};

export default ArticleDetails;