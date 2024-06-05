import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SameCategoryArticles from "../../components/SameCategoryArticles/SameCategoryArticles";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";
import { useEffect } from "react";

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
    
    const { headline, view_count, thumb_image, tags, publisher, description } = article;

    return (
        <section className="grid lg:grid-cols-7 mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <div className="col-span-5">
                <h3 className="">{headline}</h3>
                <br /><br />
                View: {view_count}
            </div>

            <div className="col-span-2">
                <h3 className="">Related Articles</h3>
                <SameCategoryArticles tags={tags} />
            </div>
        </section>
    );
};

export default ArticleDetails;