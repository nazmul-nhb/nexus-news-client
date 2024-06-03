import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ArticleDetails = () => {
    const {id} =useParams();
    const axiosPublic = useAxiosPublic();

    const { data: article } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axiosPublic(`/articles/${id}`)
            return res.data;
        }
    });

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
           Hello Article : {article?.headline}
           <br /><br />
           View: {article?.view_count}
        </section>
    );
};

export default ArticleDetails;