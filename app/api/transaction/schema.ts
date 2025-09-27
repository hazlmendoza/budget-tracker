import { z } from 'zod'

export const transactionSchema = z.object({
    date: z.date().optional(),
    type: z.enum(['income', 'expense']), 
    amount: z.number().positive(),
    description: z.string().optional(), 
    categoryName: z.string().optional(),
    categoryId: z.string().optional(), 
    userId: z.string() 
});

export const transactionListSchema = z.object({
    transactions: z.array(transactionSchema)
})


export type TransactionType = z.infer<typeof transactionSchema>
export type TransactionListType = z.infer<typeof transactionListSchema>