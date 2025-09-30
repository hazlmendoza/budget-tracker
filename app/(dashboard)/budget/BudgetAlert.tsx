import { BudgetListType } from "@/app/api/budget/schema"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import React from "react"

const BudgetAlert = ({ budgets }: BudgetListType) => {
  const overBudgetCount = budgets.filter(
    (budget) => (budget.spent || 0) > budget.amount
  ).length

  return (
    <>
      {overBudgetCount > 0 && (
        <Card className="card-elevated border-destructive/20 bg-destructive-light">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="text-sm font-medium text-destructive">
                {`You're over budget in ${overBudgetCount} ${overBudgetCount === 1 ? 'category' : 'categories'}`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default BudgetAlert
