import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('nexus-token')
        console.log('request intercepted, token: ', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        // pass the error below
        return Promise.reject(error);
    });


    // handling 401 and 403 status
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.error('status error in the interceptor', status);
        // log out the user if there is something wrong in the token
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;