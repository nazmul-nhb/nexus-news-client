import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import ArticleTable from "../../components/ArticleTable/ArticleTable";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ArticleLoading from "../../components/LoadingSpinners/ArticleLoading";

const MyArticles = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { isLoading, data: userArticles = [], refetch } = useQuery({
        queryKey: ['userArticles'],
        queryFn: async () => {
            const res = await axiosPublic(`/user/articles/${user?.email}`)
            return res.data;
        }
    });

    // console.log(userArticles);

    // update article
    const handleUpdateArticle = (id) => {
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
                axiosPublic.delete(`/articles/${id}?email=${user.email}`)
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
            header: 'Serial',
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
                return <p>{cell.row.original.status}</p>;
            }
        },
        {
            header: 'Subscription',
            accessorKey: 'isPremium',
            cell: (cell) => {
                return <p>{cell.row.original.isPremium ? 'Premium' : 'Free'}</p>;
            }
        },
        {
            header: 'Update',
            accessorKey: '',
            enableSorting: false,
            cell: (cell) => {
                return <button onClick={() => handleUpdateArticle(cell.row.original._id)}>Update</button>;
            },
        },
        {
            header: 'Delete',
            accessorKey: '',
            enableSorting: false,
            cell: (cell) => {
                return <button onClick={() => handleDeleteArticle(cell.row.original._id, cell.row.original.headline)}>Delete</button>;
            }
        }
    ]

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{user.displayName}&rsquo;s Articles</title>
            </Helmet>
            {user.displayName}&rsquo;s Vua Articles
            {
                isLoading ? <ArticleLoading />
                    : <ArticleTable data={articleData} columns={articleColumns} />
            }
        </section>
    );
};

export default MyArticles;