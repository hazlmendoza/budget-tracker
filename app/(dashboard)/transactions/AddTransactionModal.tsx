import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  transactionSchema,
  TransactionType,
} from "@/app/api/transaction/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addTransaction } from "@/app/api/transaction";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
        description: '', // String default
      type: 'Income', // Default type
      date: '', // Empty string for date
      amount: 0, // Initialize as a number
      categoryName: '', // Optional string
    },
  });

  const onSubmit = async (values: TransactionType) => {
    try {
      const formattedValues = {
        ...values,
        amount: Number(values.amount), // Convert amount to a number
      };
      await addTransaction(formattedValues);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-8">Add Transaction</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-w-[400px]"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row space-x-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Type*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Income">Income</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Date*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Date"
                        type="date"
                        {...field}
                        className="justify-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount*</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" type="category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8 flex justify-end">
              <Button onClick={onClose} className="mr-4 min-w-28">
                Close
              </Button>
              <Button type="submit" className="min-w-28">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
