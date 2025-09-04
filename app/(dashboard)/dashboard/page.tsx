'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  DollarSign,
  Plus,
  Eye
} from "lucide-react"
import { IncomeExpenseChart } from "../../../components/ui/IncomeExpenseChart"
import { SpendingChart } from "../../../components/SpendingChart"

const summaryData = [
  {
    title: "Total Balance",
    value: "$24,580.50",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Monthly Income",
    value: "$5,200.00",
    change: "+8.2%",
    trend: "up" as const,
    icon: ArrowUpRight,
  },
  {
    title: "Monthly Expenses",
    value: "$3,150.75",
    change: "-2.1%",
    trend: "down" as const,
    icon: ArrowDownLeft,
  },
  {
    title: "Savings Rate",
    value: "39.4%",
    change: "+5.3%",
    trend: "up" as const,
    icon: TrendingUp,
  },
]

const recentTransactions = [
  { id: 1, name: "Grocery Store", amount: -85.32, category: "Food", date: "2024-01-15" },
  { id: 2, name: "Salary Deposit", amount: 2600.00, category: "Income", date: "2024-01-15" },
  { id: 3, name: "Electric Bill", amount: -120.45, category: "Utilities", date: "2024-01-14" },
  { id: 4, name: "Coffee Shop", amount: -12.50, category: "Food", date: "2024-01-14" },
  { id: 5, name: "Gas Station", amount: -55.00, category: "Transportation", date: "2024-01-13" },
]

export default function Dashboard() {
  return (
    <div className="h-screen bg-background w-full">
      {/* Header */}
      <div className="border-b border-border bg-surface-1">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              
            </div>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-8 w-full">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((item, index) => (
            <Card key={index} className="card-elevated animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <div className="flex h-8 w-[10%] items-center justify-center rounded-lg bg-accent">
                  <item.icon className="h-4 w-4 text-accent-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{item.value}</div>
                <p className={`text-xs font-medium flex items-center mt-2 ${
                  item.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {item.trend === 'up' ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownLeft className="mr-1 h-3 w-3" />
                  )}
                  {item.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Spending by Category</CardTitle>
              <p className="text-sm text-muted-foreground">Current month breakdown</p>
            </CardHeader>
            <CardContent>
              <SpendingChart />
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Income vs Expenses</CardTitle>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </CardHeader>
            <CardContent>
              <IncomeExpenseChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent transactions */}
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">Your latest financial activity</p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-2">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      flex h-10 w-10 items-center justify-center rounded-lg
                      ${transaction.amount > 0 ? 'bg-success-light' : 'bg-muted'}
                    `}>
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}