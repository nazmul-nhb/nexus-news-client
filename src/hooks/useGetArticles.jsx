import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetArticles = (queryKey, queryParams) => {
    const axiosPublic = useAxiosPublic();

    const { isLoading, data = [], isError, error, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles?${queryParams}`);
            return res.data;
        }
    });
    return { isLoading, data, isError, error, refetch }
};

export default useGetArticles;