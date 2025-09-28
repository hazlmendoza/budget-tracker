import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BudgetOverview from "./BudgetOverview";
import BudgetAlert from "./BudgetAlert";
import BudgetList from "./BudgetList";


export default function Budget() {
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
        {/* TO DO: Budget overview */}
        <BudgetOverview />

        {/* TO DO: Alerts */}
        <BudgetAlert />

        {/* Budget categories */}
        <BudgetList />
      </div>
    </div>
  );
}
