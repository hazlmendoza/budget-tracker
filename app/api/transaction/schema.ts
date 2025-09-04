import { z } from 'zod'

export const transactionSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    amount: z.number(),
    category: z.string(),
    date: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format",
    }),
    type: z.enum(["income", "expense"]),
})

export const  categoriesSchema = z.object({
    name: z.string(),
})

export type TransactionType = z.infer<typeof transactionSchema>
export type CategoriesType = z.infer<typeof categoriesSchema>