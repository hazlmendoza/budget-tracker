import { BudgetListType, BudgetType } from "@/app/api/budget/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Calendar,
  CircleCheckBig,
  Edit,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import UpdateBudgetModal from "./modal/UpdateBudgetModal";
import DeleteBudgetModal from "./modal/DeleteBudgetModal";

const BudgetList = ({ budgets }: BudgetListType) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<BudgetType | null>(null);

  const handleOpenUpdateModal = (budget: BudgetType) => {
    console.log(budget);
    setCurrentBudget(budget);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentBudget(null);
  };

  const handleOpenDeleteModal = (budget: BudgetType) => {
    setCurrentBudget(budget);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentBudget(null);
  };

  return (
    <div className="grid gap-6">
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Budget Categories
          </CardTitle>
          <p className="text-sm text-muted-foreground">Current progress</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {budgets.map((budget) => {
            const spent = budget.spent || 0; // Default to 0 if spent is undefined
            const budgeted = budget.amount || 0; // Default to 0 if budgeted is undefined
            const percentage = Math.min((spent / budgeted) * 100, 100);
            const isOverBudget = spent > budgeted;

            return (
              <div key={budget._id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="mr-2">
                        {isOverBudget ? (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        ) : (
                          <CircleCheckBig className="h-5 w-5 text-success" />
                        )}
                      </span>
                      <h3 className="font-medium text-xl text-foreground">
                        {budget.categoryName}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(budget.endDate, "yyyy-MM-dd")}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleOpenUpdateModal(budget)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleOpenDeleteModal(budget)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${spent.toFixed(2)} / ${budgeted.toFixed(2)}
                    </span>
                    <span
                      className={
                        isOverBudget
                          ? "text-destructive font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {((spent / budgeted) * 100).toFixed(1)}%
                    </span>
                  </div>

                  <Progress value={percentage} className="h-2" />

                  {isOverBudget && (
                    <p className="text-sm text-destructive">
                      Over by ${(spent - budgeted).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
        {budgets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No budgets found.</p>
          </div>
        )}

        {/* Update Budget Modal */}
        {isUpdateModalOpen && currentBudget && (
          <UpdateBudgetModal
            isOpen={isUpdateModalOpen}
            onClose={handleCloseUpdateModal}
            budget={currentBudget}
          />
        )}

        {/* Delete Budget Modal */}
        {isDeleteModalOpen && currentBudget && (
          <DeleteBudgetModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            budget={currentBudget}
          />
        )}
      </Card>
    </div>
  );
};

export default BudgetList;
