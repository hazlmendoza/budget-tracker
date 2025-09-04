import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  Plus,
  Target,
  Calendar,
  TrendingUp,
  Edit,
  Trophy
} from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 10000,
    current: 6500,
    deadline: "2024-12-31",
    category: "Safety",
    monthlyContribution: 500
  },
  {
    id: 2,
    title: "Vacation to Japan",
    target: 5000,
    current: 2800,
    deadline: "2024-08-15",
    category: "Travel",
    monthlyContribution: 400
  },
  {
    id: 3,
    title: "New Car Down Payment",
    target: 8000,
    current: 4200,
    deadline: "2024-10-01",
    category: "Transportation",
    monthlyContribution: 600
  },
  {
    id: 4,
    title: "Home Renovation",
    target: 15000,
    current: 3200,
    deadline: "2025-03-31",
    category: "Home",
    monthlyContribution: 800
  }
]

export default function Goals() {
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target, 0)
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0)
  const completedGoals = goals.filter(goal => goal.current >= goal.target).length
  
  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return "bg-success"
    if (percentage >= 75) return "bg-warning"
    return "bg-primary"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface-1">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Goals</h1>
              <p className="mt-2 text-muted-foreground">
                Set and track your savings goals
              </p>
            </div>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* Goals overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Goal Amount
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${totalGoalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">{goals.length} active goals</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Saved
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${totalSaved.toLocaleString()}</div>
              <p className="text-xs text-success mt-2">
                {((totalSaved / totalGoalAmount) * 100).toFixed(1)}% complete
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Goals
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{completedGoals}</div>
              <p className="text-xs text-muted-foreground mt-2">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals list */}
        <div className="grid gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your Goals</CardTitle>
              <p className="text-sm text-muted-foreground">Track progress on your savings targets</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal) => {
                const percentage = Math.min((goal.current / goal.target) * 100, 100)
                const daysRemaining = getDaysRemaining(goal.deadline)
                const isComplete = goal.current >= goal.target
                const remaining = goal.target - goal.current
                
                return (
                  <div key={goal.id} className="space-y-4 p-6 rounded-lg bg-surface-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground">
                            {goal.category}
                          </span>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(goal.deadline)}
                          </div>
                          <span className={daysRemaining < 30 ? 'text-warning' : ''}>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            ${goal.current.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            of ${goal.target.toLocaleString()} goal
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-foreground">
                            {percentage.toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isComplete ? 'Complete!' : `$${remaining.toLocaleString()} to go`}
                          </p>
                        </div>
                      </div>
                      
                      <Progress 
                        value={percentage}
                        className="h-3"
                      />
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Monthly contribution: ${goal.monthlyContribution}
                        </span>
                        {!isComplete && (
                          <span className="text-muted-foreground">
                            ~{Math.ceil(remaining / goal.monthlyContribution)} months remaining
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Add new goal */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Create New Goal</CardTitle>
              <p className="text-sm text-muted-foreground">Set a new savings target</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input id="goal-title" placeholder="e.g. Emergency Fund" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-amount">Target Amount</Label>
                  <Input id="goal-amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Target Date</Label>
                  <Input id="goal-deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-contribution">Monthly Contribution</Label>
                  <Input id="goal-contribution" type="number" placeholder="0.00" />
                </div>
              </div>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Create Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}