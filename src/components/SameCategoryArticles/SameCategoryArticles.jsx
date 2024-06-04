import PropTypes from 'prop-types';
import useGetArticles from '../../hooks/useGetArticles';
import { Link } from 'react-router-dom';

const SameCategoryArticles = ({ tags }) => {
    console.log(tags);

    const tagsQueryString = tags.map(tag => `tag=${encodeURIComponent(tag)}`).join('&');
    console.log(tagsQueryString);
    const { data: similarArticles } = useGetArticles(['similarArticles', tags], `${tagsQueryString}&sort=time_descending&size=4`);

    console.log(similarArticles);

    return (
        <div className='flex flex-col gap-3'>
            {
                similarArticles?.map(article => <Link key={article._id} to={`/news/${article._id}`}>
                    <div className=''>
                        <h3>{article.headline}</h3>
                        <img src={article.thumb_image} alt="" />
                    </div>
                </Link>)
            }
        </div>
    );
};

SameCategoryArticles.propTypes = {
    tags: PropTypes.array,
};

export default SameCategoryArticles;