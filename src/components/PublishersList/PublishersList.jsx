import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { articleLoader } from "../LoadingSpinners/Loaders";

const PublishersList = () => {
    const axiosPublic = useAxiosPublic();

    const { isFetching, data: listPublishers = [] } = useQuery({
        queryKey: ['listPublishers'],
        queryFn: async () => {
            const res = await axiosPublic('/publishers')
            return res.data;
        }
    });

    if (isFetching) {
        return articleLoader;
    }

    return (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
                listPublishers?.map(pub => <div className="flex flex-col items-center gap-3 bg-nexusBG justify-around border p-3 border-nexus-primary shadow-md shadow-nexus-primary" key={pub._id}>
                    <img src={pub.publisher_logo} alt={pub.publisher} />
                    <h4 className="text-lg font-kreonSerif font-bold">{pub.publisher}</h4>
                </div>)
            }
        </section>
    );
};

export default PublishersList;