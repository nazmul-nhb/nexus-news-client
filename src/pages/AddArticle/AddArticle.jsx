import { useState } from "react";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import useImageUpload from "../../hooks/useImageUpload";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const AddArticle = () => {
    const { user } = useAuth();
    const [resetForm, setResetForm] = useState(null);
    const [imageFileName, setImageFileName] = useState("Upload News Image")
    const [newsTags, setNewsTags] = useState([]);
    const [publisher, setPublisher] = useState({});
    const [newsType, setNewsType] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const uploadImage = useImageUpload();
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

        // convert image to formData
        const formData = new FormData();
        formData.append('image', imageFile);

        setImageUploading(true);
        try {
            // start image upload
            const result = await uploadImage(formData);

            console.log(result);

            if (result.success) {

                const finalArticle = {
                    headline,
                    tags,
                    description,
                    posted_by: user.displayName,
                    posted_by_email: user.email,
                    isPremium: newsType.value,
                    publisher: publisher.value,
                    view_count: 0,
                    thumb_image: result.data.display_url,
                    full_image: result.data.image.url,
                    posted_on: moment().format("YYYY-MM-DD HH:mm:ss")
                };

                console.log(finalArticle);

                const res = await axiosPublic.post('/articles', finalArticle);
                if (res.data.insertedId) {
                    toast.success("Article Posted Successfully!");

                    setImageFileName("Upload News Image");

                    // reset form conditionally
                    if (resetForm) resetForm();

                } else if (res.data.message) {
                    Swal.fire({
                        title: 'Error!',
                        text: res.data.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            } else {
                throw new Error("Image Upload Failed!");
            }
        } catch (error) {
            setUploadError(error);
            Swal.fire({
                title: 'Error!',
                text: uploadError || "Image Upload Failed!",
                icon: 'error',
                confirmButtonText: 'Close'
            });
        } finally {
            setImageUploading(false);
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