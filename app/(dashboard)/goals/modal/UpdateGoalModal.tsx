import { updateGoal } from "@/app/api/goals";
import { GoalSchema, GoalType } from "@/app/api/goals/schema";
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

interface UpdateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: GoalType;
}

const UpdateGoalModal: React.FC<UpdateGoalModalProps> = ({
  isOpen,
  onClose,
  goal,
}) => {
  const { user } = useAuth();
  const form = useForm<GoalType>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      userId: user?.id,
      title: goal.title,
      startDate: goal.startDate ? new Date(goal.startDate) : undefined,
      dueDate: goal.dueDate ? new Date(goal.dueDate) : undefined,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
    },
  });

  const onSubmit = async (values: GoalType) => {
    try {
      if (!user?.id) {
        throw new Error("User ID is not available.");
      }
      if (!goal._id) {
        throw new Error("Goal ID is not available.");
      }

      const formattedValues = {
        title: values.title,
        targetAmount: Number(values.targetAmount),
        currentAmount: Number(values.currentAmount),
        dueDate: values.dueDate ? new Date(values.dueDate) : new Date(),
        startDate: values.startDate ? new Date(values.startDate) : new Date(),
        userId: user.id,
      };

      await updateGoal(goal._id, formattedValues);
      toast.success("Goal Updated!", {
        description: "Your goal has been successfully updated.",
      });
      onClose();
    } catch (error) {
      toast.error("Goal Failed!", {
        description: "Something went wrong while updating your goal.",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-8">Add Goal</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-w-[400px]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
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
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
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
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>End Date*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Date"
                        type="date"
                        value={
                          field.value
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
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
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount*</FormLabel>
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
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Amount*</FormLabel>
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

export default UpdateGoalModal;
