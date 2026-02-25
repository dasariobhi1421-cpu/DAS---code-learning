import { Terminal, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Learn DSA the right way
          </span>
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Theory First,{" "}
          <span className="text-primary">Practice Second</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Stop jumping into problems blindly. Watch curated video lectures to
          understand the concepts, then solve problems with confidence. Build
          your logic step by step.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#topics"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Learning
            <ArrowDown className="h-4 w-4" />
          </a>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-medium text-muted-foreground"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              6 Topics, 24+ Problems
            </span>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-xs text-muted-foreground">Core Topics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-xs text-muted-foreground">Video Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">24+</div>
            <div className="text-xs text-muted-foreground">Practice Problems</div>
          </div>
        </div>
      </div>
    </section>
  );
}
