import { notFound } from "next/navigation";
import { topics } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { CodeEditor } from "@/components/code-editor";
import { ProblemDescription } from "@/components/problem-description";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  const params: { topicId: string; problemId: string }[] = [];
  for (const topic of topics) {
    for (const problem of topic.problems) {
      params.push({ topicId: topic.id, problemId: problem.id });
    }
  }
  return params;
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ topicId: string; problemId: string }>;
}) {
  const { topicId, problemId } = await params;
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) notFound();

  const problemIndex = topic.problems.findIndex((p) => p.id === problemId);
  if (problemIndex === -1) notFound();

  const problem = topic.problems[problemIndex];
  const prevProblem = topic.problems[problemIndex - 1] || null;
  const nextProblem = topic.problems[problemIndex + 1] || null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/topic/${topicId}#problems`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {topic.title}
          </Link>

          <div className="flex items-center gap-2">
            {prevProblem && (
              <Link
                href={`/topic/${topicId}/problem/${prevProblem.id}`}
                className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev
              </Link>
            )}
            <span className="text-xs text-muted-foreground">
              {problemIndex + 1} / {topic.problems.length}
            </span>
            {nextProblem && (
              <Link
                href={`/topic/${topicId}/problem/${nextProblem.id}`}
                className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Problem Layout */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Description + Logic + Solution Video */}
          <div className="w-full lg:w-1/2 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
            <ProblemDescription problem={problem} />
          </div>

          {/* Right: Code Editor */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              <CodeEditor starterCode={problem.starterCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
