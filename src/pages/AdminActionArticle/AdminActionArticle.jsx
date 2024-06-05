import PropTypes from 'prop-types';
import useNexusUsers from '../../hooks/useNexusUsers';
import moment from 'moment';
import useUpdateArticle from '../../hooks/useUpdateArticle';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import toast from 'react-hot-toast';
import useDeleteArticle from '../../hooks/useDeleteArticle';

const AdminActionArticle = ({ article, refetch }) => {
    const { _id, headline, posted_by_email, posted_on, status, isPremium, publisher } = article;
    // const axiosSecure = useAxiosSecure();
    const updateArticle = useUpdateArticle();
    const deleteArticle = useDeleteArticle();

    // get latest name & profile photo of the blog author
    const { data: nexusUser = {} } = useNexusUsers(['nexusUser', posted_by_email], posted_by_email);

    const articleAuthor = nexusUser?.name;
    const authorImage = nexusUser?.profile_image;

    // delete article
    const handleDeleteArticle = (id, headline) => {
        deleteArticle(id, posted_by_email, headline, refetch);
    }

    const handleMakePremium = (id) => {
        const msg = 'Article is Now Premium!';
        const premiumArticle = { isPremium: true };
        updateArticle(id, premiumArticle, msg, refetch);
    }

    const handleDeclineArticle = (id) => {
        console.log(id);
        // const msg = 'Article is Now Premium!';
        // const premiumArticle = { isPremium: true };
        // updateArticle(id, premiumArticle, msg);
        // refetch();
    }

    const handleApproveArticle = (id) => {
        // console.log(id);
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
                    onClick={() => handleDeclineArticle(_id)}
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
        </div>
    );
};

AdminActionArticle.propTypes = {
    article: PropTypes.object,
    refetch: PropTypes.func,
};

export default AdminActionArticle;