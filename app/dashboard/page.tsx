"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DailyProblem } from "@/components/dashboard/daily-problem";
import { TopicProgress } from "@/components/dashboard/topic-progress";
import { SubmissionTable } from "@/components/dashboard/submission-table";
import { LanguageChart } from "@/components/dashboard/language-chart";
import { DifficultyChart } from "@/components/dashboard/difficulty-chart";
import {
  getSubmissions,
  getSolvedProblemIds,
  getStreak,
  getLanguageStats,
  getFavoriteLanguage,
  getDailyProblemIndex,
  type Submission,
} from "@/lib/storage";
import { topics } from "@/lib/data";
import type { LanguageKey } from "@/lib/judge0";
import { LayoutDashboard } from "lucide-react";

// Pre-compute flat problem list
const allProblems = topics.flatMap((t) =>
  t.problems.map((p) => ({ ...p, topicId: t.id, topicTitle: t.title }))
);

const totalProblems = allProblems.length;

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [langStats, setLangStats] = useState<Record<LanguageKey, number>>({
    c: 0,
    cpp: 0,
    java: 0,
    python: 0,
  });
  const [favLang, setFavLang] = useState<LanguageKey | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSubmissions(getSubmissions());
    setSolvedIds(getSolvedProblemIds());
    setStreak(getStreak());
    setLangStats(getLanguageStats());
    setFavLang(getFavoriteLanguage());
    setMounted(true);
  }, []);

  // Daily problem
  const dailyIndex = getDailyProblemIndex(totalProblems);
  const dailyProblemData = allProblems[dailyIndex];
  const dailyTopic = topics.find((t) => t.id === dailyProblemData?.topicId);

  // Solved per topic
  const solvedByTopic: Record<string, number> = {};
  for (const pid of solvedIds) {
    for (const topic of topics) {
      if (topic.problems.some((p) => p.id === pid)) {
        solvedByTopic[topic.id] = (solvedByTopic[topic.id] || 0) + 1;
      }
    }
  }

  // Difficulty counts
  const diffCounts = { easy: 0, medium: 0, hard: 0 };
  const diffTotals = { easy: 0, medium: 0, hard: 0 };
  for (const p of allProblems) {
    const key = p.difficulty.toLowerCase() as "easy" | "medium" | "hard";
    diffTotals[key]++;
    if (solvedIds.has(p.id)) {
      diffCounts[key]++;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Student Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your DSA progress, submissions, and daily challenges
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className={`mb-6 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <StatsCards
            solvedCount={solvedIds.size}
            totalProblems={totalProblems}
            streak={streak}
            totalSubmissions={submissions.length}
            favoriteLanguage={favLang}
          />
        </div>

        {/* Row 2: Daily Problem + Topic Progress */}
        <div
          className={`mb-6 grid gap-6 lg:grid-cols-2 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {dailyProblemData && dailyTopic && (
            <DailyProblem
              problem={dailyProblemData}
              topic={dailyTopic}
              isSolved={solvedIds.has(dailyProblemData.id)}
            />
          )}
          <TopicProgress topics={topics} solvedByTopic={solvedByTopic} />
        </div>

        {/* Row 3: Submission History */}
        <div
          className={`mb-6 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <SubmissionTable submissions={submissions} />
        </div>

        {/* Row 4: Charts */}
        <div
          className={`grid gap-6 lg:grid-cols-2 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <LanguageChart stats={langStats} />
          <DifficultyChart
            easy={diffCounts.easy}
            medium={diffCounts.medium}
            hard={diffCounts.hard}
            totalEasy={diffTotals.easy}
            totalMedium={diffTotals.medium}
            totalHard={diffTotals.hard}
          />
        </div>
      </main>
    </div>
  );
}
