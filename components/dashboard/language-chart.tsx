"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { LanguageKey } from "@/lib/judge0";

const LANGUAGE_LABELS: Record<LanguageKey, string> = {
  c: "C",
  cpp: "C++",
  java: "Java",
  python: "Python",
};

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

interface LanguageChartProps {
  stats: Record<LanguageKey, number>;
}

export function LanguageChart({ stats }: LanguageChartProps) {
  const data = (Object.keys(stats) as LanguageKey[])
    .filter((lang) => stats[lang] > 0)
    .map((lang) => ({
      name: LANGUAGE_LABELS[lang],
      value: stats[lang],
    }));

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Language Distribution
        </h3>
        <div className="flex h-48 items-center justify-center">
          <p className="text-xs text-muted-foreground">
            Submit solutions to see language stats
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Language Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--foreground)",
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: "var(--foreground)", fontSize: "11px" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
