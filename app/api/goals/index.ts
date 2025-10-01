import { GoalType } from './schema' 
import axiosInstance from '../axiosInstance'

export const getAllGoals = async (userId: string) => {
    const response = await axiosInstance.get(`/goals/${userId}`)
    return response.data
}

export const getGoalById = async (id: string) => {
    const response = await axiosInstance.get(`/goals/${id}`)
    return response.data
}

export const addGoal = async (goal: GoalType) => {
    const response = await axiosInstance.post(`/goals`, goal)
    return response.data
}

export const updateGoal = async (id: string, goal: GoalType) => {
    const response = await axiosInstance.patch(`/goals/${id}`, goal)
    return response.data
}

export const deleteGoal = async (id: string) => {
    await axiosInstance.delete(`/goals/${id}`)
}