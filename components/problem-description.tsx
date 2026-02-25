import type { Problem } from "@/lib/data";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  Easy: "text-primary bg-primary/10",
  Medium: "text-accent bg-accent/10",
  Hard: "text-destructive bg-destructive/10",
};

export function ProblemDescription({ problem }: { problem: Problem }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-foreground">{problem.title}</h2>
        <span
          className={cn(
            "rounded-md px-2.5 py-0.5 text-xs font-semibold",
            difficultyColors[problem.difficulty]
          )}
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {problem.description}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        {problem.examples.map((example, index) => (
          <div
            key={index}
            className="rounded-lg bg-secondary/50 border border-border p-4"
          >
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              Example {index + 1}
            </p>
            <div className="flex flex-col gap-1 font-mono text-sm">
              <p className="text-foreground">
                <span className="text-muted-foreground">Input: </span>
                {example.input}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Output: </span>
                {example.output}
              </p>
              {example.explanation && (
                <p className="mt-1 text-muted-foreground text-xs font-sans">
                  {example.explanation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">
          Constraints
        </h3>
        <ul className="flex flex-col gap-1">
          {problem.constraints.map((constraint, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
              <code className="font-mono text-xs">{constraint}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
