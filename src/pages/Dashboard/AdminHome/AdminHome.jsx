import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import { useEffect, useState } from "react";
import PublisherPieChart from "../../../components/PublisherPieChart/PublisherPieChart";
import SubscriptionStats from "../../../components/SubscriptionStats/SubscriptionStats";
import RevenueStats from "../../../components/RevenueStats/RevenueStats";

const AdminHome = () => {
    const [publicationData, setPublicationData] = useState([['Publication', 'Percentage']]);
    const { role, roleLoading } = useUserRole();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: publicationPercentages = [], isError, error } = useQuery({
        enabled: !!role,
        queryKey: ['publicationPercentages', role],
        queryFn: async () => {
            const res = await axiosSecure.get('/articles/publication-percentages');
            return res.data;
        },
    });

    useEffect(() => {
        if (publicationPercentages.length > 0) {
            const formattedData = publicationPercentages.map(({ publication, percentage }) => [publication, parseInt(percentage)]);
            setPublicationData([['Publication', 'Percentage'], ...formattedData]);
        }
    }, [publicationPercentages]);

    if (isLoading || roleLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    // console.log(publicationData);

    return (
        <section className="mx-auto w-full h-full flex flex-col gap-6">

            <PublisherPieChart publicationData={publicationData} />

            <SubscriptionStats />
            <RevenueStats />
        </section>
    );
};

export default AdminHome;