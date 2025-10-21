"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import BudgetOverview from "./BudgetOverview"
import BudgetAlert from "./BudgetAlert"
import BudgetList from "./BudgetList"
import { useAuth } from "@/app/context/AuthContext"
import { budgetsListAtom } from "@/app/store/atom"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { getAllBudgets } from "@/app/api/budget"
import AddBudgetModal from "./modal/AddBudgetModal"

export default function Budget() {
  const { user } = useAuth()
  const [budgets, setBudgets] = useAtom(budgetsListAtom)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgets = await getAllBudgets(user?.id || '')
        setBudgets(budgets)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchData()
  }, [budgets, setBudgets, user])

  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface-1">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Budget</h1>
              <p className="mt-2 text-muted-foreground">
                Track your spending against your budget goals
              </p>
            </div>
             <Button className="m-2 btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Add Budget</span>
            </Button>
            <AddBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* Budget overview */}
        <BudgetOverview
          budgets={
            Array.isArray(budgets) && budgets.length > 0 && budgets[0]?.budgets
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgets.flatMap((t: any) => t.budgets)
              : budgets
          }
        />

        {/* Alerts */}
        <BudgetAlert
          budgets={
            Array.isArray(budgets) && budgets.length > 0 && budgets[0]?.budgets
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgets.flatMap((t: any) => t.budgets)
              : budgets
          }
        />

        {/* Budget categories */}
        <BudgetList
          budgets={
            Array.isArray(budgets) && budgets.length > 0 && budgets[0]?.budgets
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgets.flatMap((t: any) => t.budgets)
              : budgets
          }
        />
      </div>
    </div>
  )
}
