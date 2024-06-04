import PropTypes from 'prop-types';

const ArticleCard = ({ article }) => {
    const { headline, thumb_image, tags, publisher, description } = article;

    return (
        <div>
            <h3>{headline}</h3>
            <img src={thumb_image} alt={headline} />
            {
                tags?.map((tag, index) => <h4 className='first-letter:capitalize' key={index}>{tag}</h4>)
            }
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object,
};

export default ArticleCard;