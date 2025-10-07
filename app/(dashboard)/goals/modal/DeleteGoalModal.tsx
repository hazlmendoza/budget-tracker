import { deleteGoal } from "@/app/api/goals"
import { GoalType } from "@/app/api/goals/schema"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import React from "react"
import { toast } from "sonner"

interface DeleteGoalModalProps {
  isOpen: boolean
  onClose: () => void
  goal: GoalType
}

const DeleteGoalModal: React.FC<DeleteGoalModalProps> = ({
  isOpen,
  onClose,
  goal,
}) => {
  const { user } = useAuth()

  const handleDelete = async () => {
    try {
      if (!user?.id) {
        throw new Error("User ID is not available.")
      }
      if (!goal._id) {
        throw new Error("Goal ID is not available.")
      }

      await deleteGoal(goal._id)
      toast.success("Goal Deleted!", {
              description: "Your goal has been successfully deleted.",
            })
      onClose()
    } catch (error) {
      toast.error("Goal Failed!", {
              description: "Something went wrong while deleting your goal.",
            })
      console.log(error)
    }
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-8">Confirm Deletion</h1>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete the goal for{" "}
          <span className="font-semibold">{goal?.title}</span>? This
          action cannot be undone.
        </p>
        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} className="mr-4 min-w-28">
            Close
          </Button>
          <Button onClick={handleDelete} className="min-w-28">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteGoalModal
