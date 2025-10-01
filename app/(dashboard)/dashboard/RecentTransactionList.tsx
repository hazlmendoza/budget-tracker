import { TransactionListType } from "@/app/api/transaction/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecentTransactionList = ({ transactions }: TransactionListType) => {
  const recentTransactions = transactions.slice(0, 5);
  return (
    <Card className="card-elevated">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your latest financial activity
          </p>
        </div>
        <Link href={"/transactions"}>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View All
          </Button>{" "}
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-2"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`
                      flex h-10 w-10 items-center justify-center rounded-lg
                      ${
                        transaction.categoryId?.type === "Income"
                          ? "bg-success-light"
                          : "bg-muted"
                      }
                    `}
                >
                  {transaction.categoryId?.type === "Income" ? (
                    <ArrowUpRight className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.categoryId?.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.categoryId?.type === "Income"
                      ? "text-success"
                      : "text-foreground"
                  }`}
                >
                  {transaction.categoryId?.type === "Income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
                <span className="text-sm text-muted-foreground">
                  {transaction.date
                    ? format(transaction.date, "yyyy-MM-dd")
                    : "No date available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionList;
