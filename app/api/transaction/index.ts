import axios from 'axios';
import { TransactionType } from './schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllTransactions = async (userId: string) => {
    const response = await axios.get(`${API_URL}/transactions/${userId}`);
    return response.data;
};

export const getTransactionById = async (id: string) => {
    const response = await axios.get(`${API_URL}/transactions/${id}`);
    return response.data;
};

export const addTransaction = async (transaction: TransactionType) => {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
};

export const updateTransaction = async (id: string, transaction: TransactionType) => {
    const response = await axios.put(`${API_URL}/transactions/${id}`, transaction);
    return response.data;
};

export const deleteTransaction = async (id: string) => {
    await axios.delete(`${API_URL}/transactions/${id}`);
};