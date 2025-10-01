"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IncomeExpenseChart } from "./IncomeExpenseChart";
import { SpendingChart } from "./SpendingChart";
import RecentTransactionList from "./RecentTransactionList";
import DashboardOverview from "./DashboardOverview";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/app/api/transaction";
import { useAuth } from "@/app/context/AuthContext";
import { useAtom } from "jotai";
import { transactionsListAtom } from "@/app/store/atom";
import { Plus } from "lucide-react";
import AddTransactionModal from "../transactions/modal/AddTransactionModal";

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useAtom(transactionsListAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.error("User not found in local storage");
        return;
      }

      try {
        const fetchedTransactions = await getAllTransactions(user.id);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [transactions, setTransactions, user]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen bg-background w-full">
      {/* Header */}
      <div className="border-b border-border bg-surface-1">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            </div>
            <Button className="btn-primary" onClick={handleOpenModal}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <AddTransactionModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-8 w-full">
        {/* Summary cards */}
        <DashboardOverview
          transactions={
            Array.isArray(transactions) &&
            transactions.length > 0 &&
            transactions[0]?.transactions
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                transactions.flatMap((t: any) => t.transactions)
              : transactions
          }
        />

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Spending by Category
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Current month breakdown
              </p>
            </CardHeader>
            <CardContent>
              <SpendingChart
                transactions={
                  Array.isArray(transactions) &&
                  transactions.length > 0 &&
                  transactions[0]?.transactions
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      transactions.flatMap((t: any) => t.transactions)
                    : transactions
                }
              />
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Income vs Expenses
              </CardTitle>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </CardHeader>
            <CardContent>
              <IncomeExpenseChart
                transactions={
                  Array.isArray(transactions) &&
                  transactions.length > 0 &&
                  transactions[0]?.transactions
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      transactions.flatMap((t: any) => t.transactions)
                    : transactions
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Recent transactions */}
        <RecentTransactionList
          transactions={
            Array.isArray(transactions) &&
            transactions.length > 0 &&
            transactions[0]?.transactions
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                transactions.flatMap((t: any) => t.transactions)
              : transactions
          }
        />
      </div>
    </div>
  );
}
