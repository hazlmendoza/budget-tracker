import axios from 'axios';
import { TransactionType } from './schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// // Add a request interceptor to include the token in headers
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token'); // Fetch the token
//         if (token) {
//             config.headers.Authorization = `BEARER ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// API functions
export const getAllTransactions = async (userId: string) => {
    const response = await axiosInstance.get(`/transactions/${userId}`);
    return response.data;
};

export const getTransactionById = async (id: string) => {
    const response = await axiosInstance.get(`/transactions/${id}`);
    return response.data;
};

export const addTransaction = async (transaction: TransactionType) => {
    const response = await axiosInstance.post(`/transactions`, transaction);
    return response.data;
};

export const updateTransaction = async (id: string, transaction: TransactionType) => {
    const response = await axiosInstance.patch(`/transactions/${id}`, transaction);
    return response.data;
};

export const deleteTransaction = async (id: string) => {
    await axiosInstance.delete(`/transactions/${id}`);
};