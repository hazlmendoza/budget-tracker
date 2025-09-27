import { z } from 'zod';

export const transactionSchema = z.object({
    id: z.string(), // ID as a string
    date: z.string().optional(), // Date as a string
    type: z.enum(['Income', 'Expense']), // Type can be either 'income' or 'expense'
    amount: z.number().positive(), // Amount is a number
    description: z.string().optional(), // Description is optional
    categoryName: z.string().optional(), // Category name is optional
    categoryId: z.string().optional(), // Category ID is optional
    userId: z.string() // User ID as a string
});

export type TransactionType = z.infer<typeof transactionSchema>;