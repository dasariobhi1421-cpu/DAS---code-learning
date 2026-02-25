"use client";

import { useEffect, useState } from "react";
import { Terminal, ArrowDown, Code2, Braces, Hash } from "lucide-react";
import { useParallax } from "@/hooks/use-scroll-animation";

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

function CodeLine({
  text,
  delay,
  color = "text-primary",
}: {
  text: string;
  delay: number;
  color?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`font-mono text-xs transition-all duration-500 ${
        visible
          ? `opacity-100 translate-x-0 ${color}`
          : "opacity-0 -translate-x-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {text}
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

        {/* Animated code snippet in the hero */}
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
            <span className="ml-2 text-[10px] text-muted-foreground">
              solution.js
            </span>
          </div>
          <div className="space-y-1">
            <CodeLine
              text="function twoSum(nums, target) {"
              delay={1200}
              color="text-primary"
            />
            <CodeLine
              text="  const map = new Map();"
              delay={1400}
              color="text-accent"
            />
            <CodeLine
              text="  for (let i = 0; i < nums.length; i++) {"
              delay={1600}
              color="text-muted-foreground"
            />
            <CodeLine
              text="    const diff = target - nums[i];"
              delay={1800}
              color="text-accent"
            />
            <CodeLine
              text="    if (map.has(diff)) return [map.get(diff), i];"
              delay={2000}
              color="text-primary"
            />
            <CodeLine
              text="    map.set(nums[i], i);"
              delay={2200}
              color="text-muted-foreground"
            />
            <CodeLine text="  }" delay={2400} color="text-muted-foreground" />
            <CodeLine text="}" delay={2600} color="text-primary" />
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
