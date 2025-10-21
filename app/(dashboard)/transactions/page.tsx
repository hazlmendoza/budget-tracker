"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import TransactionList from "./TransactionList"
import { useAtom } from "jotai"
import { transactionsListAtom } from "../../store/atom"
import { useEffect, useState } from "react"
import { getAllTransactions } from "../../api/transaction"
import AddTransactionModal from "./modal/AddTransactionModal"
import { useAuth } from "@/app/context/AuthContext"

export default function Transactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useAtom(transactionsListAtom)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {

      try {
        const fetchedTransactions = await getAllTransactions(user?.id || '')
        setTransactions(fetchedTransactions)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchData()
  }, [transactions, setTransactions, user])

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
            <Button className="m-2 btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
            <AddTransactionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* TO DO: Filters */}
        {/* <TransactionFilter /> */}

        {/* Transactions list */}
        <TransactionList transactions={
          Array.isArray(transactions) && transactions.length > 0 && transactions[0]?.transactions
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? transactions.flatMap((t: any) => t.transactions)
            : transactions
        } />
      </div>
    </div>
  )
}
