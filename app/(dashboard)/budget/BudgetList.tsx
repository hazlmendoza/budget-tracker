import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@radix-ui/react-progress'
import { Edit } from 'lucide-react'
import React from 'react'

const BudgetList = () => {
  return (
    <div className="grid gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Budget Categories</CardTitle>
              <p className="text-sm text-muted-foreground">Current month progress</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* {budgets.map((budget) => {
                const percentage = Math.min((budget.spent / budget.budgeted) * 100, 100)
                const isOverBudget = budget.spent > budget.budgeted
                
                return (
                  <div key={budget.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(budget.status)}
                        <h3 className="font-medium text-foreground">{budget.category}</h3>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}
                        </span>
                        <span className={isOverBudget ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                          {((budget.spent / budget.budgeted) * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <Progress 
                        value={percentage}
                        className="h-2"
                      />
                      
                      {isOverBudget && (
                        <p className="text-sm text-destructive">
                          Over by ${(budget.spent - budget.budgeted).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })} */}
            </CardContent>
          </Card>

         
        </div>
  )
}

export default BudgetList