import { atom } from 'jotai'
import { CategoriesType, TransactionType } from '../api/transaction/schema'  



// Transaction
export const transactionsAtom = atom<TransactionType[]>([])
export const categoriesAtom = atom<CategoriesType[]>([])
export const selectedCategoryAtom = atom("All")
export const searchTermAtom = atom("")
export const isThisMonthActiveAtom = atom(false)
export const isTodayActiveAtom = atom(false)