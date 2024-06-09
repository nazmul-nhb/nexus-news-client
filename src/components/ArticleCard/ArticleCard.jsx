import PropTypes from 'prop-types';
import useGetUserType from '../../hooks/useGetUserType';
// import { Link } from 'react-router-dom';
import useHandleArticleDetails from '../../hooks/useHandleArticleDetails';
import { IoNewspaper } from 'react-icons/io5';

const ArticleCard = ({ article }) => {
    const { _id, headline, thumb_image, publisher, description, isPremium } = article;
    const { premiumUser } = useGetUserType();
    // console.log(premiumUser);
    const handleGoToArticleDetails = useHandleArticleDetails();


    return (
        <div className='flex flex-col gap-6'>
            <h3>{headline}</h3>
            <img src={thumb_image} alt={headline} />
            <h3 className='first-letter:capitalize flex items-center gap-0.5 font-semibold'><IoNewspaper />{publisher}</h3>
            <p>{description.slice(0, 256)} ...</p>
            <button
                onClick={() => handleGoToArticleDetails(_id)}
                disabled={isPremium && premiumUser !== true}
            >Details</button>
            {/* <Link disabled={isPremium && premiumUser !== true} to={`/news/${_id}`}>Button</Link> */}
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object,
};

export default ArticleCard;