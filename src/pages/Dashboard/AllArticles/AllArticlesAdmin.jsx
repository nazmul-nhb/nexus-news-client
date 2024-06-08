import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminActionArticle from "../../AdminActionArticle/AdminActionArticle";
import useUserRole from "../../../hooks/useUserRole";

const AllArticlesAdmin = () => {
    const {role, roleLoading} = useUserRole();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: allRawArticles = [], isError, error, refetch } = useQuery({
        enabled: true,
        queryKey: ['allRawArticles', role],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/all?role=${role}&sort=time_descending`);
            return res.data;
        }
    })

    // console.log(allRawArticles);

    return (
        <section>
            All is Well!!!
            <h3>Total {allRawArticles?.length} Articles</h3>
            <div className="grid lg:grid-cols-2 gap-6">
                {
                    allRawArticles?.map(article => <AdminActionArticle key={article._id}
                        article={article}
                        refetch={refetch}
                    />)
                }
            </div>
        </section>
    );
};

export default AllArticlesAdmin;