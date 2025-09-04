import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Aug", income: 5200, expenses: 3800 },
  { month: "Sep", income: 5200, expenses: 4100 },
  { month: "Oct", income: 5400, expenses: 3650 },
  { month: "Nov", income: 5200, expenses: 3950 },
  { month: "Dec", income: 5600, expenses: 4200 },
  { month: "Jan", income: 5200, expenses: 3150 },
]

export function IncomeExpenseChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--border)"
            opacity={0.3}
          />
          <XAxis 
            dataKey="month" 
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`, 
              name === 'income' ? 'Income' : 'Expenses'
            ]}
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--card-foreground)'
            }}
          />
          <Bar 
            dataKey="income" 
            fill="var(--success)" 
            name="income"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="expenses" 
            fill="var(--primary)" 
            name="expenses"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}