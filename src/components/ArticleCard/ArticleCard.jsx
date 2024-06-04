import PropTypes from 'prop-types';

const ArticleCard = ({ article }) => {
    const { headline, thumb_image, publisher, description } = article;

    return (
        <div>
            <h3>{headline}</h3>
            <img src={thumb_image} alt={headline} />

        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object,
};

export default ArticleCard;