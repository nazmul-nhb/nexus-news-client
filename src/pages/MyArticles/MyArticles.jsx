import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NexusTable from "../../components/NexusTable/NexusTable";
import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import toast from "react-hot-toast";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDeleteArticle from "../../hooks/useDeleteArticle";
import { IoIosCloseCircle } from "react-icons/io";

const MyArticles = () => {
    const [showModal, setShowModal] = useState(false);
    const [declineReason, setDeclineReason] = useState('');

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const deleteArticle = useDeleteArticle();

    const { isLoading, data: userArticles = [], refetch } = useQuery({
        queryKey: ['userArticles'],
        queryFn: async () => {
            const res = await axiosSecure(`/user/articles/${user?.email}`)
            return res.data;
        }
    });

    const closeModal = () => {
        setShowModal(false);
    };

    // console.log(userArticles);

    // update article
    const handleUpdateArticle = (id) => {
        console.log(id);
    }

    // show decline reason 
    const handleShowReason = (reason) => {
        setDeclineReason(reason);
        setShowModal(true);

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
                return <Link className="hover:text-nexus-secondary font-semibold font-kreonSerif" to={`../news/${cell.row.original._id}`}>{cell.row.original.headline}</Link>;
            }
        },
        {
            header: 'Details',
            accessorKey: '_id',
            cell: (cell) => {
                return <Link className="hover:text-nexus-secondary text-center font-semibold font-kreonSerif" to={`../news/${cell.row.original._id}`}>Details</Link>;
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
                return <h3 className="text-center cursor-pointer" onClick={() => handleUpdateArticle(cell.row.original._id)}>Update</h3>;
            },
        },
        {
            header: 'Delete',
            accessorKey: '',
            enableSorting: false,
            cell: (cell) => {
                const { _id, headline } = cell.row.original;
                return (
                    <h3 className="text-center cursor-pointer" onClick={() => handleDeleteArticle(_id, headline)}>Delete</h3>
                )
            }
        }
    ]

    if (isLoading) return <ArticleLoading />

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{user.displayName}&rsquo;s Articles</title>
            </Helmet>
            {user.displayName}&rsquo;s Articles
            {
                !userArticles.length ? <p>No Data</p> : <NexusTable data={articleData} columns={articleColumns} />
            }
            {showModal &&
                <dialog open className="w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 overflow-y-auto">
                    <div className='animate__animated animate__pulse bg-[#c5cce5f1] border shadow-lg h-full rounded-lg p-6 flex flex-col justify-around'>
                        <IoIosCloseCircle onClick={closeModal} className='absolute -top-4 -right-4 text-5xl text-red-700 hover:text-nexus-secondary hover:opacity-80 transition-all duration-500 cursor-pointer' title='Close' />

                        <div className="flex flex-col items-center gap-4 h-3/4 p-1">
                            <h3 className="animate__animated animate__headShake text-center text-red-700 font-kreonSerif font-bold max-[430px]:text-lg text-2xl mb-4 md:mb-6">Reason Your Article was Declined!</h3>
                            <p className="">{declineReason}</p>
                        </div>

                    </div>
                </dialog>
            }
        </section>
    );
};

export default MyArticles;