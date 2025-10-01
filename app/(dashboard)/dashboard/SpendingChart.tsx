import { TransactionListType } from "@/app/api/transaction/schema";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useMemo } from "react";
import EmptyData from "./EmptyData";

const SkeletonLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-pulse bg-gray-200 rounded-full h-24 w-24"></div>
  </div>
);

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699",];

export const SpendingChart = ({ transactions }: TransactionListType) => {
  const isLoading = !transactions || transactions.length === 0;

  const data = useMemo(() => {
    if (isLoading) return [];
    const dataMap = transactions.reduce((acc, transaction) => {
      const category = transaction.categoryId?.name || "Uncategorized";
      if (!acc[category]) {
        acc[category] = { name: category, value: 0 };
      }
      acc[category].value += transaction.amount;
      return acc;
    }, {} as { [key: string]: { name: string; value: number } });

    return Object.values(dataMap).map((entry, index) => ({
      ...entry,
      color: COLORS[index],
    }));
  }, [transactions, isLoading]);

  return (
    <div>
      <div style={{ height: "400px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          {isLoading ? (
            <SkeletonLoader />
          ) : data.length > 0 ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                dataKey="value"
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--card-foreground)",
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                }}
              />
            </PieChart>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <EmptyData description="Start adding transactions!" />
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
