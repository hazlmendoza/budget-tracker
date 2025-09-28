import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'

const BudgetOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budgeted
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* <div className="text-3xl font-bold text-foreground">${totalBudgeted.toFixed(2)}</div> */}
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* <div className="text-3xl font-bold text-foreground">${totalSpent.toFixed(2)}</div>
              <p className={`text-xs mt-2 ${totalSpent > totalBudgeted ? 'text-destructive' : 'text-success'}`}>
                {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget
              </p> */}
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Remaining
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* <div className={`text-3xl font-bold ${remainingBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${Math.abs(remainingBudget).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {remainingBudget >= 0 ? 'Available' : 'Over budget'}
              </p> */}
            </CardContent>
          </Card>
        </div>
  )
}

export default BudgetOverview