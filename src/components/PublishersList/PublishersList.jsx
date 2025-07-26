import { useQuery } from '@tanstack/react-query';
import ReactPlaceholder from 'react-placeholder';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const PublishersList = () => {
	const axiosPublic = useAxiosPublic();

	const { isLoading, data: listPublishers = [] } = useQuery({
		queryKey: ['listPublishers'],
		queryFn: async () => {
			const res = await axiosPublic('/publishers');
			return res.data;
		},
	});

	return (
		<ReactPlaceholder
			showLoadingAnimation
			type="text"
			widths={['100%']}
			rows={16}
			color="#6897bb"
			ready={!isLoading}
		>
			<section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
				{listPublishers?.map((pub) => (
					<div
						key={pub._id}
						className="flex flex-col items-center gap-3 bg-nexusBG justify-around border p-3 border-nexus-primary shadow-md shadow-nexus-primary"
					>
						<img src={pub.publisher_logo} alt={pub.publisher} />
						<h4 className="text-lg font-kreonSerif font-bold">
							{pub.publisher}
						</h4>
					</div>
				))}
			</section>
		</ReactPlaceholder>
	);
};

export default PublishersList;
