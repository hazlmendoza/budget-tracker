"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import TransactionFilter from "./TransactionFilter"
import TransactionList from "./TransactionList"
import { useAtom } from "jotai"
import {
  isThisMonthActiveAtom,
  isTodayActiveAtom,
  searchTermAtom,
  selectedCategoryAtom,
  transactionsAtom,
} from "../../store/atom"
import { useEffect } from "react"
import { getAllTransaction } from "../../api/transaction"
import { transactionSchema } from "../../api/transaction/schema"

export default function Transactions() {
  const [transactions, setTransactions] = useAtom(transactionsAtom)
  const [selectedCategory] = useAtom(selectedCategoryAtom)
  const [searchTerm] = useAtom(searchTermAtom)

  const [isTodayActive] = useAtom(isTodayActiveAtom)
  const [isThisMonthActive] = useAtom(isThisMonthActiveAtom)

  useEffect(() => {
    const fetchData = () => {
      const validatedTransactions = getAllTransaction.map((transaction) =>
        transactionSchema.parse(transaction)
      )
      setTransactions(validatedTransactions)
    }

    fetchData()
  }, [setTransactions])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory =
      selectedCategory === "All" || transaction.category === selectedCategory

    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const transactionDate = new Date(transaction.date)

    // Check if the transaction date matches today or this month, based on active filters
    const today = new Date()
    const isToday = transactionDate.toDateString() === today.toDateString()
    const isThisMonth =
      transactionDate.getMonth() === today.getMonth() &&
      transactionDate.getFullYear() === today.getFullYear()

    const matchesDateRange = isTodayActive
      ? isToday
      : isThisMonthActive
      ? isThisMonth
      : true
    return matchesCategory && matchesSearch && matchesDateRange
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface-1">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Transactions
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage and track all your financial transactions
              </p>
            </div>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* Filters */}
        <TransactionFilter />

        {/* Transactions list */}
        <TransactionList filteredTransactions={filteredTransactions} />
      </div>
    </div>
  )
}
