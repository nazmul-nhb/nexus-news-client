import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PublishersList = () => {
    const axiosPublic = useAxiosPublic();

    const { isFetching, isError, error, data: listPublishers = [] } = useQuery({
        queryKey: ['listPublishers'],
        queryFn: async () => {
            const res = await axiosPublic('/publishers')
            return res.data;
        }
    });
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
                listPublishers?.map(pub=><div className="border p-3" key={pub._id}>
                    <img src={pub.publisher_logo} alt={pub.publisher} />
                    <h4 className="">{pub.publisher}</h4>
                </div>)
            }
        </div>
    );
};

export default PublishersList;