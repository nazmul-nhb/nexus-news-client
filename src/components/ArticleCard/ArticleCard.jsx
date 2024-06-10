import PropTypes from 'prop-types';
import useGetUserType from '../../hooks/useGetUserType';
// import { Link } from 'react-router-dom';
import useHandleArticleDetails from '../../hooks/useHandleArticleDetails';
import { IoNewspaper } from 'react-icons/io5';
import { buttonNormal } from '../../utilities/buttonStyles';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';

const ArticleCard = ({ article }) => {
    const { _id, headline, thumb_image, publisher, description, isPremium, posted_on } = article;
    const { premiumUser } = useGetUserType();
    // console.log(premiumUser);
    const handleGoToArticleDetails = useHandleArticleDetails();


    return (
        <div className={`relative flex flex-col items-start gap-2 rounded-lg border shadow-md p-4 ${isPremium ? 'text-yellow-800 shadow-yellow-700 border-yellow-700 bg-yellow-100 bg-opacity-75' : 'shadow-nexus-primary border-nexus-primary bg-nexusBG'}`}>
            <h3 className='flex-grow text-xl font-bold font-kreonSerif'>{headline}</h3>
            <img className={`flex-grow aspect-[1.8/1] border p-1 ${isPremium ? 'border-yellow-700' : 'border-nexus-primary'}`} src={thumb_image} alt={headline} />
            <div className="w-full flex-grow flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className='first-letter:capitalize flex items-center gap-1 font-semibold text-lg'><IoNewspaper />{publisher}</h3>
                <h4 className='flex items-center gap-1'><FaHistory />{posted_on}</h4>
            </div>
            <p className='flex-grow text-justify'>{description.slice(0, 256)} ...</p>
            <button className={`${buttonNormal} ${isPremium && 'bg-yellow-700 border-yellow-700 hover:text-yellow-700'}`}
                onClick={() => handleGoToArticleDetails(_id)}
                disabled={isPremium && premiumUser !== true}
            >Read Details</button>
            {isPremium && <MdOutlineWorkspacePremium className='absolute -top-6 -right-8 text-6xl' />}
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object,
};

export default ArticleCard;