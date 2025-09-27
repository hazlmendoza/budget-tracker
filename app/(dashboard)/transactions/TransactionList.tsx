"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Edit, Trash2 } from "lucide-react";

interface Transaction {
  id: string; // ID as a string
  type: "Income" | "Expense"; // Type of transaction
  amount: number; // Amount of the transaction
  date: string; // Date as a string in ISO format
  description?: string; // Optional description
  categoryId?: string | null; // Optional category ID
  categoryName?: string | null;
  userId: string; // User ID as a string
}

interface TransactionListProps {
  transactions: Transaction[]; // Expecting an array of transactions
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Transaction History ({transactions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  {transaction.amount > 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{transaction.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge>{transaction.categoryName || transaction.type}</Badge>
                    <span className="text-sm text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-success" : "text-foreground"}`}>
                    {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;