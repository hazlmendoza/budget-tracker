import { atom } from 'jotai'
import { TransactionListType, TransactionType } from '../api/transaction/schema'  
import { BudgetListType, BudgetType } from '../api/budget/schema'
import { GoalListType, GoalType } from '../api/goals/schema'

// Transaction
export const transactionAtom = atom<TransactionType[]>([])
export const transactionsListAtom = atom<TransactionListType[]>([])

// Budget
export const budgetAtom = atom<BudgetType[]>([])
export const budgetsListAtom = atom<BudgetListType[]>([])

// Goal
export const goalAtom = atom<GoalType[]>([])
export const goalsListAtom = atom<GoalListType[]>([])