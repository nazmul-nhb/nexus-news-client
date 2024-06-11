import PropTypes from 'prop-types';
import useNexusUsers from '../../hooks/useNexusUsers';
import moment from 'moment';
import useUpdateArticle from '../../hooks/useUpdateArticle';
import useDeleteArticle from '../../hooks/useDeleteArticle';
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { TbHandStop, TbPremiumRights } from 'react-icons/tb';
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdAlternateEmail, MdDateRange, MdOutlinePendingActions } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { IoNewspaper } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { buttonNormal } from '../../utilities/buttonStyles';

const AdminActionArticle = ({ article, refetch }) => {
    const { _id, headline, posted_by_email, posted_on, status, isPremium, publisher } = article;
    const [showModal, setShowModal] = useState(false);
    const updateArticle = useUpdateArticle();
    const deleteArticle = useDeleteArticle();

    // get latest name & profile photo of the blog author
    const { data: nexusUser = {} } = useNexusUsers(['nexusUser', posted_by_email], posted_by_email);

    const articleAuthor = nexusUser?.name;
    const authorImage = nexusUser?.profile_image;

    const closeModal = () => {
        setShowModal(false);
    };

    // delete article
    const handleDeleteArticle = (id, headline) => {
        deleteArticle(id, posted_by_email, headline, refetch);
    }

    const handleMakePremium = (id) => {
        const msg = 'Article is Now Premium!';
        const premiumArticle = { isPremium: true };
        updateArticle(id, premiumArticle, msg, refetch);
    }

    const handleDeclineArticle = (e, id) => {
        e.preventDefault();
        const decline_reason = e.target.feedback.value;
        const msg = 'Declined!';
        const declinedArticle = { decline_reason, status: 'Declined' }
        updateArticle(id, declinedArticle, msg, refetch);
        setShowModal(false);
    }

    const handleApproveArticle = (id) => {
        const msg = 'Article is Approved!';
        const approvedArticle = { status: 'Approved' };
        updateArticle(id, approvedArticle, msg, refetch);
    }

    return (
        <div className='flex flex-col gap-3 border border-nexus-primary bg-nexusBG rounded-md shadow-md shadow-nexus-primary p-4 mx-2'>
            {/* headline */}
            <Link to={`/news/${_id}`} className=" flex-grow font-bold text-xl hover:text-nexus-primary">{headline}</Link>

            {/* post time and publisher */}
            <div className="flex xl:flex-row flex-col xl:items-center justify-between gap-2">
                <h3 className="flex items-center gap-0.5 font-medium"><MdDateRange />{moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h3>
                <h3 className='first-letter:capitalize flex items-center gap-0.5 font-semibold'><IoNewspaper />{publisher}</h3>
            </div>

            {/* author info */}
            <div className="flex md:flex-row flex-col md:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <PhotoProvider>
                        <PhotoView src={authorImage}>
                            <img className='cursor-pointer w-12 h-12 rounded-xl p-0.5 border' src={authorImage} alt={articleAuthor} />
                        </PhotoView>
                    </PhotoProvider>
                    <div>
                        <h3 className='font-semibold flex items-center gap-0.5'><FaUserEdit /> {articleAuthor}</h3>
                        <h4 className='font-medium flex items-center gap-0.5'><MdAlternateEmail />{posted_by_email}</h4>
                    </div>
                </div>

                <h3 className={`${status === 'Approved' ? 'text-green-700' : status === 'Declined' ? 'text-red-700' : 'text-nexus-primary'} flex items-center gap-0.5`}>
                    {status === 'Approved' ? <TiTick /> : status === 'Declined' ? <TbHandStop /> : <MdOutlinePendingActions />}
                    {status === 'Approved' ? 'Approved' : status === 'Declined' ? 'Declined' : 'Pending'}
                </h3>
            </div>

            {/* action buttons */}
            <div className="flex gap-2 flex-col xl:flex-row xl:items-center justify-between">

                <div className='flex items-center justify-between gap-4'>
                    <button
                        disabled={status === 'Approved'}
                        onClick={() => handleApproveArticle(_id)}
                        className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white transition-all duration-500 px-2 rounded-3xl flex items-center gap-0.5">
                        <TiTick />
                        {
                            status === 'Approved' ? `Approved` : 'Approve'
                        }
                    </button>

                    <button
                        disabled={status === 'Declined'}
                        onClick={() => setShowModal(!showModal)}
                        className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white transition-all duration-500 px-2 rounded-3xl flex items-center gap-0.5">
                        <TbHandStop />
                        {
                            status === 'Declined' ? `Declined` : 'Decline'
                        }
                    </button>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <button
                        onClick={() => handleDeleteArticle(_id, headline)}
                        className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white transition-all duration-500 px-2 rounded-3xl flex items-center gap-0.5">
                        <AiTwotoneDelete />
                        Delete
                    </button>

                    <button
                        disabled={isPremium}
                        onClick={() => handleMakePremium(_id)}
                        className="text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-500 px-2 rounded-3xl flex items-center gap-0.5">
                        <TbPremiumRights />
                        {
                            !isPremium ? "Make Premium" : "Premium"
                        }
                    </button>
                </div>

            </div>
            {showModal &&
                <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5f1] border shadow-lg h-full rounded-lg p-6 flex flex-col justify-around'>
                        <IoIosCloseCircle onClick={closeModal} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-primary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />
                        <h3 className="animate__animated animate__headShake text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Give A Feedback</h3>

                        <form onSubmit={(e) => handleDeclineArticle(e, _id)} className='flex flex-col items-center justify-between h-3/4 p-1'>
                            <textarea className='text-sm bg-transparent outline-0 border border-nexus-primary w-4/5 h-3/4 p-2 rounded-lg' name="feedback" id="feedback" />
                            <button className={buttonNormal} type='submit'>Decline</button>
                        </form>
                    </div>
                </dialog>
            }
        </div>
    );
};

AdminActionArticle.propTypes = {
    article: PropTypes.object,
    refetch: PropTypes.func,
};

export default AdminActionArticle;