import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [lowResImageURL, setLowResImageURL] = useState(null);
    const [fullSizeImageURL, setFullSizeImageURL] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    const uploadImage = async (formData) => {
        setImageUploading(true);
        setUploadSuccess(false);
        setLowResImageURL(null);
        setFullSizeImageURL(null);
        setUploadError(null);

        try {
            const res = await axios.post(imageHostingApi, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            setLowResImageURL(res.data.data.display_url);
            setFullSizeImageURL(res.data.data.image.url);
            if (res.data.success) {
                setUploadSuccess(true);
            }
        } catch (error) {
            setUploadError(error);
            console.error(error);
        } finally {
            setImageUploading(false);
        }
    };

    return { imageUploading, uploadSuccess, uploadError, lowResImageURL, fullSizeImageURL, uploadImage };
};

export default useImageUpload;
