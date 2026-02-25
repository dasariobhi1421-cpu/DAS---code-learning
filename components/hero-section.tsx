"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Terminal, ArrowDown, Code2, Braces, Hash } from "lucide-react";
import { useParallax } from "@/hooks/use-scroll-animation";

// Code snippets for each language
const CODE_SNIPPETS = [
  {
    lang: "Python",
    file: "solution.py",
    lines: [
      { text: "def two_sum(nums, target):", color: "text-primary" },
      { text: "    seen = {}", color: "text-accent" },
      { text: "    for i, num in enumerate(nums):", color: "text-muted-foreground" },
      { text: "        diff = target - num", color: "text-accent" },
      { text: "        if diff in seen:", color: "text-primary" },
      { text: "            return [seen[diff], i]", color: "text-primary" },
      { text: "        seen[num] = i", color: "text-muted-foreground" },
    ],
  },
  {
    lang: "C++",
    file: "solution.cpp",
    lines: [
      { text: "#include <unordered_map>", color: "text-muted-foreground" },
      { text: "vector<int> twoSum(vector<int>& nums, int target) {", color: "text-primary" },
      { text: "    unordered_map<int,int> seen;", color: "text-accent" },
      { text: "    for (int i = 0; i < nums.size(); i++) {", color: "text-muted-foreground" },
      { text: "        int diff = target - nums[i];", color: "text-accent" },
      { text: "        if (seen.count(diff)) return {seen[diff], i};", color: "text-primary" },
      { text: "        seen[nums[i]] = i;", color: "text-muted-foreground" },
      { text: "    }", color: "text-muted-foreground" },
      { text: "}", color: "text-primary" },
    ],
  },
  {
    lang: "Java",
    file: "Solution.java",
    lines: [
      { text: "public int[] twoSum(int[] nums, int target) {", color: "text-primary" },
      { text: "    Map<Integer,Integer> seen = new HashMap<>();", color: "text-accent" },
      { text: "    for (int i = 0; i < nums.length; i++) {", color: "text-muted-foreground" },
      { text: "        int diff = target - nums[i];", color: "text-accent" },
      { text: "        if (seen.containsKey(diff))", color: "text-primary" },
      { text: "            return new int[]{seen.get(diff), i};", color: "text-primary" },
      { text: "        seen.put(nums[i], i);", color: "text-muted-foreground" },
      { text: "    }", color: "text-muted-foreground" },
      { text: "}", color: "text-primary" },
    ],
  },
  {
    lang: "C",
    file: "solution.c",
    lines: [
      { text: "#include <stdlib.h>", color: "text-muted-foreground" },
      { text: "int* twoSum(int* nums, int n, int target) {", color: "text-primary" },
      { text: "    for (int i = 0; i < n; i++) {", color: "text-muted-foreground" },
      { text: "        for (int j = i+1; j < n; j++) {", color: "text-muted-foreground" },
      { text: "            if (nums[i]+nums[j] == target) {", color: "text-accent" },
      { text: '                int* res = malloc(2*sizeof(int));', color: "text-primary" },
      { text: "                res[0]=i; res[1]=j;", color: "text-primary" },
      { text: "                return res;", color: "text-accent" },
      { text: "    } } } return NULL; }", color: "text-muted-foreground" },
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

function FloatingParticle({
  icon: Icon,
  className,
  delay,
}: {
  icon: React.ElementType;
  className: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-1000 ${
        visible ? "opacity-20" : "opacity-0 scale-75"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Icon className="h-6 w-6 text-primary" />
    </div>
  );
}

function TypingCodeAnimation() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const snippet = CODE_SNIPPETS[snippetIndex];

  useEffect(() => {
    if (isDeleting) {
      // Clear lines one by one from bottom
      if (displayedLines.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedLines((prev) => prev.slice(0, -1));
        }, 40);
        return () => clearTimeout(timer);
      } else {
        // Move to next snippet
        setIsDeleting(false);
        setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        return;
      }
    }

    // Typing mode
    if (currentLineIndex >= snippet.lines.length) {
      // Done typing all lines, pause then start deleting
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    const currentLine = snippet.lines[currentLineIndex].text;

    if (currentCharIndex <= currentLine.length) {
      const timer = setTimeout(() => {
        const partial = currentLine.slice(0, currentCharIndex);
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = partial;
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 25 + Math.random() * 20);
      return () => clearTimeout(timer);
    } else {
      // Move to next line
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [
    snippetIndex,
    currentLineIndex,
    currentCharIndex,
    isDeleting,
    displayedLines.length,
    snippet.lines,
  ]);

  const isTypingComplete = currentLineIndex >= snippet.lines.length && !isDeleting;
  const showCursorOnLine = isDeleting ? -1 : currentLineIndex;

  return (
    <div className="space-y-0.5">
      {snippet.lines.map((line, i) => {
        const displayText = displayedLines[i] ?? "";
        const isCurrentLine = i === showCursorOnLine;
        if (i > currentLineIndex && !isDeleting) return null;
        if (displayText === "" && !isCurrentLine) return null;

        return (
          <div
            key={`${snippetIndex}-${i}`}
            className={`font-mono text-xs ${line.color} transition-opacity duration-200`}
          >
            {displayText}
            {isCurrentLine && !isTypingComplete && (
              <span className="inline-block w-[6px] h-[14px] bg-primary ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
            )}
          </div>
        );
      })}
      {isTypingComplete && (
        <div className="font-mono text-xs text-muted-foreground">
          <span className="inline-block w-[6px] h-[14px] bg-primary/60 align-middle animate-[blink_1s_step-end_infinite]" />
        </div>
      )}
    </div>
  );
}

function MouseGlow({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x, y });
        setVisible(true);
      });
    },
    [containerRef]
  );

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, handleMouseMove, handleMouseLeave]);

  return (
    <div
      className="pointer-events-none absolute rounded-full bg-primary/10 blur-3xl transition-opacity duration-500"
      style={{
        width: 300,
        height: 300,
        left: pos.x - 150,
        top: pos.y - 150,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

export function HeroSection() {
  const scrollY = useParallax();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [snippetIndex, setSnippetIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track snippet index changes from TypingCodeAnimation via an interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
    }, 12000); // Roughly matches the typing cycle
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* Mouse-following glow */}
      <MouseGlow containerRef={sectionRef} />

      {/* Parallax gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent transition-opacity duration-500"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />

      {/* Secondary glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl transition-opacity duration-500"
        style={{
          transform: `translate(-50%, ${scrollY * 0.08}px)`,
          opacity: mounted ? 0.6 : 0,
        }}
      />

      {/* Floating code particles */}
      <FloatingParticle
        icon={Braces}
        className="left-[10%] top-[20%] animate-[float_6s_ease-in-out_infinite]"
        delay={400}
      />
      <FloatingParticle
        icon={Hash}
        className="right-[12%] top-[25%] animate-[float_8s_ease-in-out_infinite_1s]"
        delay={700}
      />
      <FloatingParticle
        icon={Code2}
        className="left-[20%] bottom-[20%] animate-[float_7s_ease-in-out_infinite_0.5s]"
        delay={1000}
      />
      <FloatingParticle
        icon={Terminal}
        className="right-[18%] bottom-[25%] animate-[float_5s_ease-in-out_infinite_1.5s]"
        delay={600}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 transition-all duration-700 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
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
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
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
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Stop jumping into problems blindly. Watch curated video lectures to
          understand the concepts, then solve problems with confidence. Build
          your logic step by step.
        </p>

        {/* CTA + Avatars */}
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-700 sm:flex-row sm:justify-center ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
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
                    mounted
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
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

        {/* Animated code snippet with typing effect */}
        <div
          className={`mx-auto mt-12 max-w-md rounded-xl border border-border bg-secondary/50 p-4 text-left backdrop-blur-sm transition-all duration-700 ${
            mounted
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="mb-3 flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="ml-2 text-[10px] text-muted-foreground transition-all duration-300">
              {CODE_SNIPPETS[snippetIndex % CODE_SNIPPETS.length].file}
            </span>
            <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
              {CODE_SNIPPETS[snippetIndex % CODE_SNIPPETS.length].lang}
            </span>
          </div>
          <div className="min-h-[140px]">
            <TypingCodeAnimation />
          </div>
        </div>

        {/* Stat counters */}
        <div
          className={`mx-auto mt-12 grid max-w-lg grid-cols-3 gap-8 transition-all duration-700 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
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
            <span className="text-xs text-muted-foreground">
              Scroll to explore
            </span>
            <div className="flex h-6 w-4 items-start justify-center rounded-full border border-muted-foreground/30 p-1">
              <div className="h-1.5 w-1 animate-bounce rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
