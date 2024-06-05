import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import NexusTable from "../../components/NexusTable/NexusTable";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyArticles = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: userArticles = [], refetch } = useQuery({
        queryKey: ['userArticles'],
        queryFn: async () => {
            const res = await axiosSecure(`/user/articles/${user?.email}`)
            return res.data;
        }
    });

    // console.log(userArticles);

    // update article
    const handleUpdateArticle = (id) => {
        console.log(id);
    }

    // show decline reason 

    const handleShowReason = (id) => {
        console.log(id);
    }

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
                axiosSecure.delete(`/articles/${id}?email=${user.email}`)
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

    const articleData = useMemo(() => userArticles, [userArticles]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const articleColumns = [
        {
            header: '#',
            accessorKey: 'posted_on',
            enableSorting: false
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
                return (
                    <div>
                        {cell.row.original.status === 'Approved' && 'Approved'}
                        {cell.row.original.status === 'Declined' && (
                            <>
                                Declined <button onClick={() => handleShowReason(cell.row.original._id)}>Reason</button>
                            </>
                        )}
                        {!cell.row.original.status && 'Pending'}
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
        </section>
    );
};

export default MyArticles;