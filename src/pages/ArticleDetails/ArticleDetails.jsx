import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ArticleDetails = () => {
    const {id} =useParams();
    const axiosSecure = useAxiosSecure();

    const { data: article } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axiosSecure(`/articles/${id}`)
            return res.data;
        }
    });

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <h3 className="">{article?.headline}</h3>
           <br /><br />
           View: {article?.view_count}
        </section>
    );
};

export default ArticleDetails;