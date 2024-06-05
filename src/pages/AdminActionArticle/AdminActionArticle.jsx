import PropTypes from 'prop-types';
import useNexusUsers from '../../hooks/useNexusUsers';
import moment from 'moment';
import useUpdateArticle from '../../hooks/useUpdateArticle';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AdminActionArticle = ({ article, refetch }) => {
    const { _id, headline, posted_by_email, posted_on, status, isPremium, publisher } = article;
    const updateArticle = useUpdateArticle();

    // get latest name & profile photo of the blog author
    const { data: nexusUser = {} } = useNexusUsers(['nexusUser', posted_by_email], posted_by_email);

    const articleAuthor = nexusUser?.name;
    const authorImage = nexusUser?.profile_image;

    // delete article
    const handleDeleteArticle = (id, headline) => {
        console.log(id);
        Swal.fire({
            title: 'Are You Sure?',
            text: `Delete "${headline}" Permanently?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#2a7947',
            confirmButtonText: 'Yes, Delete It!'
        }).then((result) => {
            if (result.isConfirmed) {
                useAxiosSecure.delete(`/articles/${id}?email=${posted_by_email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Article Deleted!',
                                `Permanently Deleted "${headline}"!`,
                                'success'
                            )
                            toast.success('Permanently Deleted the Article!');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error,
                            icon: 'error',
                            confirmButtonText: 'Close'
                        });
                    })
            }
        })
    }

    const handleMakePremium = (id) => {
        const msg = 'Article is Now Premium!';
        const premiumArticle = { isPremium: true };
        updateArticle(id, premiumArticle, msg);
        refetch();
    }

    const handleDeclineArticle = (id) => {
        console.log(id);
        // const msg = 'Article is Now Premium!';
        // const premiumArticle = { isPremium: true };
        // updateArticle(id, premiumArticle, msg);
        // refetch();
    }

    const handleApproveArticle = (id) => {
        console.log(id);
        // const msg = 'Article is Now Premium!';
        // const premiumArticle = { isPremium: true };
        // updateArticle(id, premiumArticle, msg);
        // refetch();
    }

    return (
        <div className='flex flex-col'>
            {/* 
             */}
            {/* headline */}
            <h3 className="">{headline}</h3>

            {/* post time and publisher */}
            <div className="">
                <h3>{moment(posted_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h3>
                <h3>{publisher}</h3>
            </div>

            {/* author info */}
            <div className="">
                <img className='w-20 h-20' src={authorImage} alt={articleAuthor} />
                <div className="">
                    <h3>{articleAuthor}</h3>
                    <h4>{posted_by_email}</h4>
                </div>
            </div>

            {/* action buttons */}
            <div className="flex gap-2">
                <h3 className="">{status === 'Approved' ? 'Approved' : status === 'Declined' ? 'Declined' : 'Pending'}</h3>
                <button
                    onClick={() => handleApproveArticle(_id)}
                    className="">
                    Approve</button>

                <button
                    onClick={() => handleDeclineArticle(_id)}
                    className="">
                    Decline</button>

                <button
                    onClick={() => handleDeleteArticle(_id, headline)}
                    className="">
                    Delete</button>

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