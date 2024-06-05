import useAxiosSecure from "./useAxiosSecure"
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useUpdateArticle = () => {
    const axiosSecure = useAxiosSecure();

    const updateArticle = (id, article, msg) => {
        console.log(article);
        axiosSecure.patch(`/articles/${id}`, article)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(msg)
                    // refetch();
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