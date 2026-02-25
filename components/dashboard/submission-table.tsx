"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LANGUAGE_CONFIG } from "@/lib/judge0";
import type { Submission } from "@/lib/storage";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const statusColors: Record<string, string> = {
  Accepted: "text-primary bg-primary/10",
  "Wrong Answer": "text-destructive bg-destructive/10",
  "Time Limit Exceeded": "text-accent bg-accent/10",
  "Compilation Error": "text-destructive bg-destructive/10",
  "Runtime Error (SIGSEGV)": "text-destructive bg-destructive/10",
  "Runtime Error (SIGXFSZ)": "text-destructive bg-destructive/10",
  "Runtime Error (SIGFPE)": "text-destructive bg-destructive/10",
  "Runtime Error (SIGABRT)": "text-destructive bg-destructive/10",
  "Runtime Error (NZEC)": "text-destructive bg-destructive/10",
  "Runtime Error (Other)": "text-destructive bg-destructive/10",
};

interface SubmissionTableProps {
  submissions: Submission[];
}

type SortKey = "submittedAt" | "status" | "language";
type SortDir = "asc" | "desc";

export function SubmissionTable({ submissions }: SubmissionTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("submittedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showAll, setShowAll] = useState(false);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = [...submissions].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortKey === "submittedAt") {
      return dir * (new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());
    }
    return dir * a[sortKey].localeCompare(b[sortKey]);
  });

  const displayed = showAll ? sorted : sorted.slice(0, 10);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    );
  };

  if (submissions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No submissions yet. Start solving problems to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Submission History
        </h3>
        <p className="text-[10px] text-muted-foreground">
          {submissions.length} total submission{submissions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Problem
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Topic
              </th>
              <th
                className="cursor-pointer px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                onClick={() => toggleSort("language")}
              >
                <span className="inline-flex items-center gap-1">
                  Language <SortIcon col="language" />
                </span>
              </th>
              <th
                className="cursor-pointer px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                onClick={() => toggleSort("status")}
              >
                <span className="inline-flex items-center gap-1">
                  Status <SortIcon col="status" />
                </span>
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Time
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Memory
              </th>
              <th
                className="cursor-pointer px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                onClick={() => toggleSort("submittedAt")}
              >
                <span className="inline-flex items-center gap-1">
                  Date <SortIcon col="submittedAt" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30"
              >
                <td className="px-4 py-2.5">
                  <Link
                    href={`/topic/${sub.topicId}/problem/${sub.problemId}`}
                    className="text-xs font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {sub.problemTitle}
                  </Link>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs text-muted-foreground">
                    {sub.topicTitle}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-foreground">
                    {LANGUAGE_CONFIG[sub.language]?.name || sub.language}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-semibold",
                      statusColors[sub.status] || "text-muted-foreground bg-secondary"
                    )}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {sub.executionTime ? `${sub.executionTime}s` : "-"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {sub.memory ? `${Math.round(sub.memory)}KB` : "-"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {new Date(sub.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length > 10 && !showAll && (
        <div className="border-t border-border px-5 py-3 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Show all {submissions.length} submissions
          </button>
        </div>
      )}
    </div>
  );
}
