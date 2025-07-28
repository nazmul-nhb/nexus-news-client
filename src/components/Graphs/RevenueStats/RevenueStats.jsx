import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import ReactPlaceholder from 'react-placeholder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';

const RevenueStats = () => {
	const [revenueData, setRevenueData] = useState([]);
	const { role, roleLoading } = useUserRole();
	const axiosSecure = useAxiosSecure();

	const {
		isLoading,
		data: revenueStats = [],
		isError,
		error,
	} = useQuery({
		enabled: !!role,
		queryKey: ['revenueStats', role],
		queryFn: async () => {
			const res = await axiosSecure.get('/payment/revenue-by-plan');
			return res.data;
		},
	});

	useEffect(() => {
		if (revenueStats.length > 0) {
			const formattedData = [['Plan', 'Revenue']].concat(
				revenueStats?.map(({ plan, revenue }) => [plan, revenue])
			);
			setRevenueData(formattedData);
		} else {
			// console.log('No revenue stats found.');
		}
	}, [revenueStats]);

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<ReactPlaceholder
			showLoadingAnimation
			type="text"
			widths={['100%']}
			color="#6897bb"
			rows={20}
			ready={!(isLoading || roleLoading)}
		>
			<div className="mx-auto w-full h-auto text-center">
				{revenueData.length > 1 && (
					<Chart
						chartType="LineChart"
						width={'100%'}
						height={'640px'}
						data={revenueData}
						options={{
							legend: { position: 'top' },
							title: '$ Revenue by Plan',
							curveType: 'function',
							lineWidth: 5,
							backgroundColor: 'transparent',
							// theme: 'material',
							series: {
								0: { pointShape: 'circle', pointSize: 16 },
							},
						}}
					/>
				)}
			</div>
		</ReactPlaceholder>
	);
};

export default RevenueStats;
