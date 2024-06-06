import PropTypes from 'prop-types';
import useNexusUsers from '../../hooks/useNexusUsers';
import moment from 'moment';
import useUpdateArticle from '../../hooks/useUpdateArticle';
import useDeleteArticle from '../../hooks/useDeleteArticle';
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

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
        <div className='flex flex-col gap-3 border px-3 py-2'>
            {/* headline */}
            <h3 className="">{headline}</h3>

            {/* post time and publisher */}
            <div className="flex justify-between items-center">
                <h3>{moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h3>
                <h3>{publisher}</h3>
            </div>

            {/* author info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img className='w-12 h-12 rounded-xl' src={authorImage} alt={articleAuthor} />
                    <div className="">
                        <h3>{articleAuthor}</h3>
                        <h4>{posted_by_email}</h4>
                    </div>
                </div>

                <h3 className="">
                    {status === 'Approved' ? 'Approved' : status === 'Declined' ? 'Declined' : 'Pending'}
                </h3>
            </div>

            {/* action buttons */}
            <div className="flex gap-2 items-center justify-between">

                <button
                    disabled={status === 'Approved'}
                    onClick={() => handleApproveArticle(_id)}
                    className="">
                    {
                        status === 'Approved' ? 'Approved' : 'Approve'
                    }
                </button>

                <button
                    onClick={() => setShowModal(!showModal)}
                    className="">
                    Decline
                </button>


                <button
                    onClick={() => handleDeleteArticle(_id, headline)}
                    className="">
                    Delete
                </button>

                <button
                    disabled={isPremium}
                    onClick={() => handleMakePremium(_id)}
                    className="">
                    {
                        !isPremium ? "Make Premium" : "Premium"
                    }
                </button>
            </div>
            {showModal &&
                <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5f1] border shadow-lg h-full rounded-lg p-6 flex flex-col justify-around'>
                        <IoIosCloseCircle onClick={closeModal} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-secondary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />
                        <h3 className="animate__animated animate__headShake text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Give A Feedback</h3>

                        <form onSubmit={(e) => handleDeclineArticle(e, _id)} className='flex flex-col items-center justify-between h-3/4 p-1'>
                            <textarea className='text-sm bg-transparent outline-0 border border-nexus-secondary w-4/5 h-3/4 p-2 rounded-lg' name="feedback" id="feedback"/>
                            <button type='submit'>Decline</button>
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