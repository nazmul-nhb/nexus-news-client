import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyArticles = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: userArticles = [] } = useQuery({
        queryKey: ['userArticles'],
        queryFn: async () => {
            const res = await axiosPublic(`/user/articles/${user?.email}`)
            return res.data;
        }
    });

    console.log(userArticles);

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            {user.displayName}&rsquo;s Vua Articles
        </section>
    );
};

export default MyArticles;