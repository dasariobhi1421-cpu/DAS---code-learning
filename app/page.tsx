import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TopicCard } from "@/components/topic-card";
import { topics } from "@/lib/data";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <section id="topics" className="mx-auto max-w-7xl px-6 pb-20">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            DSALab - Learn, Watch, Solve
          </p>
          <p className="text-xs text-muted-foreground">
            Built for aspiring developers preparing for coding interviews
          </p>
        </div>
      </footer>
    </div>
  );
}
