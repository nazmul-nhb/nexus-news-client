import { useState } from "react";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import useImageUpload from "../../hooks/useImageUpload";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

const AddArticle = () => {
    const { user } = useAuth();
    const [resetForm, setResetForm] = useState(null);
    const [imageFileName, setImageFileName] = useState("Upload News Image")
    const [newsTags, setNewsTags] = useState([]);
    const [publisher, setPublisher] = useState({});
    const [newsType, setNewsType] = useState({});
    const { imageUploading, uploadSuccess, uploadError, lowResImageURL, fullSizeImageURL, uploadImage } = useImageUpload();
    const axiosPublic = useAxiosPublic();

    const handlePostArticle = async (newArticle) => {
        console.log(newArticle);
        const { headline, image, description } = newArticle;
        const imageFile = image[0];

        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Upload News Image");
        }

        const tags = newsTags?.map(tag => tag.value);
        const formData = new FormData();
        formData.append('image', imageFile);

        await uploadImage(formData);

        if (uploadError) {
            return Swal.fire({
                title: 'Error!',
                text: uploadError,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }

        const finalArticle = { headline, tags, description, posted_by: user.displayName, posted_by_email: user.email, isPremium: newsType.value, publisher: publisher.value, view_count: 0, thumb_image: lowResImageURL, full_image: fullSizeImageURL, posted_on: moment().format("YYYY-MM-DD HH:mm:ss") };

        console.log(finalArticle);

        if (uploadSuccess) {
            axiosPublic.post('/articles', finalArticle)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success("Article Posted Successfully!");
                        setImageFileName("Upload News Image");
                        resetForm();
                    }
                    if (res.data.message) {
                        Swal.fire({
                            title: 'Error!',
                            text: res.data.message,
                            icon: 'error',
                            confirmButtonText: 'Close'
                        });
                    }
                }).
                catch(error => {
                    console.log(error);
                    toast.error(error);
                })
        } else {
            Swal.fire({
                title: 'Upload Failed!',
                text: "This Happens Sometimes! Please, Try Again!",
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    }

    const setFormReset = (resetFunction) => {
        setResetForm(() => resetFunction);
    };

    return (
        <section>
            <Helmet>
                <title>Add Article - Nexus News</title>
            </Helmet>

            <ArticleForm
                addArticle={true}
                setResetForm={setFormReset}
                handlePostArticle={handlePostArticle}
                imageFileName={imageFileName}
                setImageFileName={setImageFileName}
                setNewsTags={setNewsTags}
                setPublisher={setPublisher}
                setNewsType={setNewsType}
                imageUploading={imageUploading}
            />
        </section>
    );
};

export default AddArticle;