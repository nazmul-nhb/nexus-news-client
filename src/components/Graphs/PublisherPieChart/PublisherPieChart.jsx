import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import ReactPlaceholder from 'react-placeholder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';

const PublisherPieChart = () => {
	const [publicationData, setPublicationData] = useState([['Publication', 'Percentage']]);
	const { role, roleLoading } = useUserRole();
	const axiosSecure = useAxiosSecure();

	const {
		isLoading,
		data: publicationPercentages = [],
		isError,
		error,
	} = useQuery({
		enabled: !!role,
		queryKey: ['publicationPercentages', role],
		queryFn: async () => {
			const res = await axiosSecure.get('/articles/publication-percentages');
			return res.data;
		},
	});

	useEffect(() => {
		if (publicationPercentages.length > 0) {
			const formattedData = publicationPercentages.map(
				({ publication, percentage }) => [publication, parseInt(percentage)]
			);
			setPublicationData([['Publication', 'Percentage'], ...formattedData]);
		}
	}, [publicationPercentages]);

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<ReactPlaceholder
			showLoadingAnimation
			type="text"
			widths={['100%']}
			rows={24}
			color="#6897bb"
			ready={!(isLoading || roleLoading)}
		>
			<div className="mx-auto w-full h-auto text-center">
				{publicationData.length > 1 && (
					<Chart
						chartType="PieChart"
						width={'100%'}
						height={'640px'}
						data={publicationData}
						options={{
							backgroundColor: 'transparent',
							color: 'red',
							// theme:'material',
							title: 'Articles by Publishers',
							is3D: true,
						}}
						rootProps={{ 'data-testid': '1' }}
					/>
				)}
			</div>
		</ReactPlaceholder>
	);
};

export default PublisherPieChart;
