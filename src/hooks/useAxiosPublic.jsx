import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://nexus-news-nhb-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;