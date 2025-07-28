import PropTypes from 'prop-types';
import useGetArticles from '../../hooks/useGetArticles';
import useHandleArticleDetails from '../../hooks/useHandleArticleDetails';

const SameCategoryArticles = ({ tags, exclude }) => {
	const tagsQueryString = tags?.map((tag) => `tag=${encodeURIComponent(tag)}`).join('&');
	// console.log(tagsQueryString);
	const handleGoToArticleDetails = useHandleArticleDetails();
	const { data: similarArticles } = useGetArticles(
		['similarArticles', tags],
		`${tagsQueryString}&sort=time_descending&size=6`
	);

	// console.log(similarArticles);

	return (
		<div className="flex flex-col gap-3">
			{similarArticles
				?.filter((article) => article._id !== exclude)
				.map((article) => (
					<div
						onClick={() => handleGoToArticleDetails(article._id)}
						className="cursor-pointer border border-nexus-primary shadow-md shadow-nexus-primary p-4"
						key={article._id}
					>
						<div className="hover:scale-[1.03] transition-all duration-500 hover:text-nexus-primary space-y-3">
							<h3 className="font-kreonSerif">{article.headline}</h3>
							<img
								className="border p-0.5"
								src={article.thumb_image}
								alt=""
							/>
						</div>
					</div>
				))}
		</div>
	);
};

SameCategoryArticles.propTypes = {
	tags: PropTypes.array,
	exclude: PropTypes.string,
};

export default SameCategoryArticles;
