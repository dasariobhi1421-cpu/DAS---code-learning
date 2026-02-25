"use client";

import { useEffect, useState } from "react";
import { Terminal, ArrowDown } from "lucide-react";
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
