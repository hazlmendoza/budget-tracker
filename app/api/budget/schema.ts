import { z } from 'zod'
import { categorySchema } from '../category/schema'

export const BudgetSchema = z.object({
    _id: z.string().optional(),
    amount: z.number().positive("Amount must be greater than 0"),
    spent: z.number().optional(),
    startDate: z.date().refine(date => date instanceof Date, {
        message: "Start date is required and must be a valid date",
    }),
    endDate: z.date().refine(date => date instanceof Date, {
        message: "End date is required and must be a valid date",
    }),
    categoryName: z.string().optional(),
    categoryId: categorySchema.optional(),
    userId: z.string().nonempty("User ID is required"),
})

export const BudgetListSchema = z.object({
    budgets: z.array(BudgetSchema)
})

export type BudgetType = z.infer<typeof BudgetSchema>
export type BudgetListType = z.infer<typeof BudgetListSchema>
