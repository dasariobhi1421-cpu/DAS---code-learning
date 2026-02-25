"use client";

import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Problem, Topic } from "@/lib/data";

const difficultyColors: Record<string, string> = {
  Easy: "text-primary bg-primary/10",
  Medium: "text-accent bg-accent/10",
  Hard: "text-destructive bg-destructive/10",
};

interface DailyProblemProps {
  problem: Problem;
  topic: Topic;
  isSolved: boolean;
}

export function DailyProblem({ problem, topic, isSolved }: DailyProblemProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <Zap className="h-4 w-4 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Daily Challenge
          </h3>
          <p className="text-[10px] text-muted-foreground">
            A new problem every day
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-base font-bold text-foreground">{problem.title}</h4>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {problem.description}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-md px-2 py-0.5 text-[10px] font-semibold",
            difficultyColors[problem.difficulty]
          )}
        >
          {problem.difficulty}
        </span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
          {topic.title}
        </span>
        {isSolved && (
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            Solved
          </span>
        )}
      </div>

      <Link
        href={`/topic/${topic.id}/problem/${problem.id}`}
        className="group inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {isSolved ? "Solve Again" : "Solve Now"}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
