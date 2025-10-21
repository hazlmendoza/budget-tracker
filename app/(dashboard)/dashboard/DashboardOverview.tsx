import { TransactionListType } from '@/app/api/transaction/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useMemo } from 'react'

const DashboardOverview = ({ transactions }: TransactionListType) => {
  const monthlyData = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    let income = 0
    let expenses = 0
    let lastMonthIncome = 0
    let lastMonthExpenses = 0

    transactions.forEach((transaction) => {
      // Check if transaction has necessary properties
      if (transaction && transaction.date && transaction.amount != null) {
        const date = new Date(transaction.date)
        const amount = transaction.amount

        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          transaction.type === 'Income'
            ? (income += amount)
            : (expenses += amount)
        }

        if (
          date.getMonth() === currentMonth - 1 &&
          date.getFullYear() === currentYear
        ) {
          transaction.type === 'Income'
            ? (lastMonthIncome += amount)
            : (lastMonthExpenses += amount)
        }
      }
    })

    return {
      income,
      expenses,
      lastMonthIncome,
      lastMonthExpenses,
    }
  }, [transactions])

  // Calculate rates of change
  const incomeChange = useMemo(() => {
    return monthlyData.lastMonthIncome === 0
      ? monthlyData.income > 0
        ? 100
        : 0
      : ((monthlyData.income - monthlyData.lastMonthIncome) /
          monthlyData.lastMonthIncome) *
          100
  }, [monthlyData])

  const expensesChange = useMemo(() => {
    return monthlyData.lastMonthExpenses === 0
      ? monthlyData.expenses > 0
        ? 100
        : 0
      : ((monthlyData.expenses - monthlyData.lastMonthExpenses) /
          monthlyData.lastMonthExpenses) *
          100
  }, [monthlyData])

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-6 whitespace-nowrap">
        <Card className="card-elevated animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Income
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground min-w-40">
              ${monthlyData.income.toFixed(2)}
            </div>
            <p
              className={`text-xs font-medium flex items-center mt-2 
                ${incomeChange >= 0 ? 'text-success' : 'text-destructive'}
            `}
            >
              {incomeChange >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownLeft className="mr-1 h-3 w-3" />
              )}
              {incomeChange.toFixed(2)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Expenses
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              <TrendingDown className="h-4 w-4 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground min-w-40">
              ${monthlyData.expenses.toFixed(2)}
            </div>
            <p
              className={`text-xs font-medium flex items-center mt-2 
                ${expensesChange >= 0 ? 'text-success' : 'text-destructive'}
            `}
            >
              {expensesChange >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownLeft className="mr-1 h-3 w-3" />
              )}
              {expensesChange.toFixed(2)}% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardOverview
