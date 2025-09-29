import { Button } from "@/components/ui/button";
import {
  TransactionType,
} from "@/app/api/transaction/schema";
import { deleteTransaction } from "@/app/api/transaction";
import { useAuth } from "@/app/context/AuthContext";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionType;
}

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const { user } = useAuth();
 
  const handleDelete = async () => {
    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }
      if (!transaction._id) {
        throw new Error("Transaction ID is not available.");
      }
      
      await deleteTransaction(transaction._id);
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
          Are you sure you want to delete this transaction? This action cannot be undone.
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

export default DeleteTransactionModal;
