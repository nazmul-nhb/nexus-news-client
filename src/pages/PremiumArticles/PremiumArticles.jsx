import { Helmet } from 'react-helmet-async';
import ReactPlaceholder from 'react-placeholder';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useGetArticles from '../../hooks/useGetArticles';

const PremiumArticles = () => {
	const { isLoading, data: premiumArticles } = useGetArticles(
		['premiumArticles'],
		'isPremium=true'
	);

	return (
		<section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
			<Helmet>
				<title>Premium Articles - Nexus News</title>
			</Helmet>
			<SectionHeader
				heading={'Explore Our Premium Articles'}
				subHeading={`Total: ${premiumArticles.length} Articles`}
			/>
			<div className="w-full my-6 md:my-16"></div>
			<ReactPlaceholder
				showLoadingAnimation
				type="text"
				widths={['100%']}
				color="#6897bb"
				rows={48}
				ready={!isLoading}
			>
				<div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-6">
					{premiumArticles?.map((article) => (
						<ArticleCard key={article._id} article={article} />
					))}
				</div>
			</ReactPlaceholder>
		</section>
	);
};

export default PremiumArticles;
