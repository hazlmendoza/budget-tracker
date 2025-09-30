import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Food & Dining", value: 850, color: "hsl(160, 75%, 35%)" },
  { name: "Transportation", value: 320, color: "hsl(220, 30%, 25%)" },
  { name: "Shopping", value: 480, color: "hsl(45, 90%, 50%)" },
  { name: "Utilities", value: 220, color: "hsl(0, 75%, 55%)" },
  { name: "Entertainment", value: 180, color: "hsl(220, 15%, 45%)" },
  { name: "Healthcare", value: 150, color: "hsl(220, 15%, 65%)" },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function SpendingChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            //To do what is fill for?
            fill="var(--chart-4)"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`$${value}`, 'Amount']}
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--card-foreground)'
            }}
          />
            <Legend 
                wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px'
                }}
            />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}