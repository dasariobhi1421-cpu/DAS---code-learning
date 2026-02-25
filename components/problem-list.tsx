import Link from "next/link";
import type { Problem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const difficultyColors: Record<string, string> = {
  Easy: "text-primary bg-primary/10",
  Medium: "text-accent bg-accent/10",
  Hard: "text-destructive bg-destructive/10",
};

export function ProblemList({
  problems,
  topicId,
}: {
  problems: Problem[];
  topicId: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {problems.map((problem, index) => (
        <Link
          key={problem.id}
          href={`/topic/${topicId}/problem/${problem.id}`}
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-mono font-semibold text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {problem.title}
            </h4>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                  difficultyColors[problem.difficulty]
                )}
              >
                {problem.difficulty}
              </span>
              {problem.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}
