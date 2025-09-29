import { z } from 'zod'
import { categorySchema } from '../category/schema';


export const transactionSchema = z.object({
    _id: z.string().optional(),
    date: z.date().optional(),
    type: z.enum(['Income', 'Expense']),
    amount: z.number(),
    description: z.string().optional(),
    categoryName: z.string().optional(),
    categoryId: categorySchema.optional(),
    userId: z.string()
});

export const transactionListSchema = z.object({
    transactions: z.array(transactionSchema)
})

export type TransactionType = z.infer<typeof transactionSchema>
export type TransactionListType = z.infer<typeof transactionListSchema>