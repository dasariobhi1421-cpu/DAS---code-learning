"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DifficultyChartProps {
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

export function DifficultyChart({
  easy,
  medium,
  hard,
  totalEasy,
  totalMedium,
  totalHard,
}: DifficultyChartProps) {
  const data = [
    { name: "Easy", solved: easy, total: totalEasy },
    { name: "Medium", solved: medium, total: totalMedium },
    { name: "Hard", solved: hard, total: totalHard },
  ];

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-4)",
  ];

  const hasData = easy > 0 || medium > 0 || hard > 0;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Difficulty Breakdown
      </h3>
      {!hasData ? (
        <div className="flex h-48 items-center justify-center">
          <p className="text-xs text-muted-foreground">
            Submit accepted solutions to see difficulty stats
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barGap={8}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--foreground)",
              }}
              formatter={(value: number, _: string, entry: { payload: { total: number } }) => [
                `${value} / ${entry.payload.total}`,
                "Solved",
              ]}
            />
            <Bar dataKey="solved" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
