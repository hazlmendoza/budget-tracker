import { TransactionListType } from "@/app/api/transaction/schema";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { FileMinus } from "lucide-react";
import EmptyData from "./EmptyData";

const SkeletonLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-pulse bg-gray-200 rounded h-24 w-full"></div>
  </div>
);

export const IncomeExpenseChart = ({ transactions }: TransactionListType) => {
  const isLoading = !transactions || transactions.length === 0;

  // Calculate the last 6 months
  const getLastSixMonths = () => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i);
      months.push(month.toLocaleString("default", { month: "long" })); // Get month name
    }
    return months;
  };

  const months = getLastSixMonths();

  const data = useMemo(() => {
    if (isLoading) return [];
    const result = months.map((month) => ({
      month,
      income: 0,
      expenses: 0,
    }));

    transactions.forEach((transaction) => {
      const transactionDate = transaction.date
        ? new Date(transaction.date)
        : null;
      if (transactionDate) {
        const transactionMonth = transactionDate.toLocaleString("default", {
          month: "long",
        });

        const monthIndex = months.indexOf(transactionMonth);
        if (monthIndex !== -1) {
          if (transaction.type === "Income") {
            result[monthIndex].income += transaction.amount;
          } else if (transaction.type === "Expense") {
            result[monthIndex].expenses += transaction.amount;
          }
        }
      }
    });

    return result;
  }, [transactions, months, isLoading]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        {data.length > 0 ? (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
              tickFormatter={(month) => month}
              interval={0}
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
                name === "income" ? "Income" : "Expenses",
              ]}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--card-foreground)",
              }}
            />
            <Bar
              dataKey="income"
              fill="var(--success)"
              name="Income"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="expenses"
              fill="var(--primary)"
              name="Expenses"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <EmptyData description={"Start adding transactions!"} />
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};
