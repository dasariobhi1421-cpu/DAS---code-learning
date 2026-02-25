import type { LanguageKey } from "./judge0";

export interface Submission {
  id: string;
  problemId: string;
  topicId: string;
  problemTitle: string;
  topicTitle: string;
  language: LanguageKey;
  code: string;
  status: string;
  statusId: number;
  executionTime: string | null;
  memory: number | null;
  submittedAt: string;
}

const STORAGE_KEY = "dsalab_submissions";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function saveSubmission(
  submission: Omit<Submission, "id" | "submittedAt">
): Submission {
  const record: Submission = {
    ...submission,
    id: generateId(),
    submittedAt: new Date().toISOString(),
  };

  const existing = getSubmissions();
  existing.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return record;
}

export function getSubmissions(): Submission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getSubmissionsByProblem(problemId: string): Submission[] {
  return getSubmissions().filter((s) => s.problemId === problemId);
}

export function getSubmissionsByTopic(topicId: string): Submission[] {
  return getSubmissions().filter((s) => s.topicId === topicId);
}

export function getSolvedProblemIds(): Set<string> {
  const subs = getSubmissions();
  const solved = new Set<string>();
  for (const s of subs) {
    if (s.statusId === 3) {
      solved.add(s.problemId);
    }
  }
  return solved;
}

export function getStreak(): number {
  const subs = getSubmissions();
  if (subs.length === 0) return 0;

  const uniqueDays = new Set<string>();
  for (const s of subs) {
    const d = new Date(s.submittedAt);
    uniqueDays.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
  }

  const sortedDays = Array.from(uniqueDays)
    .map((d) => {
      const [y, m, day] = d.split("-").map(Number);
      return new Date(y, m, day);
    })
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDays.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    expected.setHours(0, 0, 0, 0);

    const current = new Date(sortedDays[i]);
    current.setHours(0, 0, 0, 0);

    if (current.getTime() === expected.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getLanguageStats(): Record<LanguageKey, number> {
  const subs = getSubmissions();
  const stats: Record<LanguageKey, number> = { c: 0, cpp: 0, java: 0, python: 0 };
  for (const s of subs) {
    if (s.language in stats) {
      stats[s.language]++;
    }
  }
  return stats;
}

export function getFavoriteLanguage(): LanguageKey | null {
  const stats = getLanguageStats();
  let max = 0;
  let fav: LanguageKey | null = null;
  for (const [lang, count] of Object.entries(stats)) {
    if (count > max) {
      max = count;
      fav = lang as LanguageKey;
    }
  }
  return fav;
}

export function getDailyProblemIndex(totalProblems: number): number {
  const dateStr = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % totalProblems;
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
