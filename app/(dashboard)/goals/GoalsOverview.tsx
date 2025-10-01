import { GoalListType } from "@/app/api/goals/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Trophy } from "lucide-react";

const GoalsOverview = ({ goals }: GoalListType) => {
  const totalTargetAmount = goals.reduce(
    (acc, goal) => acc + goal.targetAmount,
    0
  );
  const totalCurrentAmount = goals.reduce(
    (acc, goal) => acc + (goal.currentAmount || 0),
    0
  );
  const completionRate =
    totalTargetAmount > 0
      ? ((totalCurrentAmount / totalTargetAmount) * 100).toFixed(1)
      : 0;
  const completedGoals = goals.filter(
    (goal) => (goal.currentAmount || 0) >= goal.targetAmount
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="card-elevated">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Goal Amount
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            ${totalTargetAmount}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {goals.length} active goals
          </p>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Saved
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            ${totalCurrentAmount.toLocaleString()}
          </div>
          <p className="text-xs text-success mt-2">
            {completionRate}% complete
          </p>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completed Goals
          </CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {completedGoals}
          </div>
          {/* <p className="text-xs text-muted-foreground mt-2">This year</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsOverview;
