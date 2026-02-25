"use client";

import { Flame, Code2, Trophy, Heart } from "lucide-react";
import { LANGUAGE_CONFIG, type LanguageKey } from "@/lib/judge0";

interface StatsCardsProps {
  solvedCount: number;
  totalProblems: number;
  streak: number;
  totalSubmissions: number;
  favoriteLanguage: LanguageKey | null;
}

export function StatsCards({
  solvedCount,
  totalProblems,
  streak,
  totalSubmissions,
  favoriteLanguage,
}: StatsCardsProps) {
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const cards = [
    {
      label: "Problems Solved",
      value: (
        <div className="flex items-center gap-3">
          <svg width="56" height="56" viewBox="0 0 80 80" className="shrink-0">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--border)"
              strokeWidth="5"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 40 40)"
              className="transition-all duration-1000"
            />
            <text
              x="40"
              y="40"
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground text-sm font-bold"
              style={{ fontSize: "14px" }}
            >
              {progressPercent}%
            </text>
          </svg>
          <div>
            <div className="text-2xl font-bold tabular-nums text-foreground">
              {solvedCount}
              <span className="text-sm font-normal text-muted-foreground">
                /{totalProblems}
              </span>
            </div>
          </div>
        </div>
      ),
      icon: Trophy,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      label: "Current Streak",
      value: (
        <div className="text-2xl font-bold tabular-nums text-foreground">
          {streak}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            {streak === 1 ? "day" : "days"}
          </span>
        </div>
      ),
      icon: Flame,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
    },
    {
      label: "Total Submissions",
      value: (
        <div className="text-2xl font-bold tabular-nums text-foreground">
          {totalSubmissions}
        </div>
      ),
      icon: Code2,
      iconColor: "text-chart-3",
      iconBg: "bg-chart-3/10",
    },
    {
      label: "Favorite Language",
      value: (
        <div className="text-2xl font-bold text-foreground">
          {favoriteLanguage ? LANGUAGE_CONFIG[favoriteLanguage].name : "N/A"}
        </div>
      ),
      icon: Heart,
      iconColor: "text-chart-4",
      iconBg: "bg-chart-4/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {card.label}
            </span>
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg}`}>
              <card.icon className={`h-4 w-4 ${card.iconColor}`} />
            </div>
          </div>
          {card.value}
        </div>
      ))}
    </div>
  );
}
