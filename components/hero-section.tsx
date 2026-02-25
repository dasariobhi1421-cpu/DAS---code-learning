"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Terminal, ArrowDown } from "lucide-react";
import { useParallax } from "@/hooks/use-scroll-animation";

const CODE_SNIPPETS = [
  {
    lang: "Python",
    badge: "PY",
    file: "solution.py",
    lines: [
      { text: "def two_sum(nums, target):", cls: "text-primary" },
      { text: "    seen = {}", cls: "text-accent" },
      { text: "    for i, num in enumerate(nums):", cls: "text-muted-foreground" },
      { text: "        diff = target - num", cls: "text-accent" },
      { text: "        if diff in seen:", cls: "text-primary" },
      { text: "            return [seen[diff], i]", cls: "text-primary" },
      { text: "        seen[num] = i", cls: "text-muted-foreground" },
    ],
  },
  {
    lang: "C++",
    badge: "C++",
    file: "solution.cpp",
    lines: [
      { text: "#include <unordered_map>", cls: "text-muted-foreground" },
      { text: "vector<int> twoSum(vector<int>& nums, int t) {", cls: "text-primary" },
      { text: "    unordered_map<int,int> seen;", cls: "text-accent" },
      { text: "    for (int i = 0; i < nums.size(); i++) {", cls: "text-muted-foreground" },
      { text: "        int d = t - nums[i];", cls: "text-accent" },
      { text: "        if (seen.count(d))", cls: "text-primary" },
      { text: "            return {seen[d], i};", cls: "text-primary" },
      { text: "        seen[nums[i]] = i;", cls: "text-muted-foreground" },
      { text: "    }", cls: "text-muted-foreground" },
      { text: "}", cls: "text-primary" },
    ],
  },
  {
    lang: "Java",
    badge: "JAVA",
    file: "Solution.java",
    lines: [
      { text: "public int[] twoSum(int[] nums, int target) {", cls: "text-primary" },
      { text: "    Map<Integer,Integer> seen = new HashMap<>();", cls: "text-accent" },
      { text: "    for (int i = 0; i < nums.length; i++) {", cls: "text-muted-foreground" },
      { text: "        int diff = target - nums[i];", cls: "text-accent" },
      { text: "        if (seen.containsKey(diff))", cls: "text-primary" },
      { text: "            return new int[]{seen.get(diff), i};", cls: "text-primary" },
      { text: "        seen.put(nums[i], i);", cls: "text-muted-foreground" },
      { text: "    }", cls: "text-muted-foreground" },
      { text: "}", cls: "text-primary" },
    ],
  },
  {
    lang: "C",
    badge: "C",
    file: "solution.c",
    lines: [
      { text: "#include <stdlib.h>", cls: "text-muted-foreground" },
      { text: "int* twoSum(int* nums, int n, int target) {", cls: "text-primary" },
      { text: "    for (int i = 0; i < n; i++)", cls: "text-muted-foreground" },
      { text: "        for (int j = i+1; j < n; j++)", cls: "text-muted-foreground" },
      { text: "            if (nums[i]+nums[j] == target) {", cls: "text-accent" },
      { text: "                int* r = malloc(2*sizeof(int));", cls: "text-primary" },
      { text: "                r[0]=i; r[1]=j;", cls: "text-primary" },
      { text: "                return r;", cls: "text-accent" },
      { text: "            }", cls: "text-muted-foreground" },
      { text: "    return NULL;", cls: "text-muted-foreground" },
      { text: "}", cls: "text-primary" },
    ],
  },
];

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(Math.round((current / steps) * target));
      if (current >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-foreground tabular-nums">
        {count}
        {label === "Practice Problems" ? "+" : ""}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function TypingCodeWindow() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "paused" | "clearing">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const snippet = CODE_SNIPPETS[snippetIdx];

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Typing phase
  useEffect(() => {
    clearTimer();

    if (phase === "typing") {
      if (lineIdx >= snippet.lines.length) {
        // All lines typed, pause before clearing
        timeoutRef.current = setTimeout(() => setPhase("paused"), 2200);
        return;
      }

      const fullLine = snippet.lines[lineIdx].text;

      if (charIdx <= fullLine.length) {
        timeoutRef.current = setTimeout(() => {
          setVisibleLines((prev) => {
            const next = [...prev];
            next[lineIdx] = fullLine.slice(0, charIdx);
            return next;
          });
          setCharIdx((c) => c + 1);
        }, 22 + Math.random() * 18);
      } else {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }
    }

    if (phase === "paused") {
      timeoutRef.current = setTimeout(() => setPhase("clearing"), 200);
    }

    if (phase === "clearing") {
      if (visibleLines.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setVisibleLines((prev) => prev.slice(0, -1));
        }, 35);
      } else {
        // Move to next snippet
        setSnippetIdx((i) => (i + 1) % CODE_SNIPPETS.length);
        setLineIdx(0);
        setCharIdx(0);
        setPhase("typing");
      }
    }

    return clearTimer;
  }, [phase, lineIdx, charIdx, snippet.lines, visibleLines.length, clearTimer]);

  const isAllTyped = lineIdx >= snippet.lines.length && phase !== "clearing";
  const cursorLineIdx = phase === "clearing" ? -1 : lineIdx;

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="block h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="block h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          {snippet.file}
        </span>
        <span className="ml-auto rounded bg-primary/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary">
          {snippet.badge}
        </span>
      </div>

      {/* Code area */}
      <div className="px-4 py-4 min-h-[200px] font-mono text-[13px] leading-6">
        {snippet.lines.map((line, i) => {
          const text = visibleLines[i];
          const isCurrent = i === cursorLineIdx;

          // Don't render lines that haven't started typing yet
          if (text === undefined && !isCurrent) return null;
          // Don't render cleared lines
          if (text === undefined && phase === "clearing") return null;

          return (
            <div key={`${snippetIdx}-${i}`} className={`${line.cls} whitespace-pre`}>
              {text ?? ""}
              {isCurrent && !isAllTyped && (
                <span
                  className="inline-block w-[7px] h-[15px] bg-primary ml-px align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              )}
            </div>
          );
        })}
        {/* Resting cursor after all lines typed */}
        {isAllTyped && phase === "typing" && (
          <div>
            <span
              className="inline-block w-[7px] h-[15px] bg-primary/70 align-middle"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  const scrollY = useParallax();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Learn DSA the right way
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`mb-6 text-balance text-4xl font-bold tracking-tight text-foreground transition-all duration-700 md:text-6xl ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Theory First,{" "}
          <span className="inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Practice Second
          </span>
        </h1>

        {/* Description */}
        <p
          className={`mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Stop jumping into problems blindly. Watch curated video lectures to
          understand the concepts, then solve problems with confidence. Build
          your logic step by step.
        </p>

        {/* CTA */}
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-700 sm:flex-row sm:justify-center ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="#topics"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            Start Learning
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-medium text-muted-foreground transition-all duration-500 ${
                    mounted ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{ transitionDelay: `${700 + i * 100}ms` }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              12 Topics, 60+ Problems
            </span>
          </div>
        </div>

        {/* Code editor window with typing animation */}
        <div
          className={`mt-12 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <TypingCodeWindow />
        </div>

        {/* Stats */}
        <div
          className={`mx-auto mt-12 grid max-w-lg grid-cols-3 gap-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          {mounted && (
            <>
              <AnimatedCounter target={12} label="Core Topics" />
              <AnimatedCounter target={27} label="Video Lessons" />
              <AnimatedCounter target={62} label="Practice Problems" />
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 flex justify-center transition-all duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDelay: "1200ms",
            opacity: mounted ? Math.max(0, 1 - scrollY / 200) : 0,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Scroll to explore</span>
            <div className="flex h-6 w-4 items-start justify-center rounded-full border border-muted-foreground/30 p-1">
              <div className="h-1.5 w-1 animate-bounce rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
