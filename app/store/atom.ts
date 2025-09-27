import { atom } from 'jotai'
import { TransactionListType, TransactionType } from '../api/transaction/schema'  

// Transaction
export const transactionsAtom = atom<TransactionType[]>([])
export const transactionsListAtom = atom<TransactionListType[]>([])
