import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useUserRole = () => {
    const { user, loading: userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = '', isPending } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !userLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/single?email=${user?.email}`);
            console.log(data);
            return data?.role;
        }
    })

    return { role, isPending };
}

export default useUserRole