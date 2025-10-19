import { TransactionType } from './schema'
import axiosInstance from '../axiosInstance'

export const getAllTransactions = async (userId: string) => {
    const response = await axiosInstance.get(`/transactions/${userId}`)
    return response.data
}

export const getTransactionById = async (id: string) => {
    const response = await axiosInstance.get(`/transactions/${id}`)
    return response.data
}

export const addTransaction = async (transaction: TransactionType) => {
    const response = await axiosInstance.post(`/transactions`, transaction)
    return response.data
}

export const updateTransaction = async (id: string, transaction: TransactionType) => {
    const response = await axiosInstance.patch(`/transactions/${id}`, transaction)
    return response.data
}

export const deleteTransaction = async (id: string) => {
    await axiosInstance.delete(`/transactions/${id}`)
}