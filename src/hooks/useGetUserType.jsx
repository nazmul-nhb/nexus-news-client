import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetUserType = () => {
    const { user, userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: premiumUser = false, isPending: premiumLoading } = useQuery({
        queryKey: ['premiumUser', user?.email],
        enabled: !userLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/single?email=${user?.email}`);
            // console.log(data);
            return data?.isPremium || false;
        }
    })

    return { premiumUser, premiumLoading };
}

export default useGetUserType;