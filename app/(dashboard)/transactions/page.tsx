"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TransactionList from "./TransactionList";
import { useAtom } from "jotai";
import { transactionsAtom } from "../../store/atom";
import { useEffect, useState } from "react";
import { getAllTransactions } from "../../api/transaction";
import AddTransactionModal from "./AddTransactionModal";
import { useAuth } from "@/app/context/AuthContext";

export default function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch transactions on component mount
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
  }, [setTransactions, user]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface-1">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Transactions
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage and track all your financial transactions
              </p>
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
      <div className="p-6 space-y-6">
        {/* Filters */}
        {/* <TransactionFilter /> */}

        {/* Transactions list */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
