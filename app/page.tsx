import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TopicCard } from "@/components/topic-card";
import { AnimatedSection } from "@/components/animated-section";
import { topics } from "@/lib/data";
import { Zap, BookOpen, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Topics Section */}
      <section id="topics" className="mx-auto max-w-7xl px-6 pb-20">
        <AnimatedSection variant="fade-up">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Choose a Topic
              </h2>
              <p className="text-sm text-muted-foreground">
                Select a data structure or algorithm to start your journey
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <AnimatedSection
              key={topic.id}
              variant="fade-up"
              delay={index * 100}
            >
              <TopicCard topic={topic} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border bg-card px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection variant="fade-up">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                A structured approach to mastering DSA
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedSection variant="fade-up" delay={0}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 text-xs font-bold text-primary">
                  STEP 1
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Watch Theory
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Understand the core concept through curated YouTube video
                  lectures from top educators.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={150}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <div className="mb-2 text-xs font-bold text-accent">
                  STEP 2
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Read the Logic
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Each problem has a step-by-step approach breakdown so you
                  understand the thinking behind the solution.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={300}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 text-xs font-bold text-primary">
                  STEP 3
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Solve Problems
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Write your code in the built-in editor. If stuck, watch the
                  solution video walkthrough.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background px-6 py-8">
        <AnimatedSection variant="fade-up">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              DSALab - Learn, Watch, Solve
            </p>
            <p className="text-xs text-muted-foreground">
              Built for aspiring developers preparing for coding interviews
            </p>
          </div>
        </AnimatedSection>
      </footer>
    </div>
  );
}
