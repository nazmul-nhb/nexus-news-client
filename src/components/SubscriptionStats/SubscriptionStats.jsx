import { useEffect, useState } from "react";
import useUserRole from "../../hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {Chart} from "react-google-charts";

const SubscriptionStats = () => {
    const [subscriptionData, setSubscriptionData] = useState([['Plan', 'Subscription Count', { role: 'annotation' }, { role: 'style' }]]);
    const { role, roleLoading } = useUserRole();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: subscriptionStats = [], isError, error } = useQuery({
        enabled: !!role,
        queryKey: ['subscriptionStats', role],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment/subscription-stats');
            return res.data;
        },
    });

    useEffect(() => {
        if (subscriptionStats.length > 0) {
            const colors = ['#76A7FA', '#FFD700', '#32CD32', '#FF6347'];
            const formattedData = subscriptionStats.map(({ plan, count, percentage }, index) => [plan, parseInt(count), `${percentage}%`, `color: ${colors[index]}`]);
            setSubscriptionData([['Plan', 'Subscription Count', { role: 'annotation' }, { role: 'style' }]].concat(formattedData));
        } else{
            console.log('No subscription stats found.');
        }
    }, [subscriptionStats]);

    if (isLoading || roleLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    console.log(subscriptionStats);

    return (
        <div>
            {subscriptionData.length > 1 && (
                <Chart
                    chartType="ColumnChart"
                    width={'100%'}
                    height={'500px'}
                    data={subscriptionData}
                    options={{
                        title: 'Subscriptions by Plan',
                        hAxis: { title: 'Plan' },
                        vAxis: { title: 'Subscription Count' },
                    }}
                />
            )}
        </div>
    );
};

export default SubscriptionStats;