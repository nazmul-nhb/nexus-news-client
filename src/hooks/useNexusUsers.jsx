import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNexusUsers = (queryKey, email='') => {
    const axiosSecure = useAxiosSecure();

    const { isLoading: isNexusUserLoading, data, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            if (email) {
                const res = await axiosSecure.get(`/users/single?email=${email}`);
                return res.data;
            } else {
                const res = await axiosSecure.get(`/users`);
                return res.data;
            }
        }
    });
    return { isNexusUserLoading, data, refetch };
};

export default useNexusUsers;