import Chart from "react-google-charts";
import { useEffect, useState } from 'react';
import useUserRole from '../../../hooks/useUserRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { articleLoader } from '../../LoadingSpinners/Loaders';

const PublisherPieChart = () => {
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

    if (isLoading || roleLoading) return articleLoader;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div className='mx-auto w-full h-auto text-center'>
            {publicationData.length > 1 && (
                <Chart
                    chartType="PieChart"
                    width={'100%'}
                    height={'640px'}
                    data={publicationData}
                    options={{
                        backgroundColor:'transparent',
                        color:'red',
                        theme:'material',
                        title: 'Articles by Publishers', is3D: true,
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            )}
        </div>
    );
};

export default PublisherPieChart;