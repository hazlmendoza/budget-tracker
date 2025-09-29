import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// // Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token'); // Fetch the token
        // if (token) {
        //     config.headers.Authorization = `BEARER ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance