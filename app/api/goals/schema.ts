import { z } from 'zod'

export const GoalSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    targetAmount: z.number().min(0, "Target amount must be a positive number"),
    currentAmount: z.number().min(0, "Current amount must be a positive number").default(0).optional(),
    startDate: z.date().refine(date => date <= new Date(), {
        message: "Start date must be in the past or present",
    }),
    dueDate: z.date().refine(date => date > new Date(), {
        message: "Due date must be in the future",
    }),
    userId: z.string().nonempty("User ID is required"),
})

export const GoalListSchema = z.object({
    goals: z.array(GoalSchema)
})

export type GoalType = z.infer<typeof GoalSchema>
export type GoalListType = z.infer<typeof GoalListSchema>
