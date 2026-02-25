"use client";

import type { Topic } from "@/lib/data";
import Link from "next/link";

interface TopicProgressProps {
  topics: Topic[];
  solvedByTopic: Record<string, number>;
}

export function TopicProgress({ topics, solvedByTopic }: TopicProgressProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Topic Progress
      </h3>
      <div className="flex flex-col gap-3">
        {topics.map((topic) => {
          const solved = solvedByTopic[topic.id] || 0;
          const total = topic.totalProblems;
          const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

          return (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="group flex flex-col gap-1.5 rounded-lg p-2 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                  {topic.title}
                </span>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {solved}/{total}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary">
                <div
                  className="h-1.5 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
