"use client";

import { useState } from "react";
import type { Problem } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  Clock,
  HardDrive,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";

const difficultyColors: Record<string, string> = {
  Easy: "text-primary bg-primary/10",
  Medium: "text-accent bg-accent/10",
  Hard: "text-destructive bg-destructive/10",
};

export function ProblemDescription({ problem }: { problem: Problem }) {
  const [showLogic, setShowLogic] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Problem Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-foreground">
            {problem.title}
          </h2>
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
              className="rounded-lg border border-border bg-secondary/50 p-4"
            >
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                Example {index + 1}
              </p>
              <div className="flex flex-col gap-1 font-mono text-sm">
                <p className="text-foreground">
                  <span className="text-muted-foreground">{"Input: "}</span>
                  {example.input}
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">{"Output: "}</span>
                  {example.output}
                </p>
                {example.explanation && (
                  <p className="mt-1 text-xs text-muted-foreground font-sans">
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

        {/* Complexity */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-secondary/30 p-3">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">
              {"Time: "}
            </span>
            <code className="font-mono text-xs font-medium text-foreground">
              {problem.timeComplexity}
            </code>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs text-muted-foreground">
              {"Space: "}
            </span>
            <code className="font-mono text-xs font-medium text-foreground">
              {problem.spaceComplexity}
            </code>
          </div>
        </div>
      </div>

      {/* Logic / Approach Card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <button
          onClick={() => setShowLogic(!showLogic)}
          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/50"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Approach / Logic
              </p>
              <p className="text-xs text-muted-foreground">
                Step-by-step thinking to solve this problem
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showLogic ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            {showLogic ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {showLogic && (
          <div className="border-t border-border px-4 pb-4 pt-3">
            <ol className="flex flex-col gap-3">
              {problem.logic.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/90 pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Solution Video Card */}
      {problem.solutionVideoId && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/50"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <PlayCircle className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Solution Video
                </p>
                <p className="text-xs text-muted-foreground">
                  Watch the detailed video explanation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showSolution ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              {showSolution ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </button>

          {showSolution && (
            <div className="border-t border-border p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${problem.solutionVideoId}`}
                  title={`${problem.title} - Solution`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
