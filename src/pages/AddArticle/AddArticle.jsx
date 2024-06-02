import { useState } from "react";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import moment from "moment";
import { Helmet } from "react-helmet-async";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

const AddArticle = () => {
    const [resetForm, setResetForm] = useState(null);
    const [imageFileName, setImageFileName] = useState("Upload News Image")
    const [newsTags, setNewsTags] = useState([]);
    const [publisher, setPublisher] = useState({});
    const [newsType, setNewsType] = useState({});

    const handlePostArticle = (newArticle) => {
        console.log(newArticle);
        const { headline, image } = newArticle;
        const imageFile = image[0];
        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Upload News Image");
        }
        const tags = newsTags?.map(tag => tag.value);
        resetForm();
        setImageFileName("Upload News Image");
        // setNewsTags([]);
        // setPublisher({})
        const finalArticle = { headline, isPremium: newsType.value, publisher: publisher.value, tags, posted_on: moment().format("YYYY-MM-DD HH:mm:ss") }
        console.log(finalArticle);
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
            />
        </section>
    );
};

export default AddArticle;