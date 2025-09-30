'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import GoalsOverview from "./GoalsOverview";
import GoalsList from "./GoalsList";
import { useAuth } from "@/app/context/AuthContext";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { getAllGoals } from "@/app/api/goals";
import AddGoalModal from "./modal/AddGoalModal";
import { goalsListAtom } from "@/app/store/atom";

export default function Goals() {
  const { user } = useAuth();
  const [goals, setGoals] = useAtom(goalsListAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.error("User not found in local storage");
        return;
      }

      try {
        const goals = await getAllGoals(user.id);
        setGoals(goals);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [goals, setGoals, user]);

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
              <h1 className="text-3xl font-bold text-foreground">Goals</h1>
              <p className="mt-2 text-muted-foreground">
                Set and track your savings goals
              </p>
            </div>
            <Button className="btn-primary" onClick={handleOpenModal}>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
            <AddGoalModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* Goals overview */}
        <GoalsOverview goals={Array.isArray(goals) && goals.length > 0 && goals[0]?.goals
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? goals.flatMap((t: any) => t.goals)
            : goals}/>

        {/* Goals list */}
        <div className="grid gap-6">
          <GoalsList goals={Array.isArray(goals) && goals.length > 0 && goals[0]?.goals
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? goals.flatMap((t: any) => t.goals)
            : goals}/>
        </div>
      </div>
    </div>
  )
}
