import { Button } from "@/components/ui/button";

import { useAuth } from "@/app/context/AuthContext";
import { BudgetType } from "@/app/api/budget/schema";
import { deleteBudget } from "@/app/api/budget";

interface DeleteBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: BudgetType;
}

const DeleteBudgetModal: React.FC<DeleteBudgetModalProps> = ({
  isOpen,
  onClose,
  budget,
}) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }
      if (!budget._id) {
        throw new Error("Budget ID is not available.");
      }

      await deleteBudget(budget._id);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-8">Confirm Deletion</h1>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete the budget for{" "}
          <span className="font-semibold">{budget?.categoryName}</span>?
          This action cannot be undone.
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
  );
};

export default DeleteBudgetModal;
