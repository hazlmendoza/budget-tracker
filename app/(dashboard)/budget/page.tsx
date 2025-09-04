import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Edit
} from "lucide-react"

const budgets = [
  {
    id: 1,
    category: "Food & Dining",
    budgeted: 800,
    spent: 650,
    color: "var(--success)",
    status: "good" as const
  },
  {
    id: 2,
    category: "Transportation",
    budgeted: 300,
    spent: 320,
    color: "hsl(var(--destructive))",
    status: "over" as const
  },
  {
    id: 3,
    category: "Shopping",
    budgeted: 400,
    spent: 480,
    color: "hsl(var(--destructive))",
    status: "over" as const
  },
  {
    id: 4,
    category: "Utilities",
    budgeted: 250,
    spent: 220,
    color: "hsl(var(--success))",
    status: "good" as const
  },
  {
    id: 5,
    category: "Entertainment",
    budgeted: 200,
    spent: 180,
    color: "hsl(var(--success))",
    status: "good" as const
  },
  {
    id: 6,
    category: "Healthcare",
    budgeted: 300,
    spent: 150,
    color: "hsl(var(--success))",
    status: "good" as const
  }
]

export default function Budget() {
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const remainingBudget = totalBudgeted - totalSpent
  const overBudgetCount = budgets.filter(b => b.status === "over").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "over":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "good":
        return <CheckCircle className="h-4 w-4 text-success" />
      default:
        return null
    }
  }

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100
    if (percentage > 100) return "bg-destructive"
    if (percentage > 80) return "bg-warning"
    return "bg-success"
  }

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
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* Budget overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budgeted
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${totalBudgeted.toFixed(2)}</div>
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
              <div className="text-3xl font-bold text-foreground">${totalSpent.toFixed(2)}</div>
              <p className={`text-xs mt-2 ${totalSpent > totalBudgeted ? 'text-destructive' : 'text-success'}`}>
                {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget
              </p>
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
              <div className={`text-3xl font-bold ${remainingBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${Math.abs(remainingBudget).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {remainingBudget >= 0 ? 'Available' : 'Over budget'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {overBudgetCount > 0 && (
          <Card className="card-elevated border-destructive/20 bg-destructive-light">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <p className="text-sm font-medium text-destructive">
                  You&aposre over budget in {overBudgetCount} {overBudgetCount === 1 ? 'category' : 'categories'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Budget categories */}
        <div className="grid gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Budget Categories</CardTitle>
              <p className="text-sm text-muted-foreground">Current month progress</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {budgets.map((budget) => {
                const percentage = Math.min((budget.spent / budget.budgeted) * 100, 100)
                const isOverBudget = budget.spent > budget.budgeted
                
                return (
                  <div key={budget.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(budget.status)}
                        <h3 className="font-medium text-foreground">{budget.category}</h3>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}
                        </span>
                        <span className={isOverBudget ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                          {((budget.spent / budget.budgeted) * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <Progress 
                        value={percentage}
                        className="h-2"
                      />
                      
                      {isOverBudget && (
                        <p className="text-sm text-destructive">
                          Over by ${(budget.spent - budget.budgeted).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Add new budget */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Create New Budget</CardTitle>
              <p className="text-sm text-muted-foreground">Set spending limits for a new category</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g. Groceries" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Budget Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
              </div>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Create Budget
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}