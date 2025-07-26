import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import ReactPlaceholder from 'react-placeholder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';

const SubscriptionStats = () => {
	const [subscriptionData, setSubscriptionData] = useState([
		['Plan', 'Subscription Count', { role: 'annotation' }, { role: 'style' }],
	]);
	const { role, roleLoading } = useUserRole();
	const axiosSecure = useAxiosSecure();

	const {
		isLoading,
		data: subscriptionStats = [],
		isError,
		error,
	} = useQuery({
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
			const formattedData = subscriptionStats.map(
				({ plan, count, percentage }, index) => [
					plan,
					parseInt(count),
					`${percentage.toFixed(2)}%`,
					`color: ${colors[index]}`,
				]
			);
			setSubscriptionData([
				['Plan', 'Subscription Count', { role: 'annotation' }, { role: 'style' }],
				...formattedData,
			]);
		} else {
			// console.log('No subscription stats found.');
		}
	}, [subscriptionStats]);

	// const legendLabels = subscriptionStats?.map(sub=> sub.plan);

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
				{subscriptionData.length > 1 && (
					<Chart
						chartType="ColumnChart"
						width={'100%'}
						height={'640px'}
						data={subscriptionData}
						options={{
							title: 'Subscriptions by Plan',
							backgroundColor: 'transparent',
							// theme: 'material',
							hAxis: {
								title: 'Plan',
								titleTextStyle: { fontSize: 14 },
								slantedText: true,
								slantedTextAngle: 30,
								textStyle: { fontSize: 12 },
							},
							vAxis: {
								title: 'Subscription Count',
								titleTextStyle: { fontSize: 14 },
								minValue: 0,
								textStyle: { fontSize: 12 },
							},
							legend: { position: 'top', alignment: 'end' },
							annotations: {
								textStyle: { fontSize: 12 },
							},
							is3D: true,
							depth: 50,
							viewWindow: { min: 10 },
						}}
						// legend={legendLabels}
					/>
				)}
			</div>
		</ReactPlaceholder>
	);
};

export default SubscriptionStats;
