'use client'
import { GoalListType, GoalType } from '@/app/api/goals/schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { format } from 'date-fns'
import { Calendar, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import UpdateGoalModal from './modal/UpdateGoalModal'
import DeleteGoalModal from './modal/DeleteGoalModal'

const GoalsList = ({ goals }: GoalListType) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentGoal, setCurrentGoal] = useState<GoalType | null>(null)

  const getDaysRemaining = (dueDate: string | Date): number => {
    const today = new Date()
    const due = new Date(dueDate)
    if (isNaN(due.getTime())) {
      throw new Error('Invalid due date')
    }

    // Calculate the difference in milliseconds
    const difference = due.getTime() - today.getTime()
    // Convert milliseconds to days
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24))

    return daysRemaining
  }

  const handleOpenUpdateModal = (goal: GoalType) => {
    setCurrentGoal(goal)
    setIsUpdateModalOpen(true)
  }

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false)
    setCurrentGoal(null)
  }

  const handleOpenDeleteModal = (goal: GoalType) => {
    setCurrentGoal(goal)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCurrentGoal(null)
  }
  return (
    <div className="grid gap-6">
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Goals</CardTitle>
          <p className="text-sm text-muted-foreground mb-3">
            Track progress on your savings targets
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.map((goal) => {
            const percentage = Math.min(
              ((goal.currentAmount || 0) / goal.targetAmount) * 100,
              100,
            )
            const daysRemaining = getDaysRemaining(goal.dueDate)
            const isComplete = (goal.currentAmount || 0) >= goal.targetAmount
            const remaining = goal.targetAmount - (goal.currentAmount || 0)

            return (
              <div
                key={goal._id}
                className="space-y-3 cursor-pointer"
                onClick={() => handleOpenUpdateModal(goal)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {goal.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(goal.dueDate, 'yyyy-MM-dd')}
                      </div>
                      <span
                        className={daysRemaining < 30 ? 'text-warning' : ''}
                      >
                        {daysRemaining > 0
                          ? `${daysRemaining} days left`
                          : 'Overdue'}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenDeleteModal(goal)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${(goal.currentAmount || 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        of ${goal.targetAmount.toLocaleString()} goal
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        {percentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isComplete
                          ? 'Complete!'
                          : `$${remaining.toLocaleString()} to go`}
                      </p>
                    </div>
                  </div>

                  <Progress value={percentage} className="h-3" />
                </div>
              </div>
            )
          })}
          {goals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No goals found.</p>
            </div>
          )}
        </CardContent>
        {/* Update Goal Modal */}
        {isUpdateModalOpen && currentGoal && (
          <UpdateGoalModal
            isOpen={isUpdateModalOpen}
            onClose={handleCloseUpdateModal}
            goal={currentGoal}
          />
        )}

        {/* Delete Goal Modal */}
        {isDeleteModalOpen && currentGoal && (
          <DeleteGoalModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            goal={currentGoal}
          />
        )}
      </Card>
    </div>
  )
}

export default GoalsList
