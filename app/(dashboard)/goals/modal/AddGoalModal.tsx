import { addGoal } from '@/app/api/goals'
import { GoalSchema, GoalType } from '@/app/api/goals/schema'
import { useAuth } from '@/app/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface AddGoalModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()

  const form = useForm<GoalType>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      userId: user?.id,
      currentAmount: 0,
    },
  })

  const onSubmit = async (values: GoalType) => {
    try {
      if (!user?.id) {
        throw new Error('User ID is not available.')
      }

      const formattedValues = {
        title: values.title,
        targetAmount: Number(values.targetAmount),
        currentAmount: Number(values.currentAmount),
        dueDate: values.dueDate ? new Date(values.dueDate) : new Date(),
        startDate: values.startDate ? new Date(values.startDate) : new Date(),
        userId: user.id,
      }

      await addGoal(formattedValues)
      toast.success('Goal Created!', {
        description: 'Your goal has been successfully added.',
      })
      onClose()
    } catch (error) {
      toast.error('Goal Failed!', {
        description: 'Something went wrong while adding your goal.',
      })
      console.error(error)
    }
  }

  // console.log(form.formState.errors)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-lg font-bold mb-8">Add Goal</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Date"
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined,
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
                <FormItem>
                  <FormLabel>End Date*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Date"
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined,
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
  )
}

export default AddGoalModal
