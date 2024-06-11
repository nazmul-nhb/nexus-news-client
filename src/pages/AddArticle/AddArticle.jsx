import { useState } from "react";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import useImageUpload from "../../hooks/useImageUpload";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useTypewriter } from "react-simple-typewriter";

const AddArticle = () => {
    const { user } = useAuth();
    const [resetForm, setResetForm] = useState(null);
    const [imageFileName, setImageFileName] = useState("Upload News Image")
    const [newsTags, setNewsTags] = useState([]);
    const [publisher, setPublisher] = useState({});
    // const [newsType, setNewsType] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const uploadImage = useImageUpload();
    const axiosSecure = useAxiosSecure();

    const handlePostArticle = async (newArticle) => {
        // console.log(newArticle);
        const { headline, image, description } = newArticle;
        const imageFile = image[0];

        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Upload News Image");
        }

        const tags = newsTags?.map(tag => tag.value);

        setImageUploading(true);
        try {
            // start image upload
            const result = await uploadImage(imageFile);

            // console.log(result);

            if (result?.success) {

                const finalArticle = {
                    headline,
                    tags,
                    description,
                    posted_by: user.displayName,
                    posted_by_email: user.email,
                    publisher: publisher.value,
                    view_count: 0,
                    thumb_image: result.data.display_url,
                    full_image: result.data.image.url,
                    posted_on: moment().format("YYYY-MM-DD HH:mm:ss")
                };

                // console.log(tags);
                // console.log(newsTags);

                const res = await axiosSecure.post('/articles', finalArticle);
                if (res.data.insertedId) {
                    toast.success("Article Posted Successfully!");

                    setImageFileName("Upload News Image");

                    // reset form conditionally
                    if (resetForm) resetForm();

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

    const setFormReset = (resetFunction) => {
        setResetForm(() => resetFunction);
    };

    const [text] = useTypewriter({
        words: [`Add An Article`],
        loop: true,
    });

    return (
        <section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>Add Article - Nexus News</title>
            </Helmet>

            <SectionHeader heading={`${user?.displayName}, ${text}`} />

            <ArticleForm
                setResetForm={setFormReset}
                handlePostArticle={handlePostArticle}
                imageFileName={imageFileName}
                setImageFileName={setImageFileName}
                setNewsTags={setNewsTags}
                setPublisher={setPublisher}
                imageUploading={imageUploading}
            />
        </section>
    );
};

export default AddArticle;