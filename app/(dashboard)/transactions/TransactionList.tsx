                                                                                              "use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, Edit, Trash2 } from "lucide-react"

interface TransactionListProps {
  filteredTransactions: {
    id: number
    name: string
    amount: number
    category: string
    date: string
    type: string
  }[]
}

const TransactionList = ({ filteredTransactions }: TransactionListProps) => {
  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Income":
        return "status-positive"
      case "Food":
        return "status-neutral"
      case "Utilities":
        return "status-negative"
      default:
        return "status-neutral"
    }
  }

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Transaction History ({filteredTransactions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted`}
                >
                  {transaction.amount > 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {transaction.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      className={getCategoryBadgeVariant(transaction.category)}
                    >
                      {transaction.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.amount > 0
                        ? "text-success"
                        : "text-foreground"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No transactions found.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TransactionList
