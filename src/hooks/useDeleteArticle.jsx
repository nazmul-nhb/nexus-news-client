import useAxiosSecure from "./useAxiosSecure"
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useDeleteArticle = () => {
    const axiosSecure = useAxiosSecure();

    /**
     * Deletes an Article.
     *
     * @param {string} id - The MongoDB ID of the article to delete.
     * @param {string} email - Author's email for more security.
     * @param {string} headline - Headline of the article to display in alert.
     * @param {function} refetch - Function from useQuery to refetch the data after delete.
     */

    const deleteArticle = (id, email, headline, refetch) => {
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
                axiosSecure.delete(`/articles/${id}?email=${email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Article Deleted!',
                                `Permanently Deleted "${headline}"!`,
                                'success'
                            )
                            toast.success('Deleted the Article!');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error?.message,
                            icon: 'error',
                            confirmButtonText: 'Close'
                        });
                    })
            }
        })
    }
    return deleteArticle;
};

export default useDeleteArticle;