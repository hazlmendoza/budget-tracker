import { BudgetType } from './schema';
import axiosInstance from '../axiosInstance';

// API functions
export const getAllBudgets = async (userId: string) => {
    const response = await axiosInstance.get(`/budgets/${userId}`);
    return response.data;
};

export const getBudgetById = async (id: string) => {
    const response = await axiosInstance.get(`/budgets/${id}`);
    return response.data;
};

export const addBudget = async (budget: BudgetType) => {
    const response = await axiosInstance.post(`/budgets`, budget);
    return response.data;
};

export const updateBudget = async (id: string, budget: BudgetType) => {
    const response = await axiosInstance.patch(`/budgets/${id}`, budget);
    return response.data;
};

export const deleteBudget = async (id: string) => {
    await axiosInstance.delete(`/budgets/${id}`);
};