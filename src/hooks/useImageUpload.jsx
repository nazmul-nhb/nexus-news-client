import axios from 'axios';

const useImageUpload = () => {
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    const uploadImage = async (imageFile) => {
        // convert image to formData
        const formData = new FormData();
        formData.append('image', imageFile);
        
        try {
            const res = await axios.post(imageHostingApi, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    return uploadImage;
};

export default useImageUpload;
