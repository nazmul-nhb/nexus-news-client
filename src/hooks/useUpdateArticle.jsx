import useAxiosSecure from "./useAxiosSecure"
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useUpdateArticle = () => {
    const axiosSecure = useAxiosSecure();

    /**
     * Updates an Article.
     *
     * @param {string} id - The ID of the article to update.
     * @param {object} article - The article to update.
     * @param {string} msg - Success message to display.
     * @param {function} refetch - Function from useQuery to refetch the data after update.
     */

    const updateArticle = (id, article, msg, refetch) => {
        console.log(article);
        axiosSecure.patch(`/articles/${id}`, article)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(msg)
                    refetch();
                    // navigate(`/blog-details/${id}`);
                    // navigate(-1);
                }
            })
            .catch(error => {
                console.error(error);
                if (error) {
                    Swal.fire({
                        title: 'Error!!',
                        text: error?.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }

    return updateArticle;
};

export default useUpdateArticle;