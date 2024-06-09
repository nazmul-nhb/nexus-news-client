import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NexusTable from "../../components/NexusTable/NexusTable";
import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDeleteArticle from "../../hooks/useDeleteArticle";
import { IoIosCloseCircle } from "react-icons/io";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import useImageUpload from "../../hooks/useImageUpload";
import moment from "moment";
import Swal from "sweetalert2";
import useUpdateArticle from "../../hooks/useUpdateArticle";
import { articleLoader } from "../../components/LoadingSpinners/Loaders";

const MyArticles = () => {
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [article, setArticle] = useState({});
    // const [updatedArticle, setUpdatedArticle] = useState({});
    const [imageFileName, setImageFileName] = useState("Update News Image")
    const [newsTags, setNewsTags] = useState([]);
    const [publisher, setPublisher] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const uploadImage = useImageUpload();
    const updateArticle = useUpdateArticle();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const deleteArticle = useDeleteArticle();

    const { isLoading, data: userArticles = [], refetch } = useQuery({
        queryKey: ['userArticles'],
        queryFn: async () => {
            const res = await axiosSecure(`/articles/user/${user?.email}`)
            return res.data;
        }
    });

    // console.log(userArticles);

    const handleUpdateModal = (currArticle) => {
        setArticle(currArticle);
        setShowUpdateModal(true);
    }

    // update article
    const handleUpdateArticle = async (updatedArticle) => {
        // console.log(updatedArticle);

        const { headline, description } = updatedArticle;

        let imageFile;
        if (updatedArticle?.image) {
            imageFile = updatedArticle?.image[0];
        }

        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Update News Image");
        }

        const tags = newsTags?.map(tag => tag.value);

        setImageUploading(true);

        try {
            // start image upload
            let result;
            if (imageFile) {
                result = await uploadImage(imageFile);
            }

            const finalArticle = {
                headline,
                tags: tags.length === 0 ? article.tags : tags,
                description,
                publisher: publisher.value,
                updated_on: moment().format("YYYY-MM-DD HH:mm:ss")
            };

            if (result && result?.success) {
                finalArticle.thumb_image = result.data.display_url;
                finalArticle.full_image = result.data.image.url;
            }

            const msg = 'Article Updated Successfully!'

            updateArticle(article._id, finalArticle, msg, refetch);
            setShowUpdateModal(false);

            // send tags to the server
            try {
                await axiosSecure.post('/tags', newsTags);
            } catch (tagError) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to Post Tags!',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        } finally {
            setImageUploading(false);
        }
    }

    // show decline reason 
    const handleShowReason = (reason) => {
        setDeclineReason(reason);
        setShowReasonModal(true);

    }

    // delete article
    const handleDeleteArticle = (id, headline) => {
        deleteArticle(id, user?.email, headline, refetch);
    }

    const articlesWithSerial = userArticles?.map((article, index) => ({ ...article, serial: index + 1 }));

    const articleData = useMemo(() => articlesWithSerial, [articlesWithSerial]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const articleColumns = [
        {
            header: '#',
            accessorKey: 'serial',
            // enableSorting: false
        },
        {
            header: 'Headline',
            accessorKey: 'headline',
            cell: (cell) => {
                return <Link className="hover:text-nexus-primary font-semibold font-kreonSerif"
                    to={`../news/${cell.row.original._id}`}>
                    {cell.row.original.headline}
                </Link>;
            }
        },
        {
            header: 'Details',
            accessorKey: '_id',
            cell: (cell) => {
                return <Link
                    className="hover:text-nexus-primary text-center font-semibold font-kreonSerif"
                    to={`../news/${cell.row.original._id}`}>
                    Details
                </Link>;
            }
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (cell) => {
                const { decline_reason, status } = cell.row.original;
                return (
                    <div className="flex justify-between gap-1">
                        {status === 'Approved' && 'Approved'}
                        {status === 'Declined' && (
                            <>
                                Declined <button onClick={() => handleShowReason(decline_reason)}>Reason</button>
                            </>
                        )}
                        {!status && 'Pending'}
                    </div>
                )
            }
        },
        {
            header: 'Premium',
            accessorKey: 'isPremium',
            cell: (cell) => {
                return <p>{cell.row.original.isPremium ? 'Yes' : 'No'}</p>;
            }
        },
        {
            header: 'Update',
            accessorKey: '',
            enableSorting: false,
            cell: (cell) => {
                return <h3 className="text-center cursor-pointer"
                    onClick={() => handleUpdateModal(cell.row.original)}>
                    Update
                </h3>;
            },
        },
        {
            header: 'Delete',
            accessorKey: '',
            enableSorting: false,
            cell: (cell) => {
                const { _id, headline } = cell.row.original;
                return (
                    <h3 className="text-center cursor-pointer"
                        onClick={() => handleDeleteArticle(_id, headline)}>
                        Delete
                    </h3>
                )
            }
        }
    ]

    if (isLoading) return articleLoader;

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{user.displayName}&rsquo;s Articles</title>
            </Helmet>
            {user.displayName}&rsquo;s Articles

            {
                !userArticles.length ? <p>No Data</p> : <NexusTable data={articleData} columns={articleColumns} />
            }

            {/* ReasonModal */}
            {showReasonModal &&
                <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5f1] border shadow-lg h-full rounded-lg p-6 flex flex-col justify-around'>
                        <IoIosCloseCircle onClick={() => setShowReasonModal(false)} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-primary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />

                        <div className="flex flex-col items-center gap-4 h-3/4 p-1">
                            <h3 className="animate__animated animate__headShake text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Reason Your Article was Declined!</h3>
                            <p className="">{declineReason}</p>
                        </div>

                    </div>
                </dialog>
            }
            {/* Update Modal */}
            {showUpdateModal &&
                <dialog open className="w-full h-full bg-opacity-95 p-11 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5fe] border shadow-lg h-auto rounded-lg p-6 flex flex-col justify-around'>
                        <IoIosCloseCircle onClick={() => setShowUpdateModal(false)} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-primary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />
                        <h3 className="animate__animated animate__headShake text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Update: {article.headline}</h3>

                        <ArticleForm
                            article={article}
                            isUpdateArticle={true}
                            imageFileName={imageFileName}
                            setImageFileName={setImageFileName}
                            setNewsTags={setNewsTags}
                            setPublisher={setPublisher}
                            imageUploading={imageUploading}
                            handleUpdateArticle={handleUpdateArticle}
                        />
                    </div>
                </dialog>
            }
        </section>
    );
};

export default MyArticles;