import { addBudget } from "@/app/api/budget";
import { BudgetSchema, BudgetType } from "@/app/api/budget/schema";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const form = useForm<BudgetType>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      userId: user?.id,
    },
  });

  const onSubmit = async (values: BudgetType) => {
    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }
      const formattedValues = {
        categoryName: values.categoryName,
        categoryType: "Expense",
        amount: Number(values.amount),
        spent: 0,
        endDate: values.endDate ? new Date(values.endDate) : new Date(),
        startDate: values.startDate ? new Date(values.startDate) : new Date(),
        userId: user.id,
      };
      await addBudget(formattedValues);
      toast.success("Budget Created!", {
        description: "Your budget has been successfully added.",
      });
      onClose();
    } catch (error) {
      toast.error("Budget Failed!", {
        description: "Something went wrong while adding your budget.",
      });
      console.log(error);
    }
  };
  // console.log(form.formState.errors)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-8">Add Budget</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-w-[400px]"
          >
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category*</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row space-x-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Start Date*</FormLabel>
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

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>End Date*</FormLabel>
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
                  <FormLabel>Budget Amount*</FormLabel>
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
            {/* TO DO: delete this 
            <FormField
              control={form.control}
              name="spent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Spent*</FormLabel>
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
            /> */}

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

export default AddBudgetModal;
