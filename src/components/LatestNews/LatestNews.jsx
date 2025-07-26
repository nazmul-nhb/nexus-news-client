import ReactPlaceholder from 'react-placeholder';
import useGetArticles from '../../hooks/useGetArticles';
import useHandleArticleDetails from '../../hooks/useHandleArticleDetails';
import SectionHeader from '../SectionHeader/SectionHeader';

const LatestNews = () => {
	const { isLoading, data: latestNews } = useGetArticles(
		['latestNews'],
		'sort=time_descending&size=4'
	);
	const handleGoToArticleDetails = useHandleArticleDetails();

	return (
		<div className="flex-grow w-full lg:w-1/3 ">
			<SectionHeader heading={'Latest News'} />
			<ReactPlaceholder
				showLoadingAnimation
				type="text"
				widths={['100%']}
				color="#6897bb"
				rows={20}
				ready={!isLoading}
			>
				<div className="grid md:grid-cols-2 gap-3">
					{latestNews?.map((article) => (
						<div
							onClick={() => handleGoToArticleDetails(article._id)}
							className="cursor-pointer border border-nexus-primary shadow-md bg-nexusBG shadow-nexus-primary p-4"
							key={article._id}
						>
							<div className="hover:scale-[1.03] transition-all duration-500 hover:text-nexus-primary space-y-3">
								<img
									className="border p-0.5"
									src={article.thumb_image}
									alt={article.headline}
								/>
								<h4 className="font-kreonSerif">{article.headline}</h4>
							</div>
						</div>
					))}
				</div>
			</ReactPlaceholder>
		</div>
	);
};

export default LatestNews;
