import { atom } from 'jotai'
import { TransactionType } from '../api/transaction/schema'  

// Transaction
export const transactionsAtom = atom<TransactionType[]>([])
export const selectedCategoryAtom = atom("All")
export const searchTermAtom = atom("")
export const isThisMonthActiveAtom = atom(false)
export const isTodayActiveAtom = atom(false)