import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNexusUsers = (email) => {
    const axiosSecure = useAxiosSecure();

    const queryKey = email ? ['nexusUsers', email] : ['nexusUsers']

    const { isFetching, data: nexusUsers, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            if (email) {
                const res = await axiosSecure.get(`/users?email=${email}`);
                return res.data;
            } else {
                const res = await axiosSecure.get(`/users`);
                return res.data;
            }
        }
    });
    return { isFetching, nexusUsers, refetch }
};

export default useNexusUsers;