import { useEffect, useState } from 'react';
import useUserRole from '../../hooks/useUserRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Chart } from 'react-google-charts';

const RevenueStats = () => {
    const [revenueData, setRevenueData] = useState([]);

    const { role, roleLoading } = useUserRole();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: revenueStats = [], isError, error } = useQuery({
        enabled: !!role,
        queryKey: ['revenueStats', role],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment/revenue-by-plan');
            return res.data;
        },
    });

    useEffect(() => {
        if (revenueStats.length > 0) {
            const formattedData = [['Plan', 'Revenue']].concat(revenueStats.map(({ plan, revenue }) => [plan, revenue]));
            setRevenueData(formattedData);
        } else {
            console.log('No revenue stats found.');
        }
    }, [revenueStats]);

    if (isLoading || roleLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            {revenueData.length > 1 && (
                <Chart
                    chartType="LineChart"
                    width={'100%'}
                    height={'640px'}
                    data={revenueData}
                    options={{
                        legend: { position: 'top' },
                        title: 'Revenue by Plan',
                        curveType: 'function',
                        lineWidth: 5,
                        backgroundColor: 'transparent',
                        theme: 'material',
                        series: {
                            0: { pointShape: 'circle', pointSize: 10 }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default RevenueStats;
