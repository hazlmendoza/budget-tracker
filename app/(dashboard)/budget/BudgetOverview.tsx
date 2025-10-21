import { BudgetListType } from '@/app/api/budget/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const BudgetOverview = ({ budgets }: BudgetListType) => {
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0)
  const totalSpent = budgets.reduce(
    (acc, budget) => acc + (budget.spent || 0),
    0,
  )

  // Avoid division by zero
  const budgetedPercent =
    totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0
  const remainingBudget = totalBudget - totalSpent

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-6 whitespace-nowrap">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budgeted
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground min-w-40">
              ${totalBudget}
            </div>
            
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground min-w-40">
              ${totalSpent}
            </div>
            <p
              className={`text-xs mt-2 ${
                totalSpent > totalBudget ? 'text-destructive' : 'text-success'
              }`}
            >
              {budgetedPercent}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold min-w-40 ${
                remainingBudget >= 0 ? 'text-success' : 'text-destructive'
              }`}
            >
              ${Math.abs(remainingBudget).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {remainingBudget >= 0 ? 'Available' : 'Over budget'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BudgetOverview
