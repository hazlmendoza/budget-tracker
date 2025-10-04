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
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const form = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      type: "Income",
      date: new Date(),
      amount: 0,
      categoryName: "",
      userId: user?.id || "",
    },
  });

  const onSubmit = async (values: TransactionType) => {
    console.log("Form submitted", values);
    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }
      const formattedValues = {
        date: values.date ? new Date(values.date) : new Date(),
        type: values.type,
        amount: Number(values.amount),
        description: values.description,
        userId: user.id,
        categoryName: values.categoryName,
      };

      await addTransaction(formattedValues);
      console.log("Sending request with values:", formattedValues);
      toast.success("Transaction Created!", {
        description: "Your transaction has been successfully added.",
      });
      onClose();
    } catch (error) {
      toast.error("Transaction Failed!", {
        description: "Something went wrong while adding your transaction.",
      });
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
                        value={
                          field.value
                            ? typeof field.value === "string"
                              ? field.value
                              : field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? new Date(value) : undefined);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
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
                    <Input
                      placeholder="Amount"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
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
