import Link from "next/link";
import type { Topic } from "@/lib/data";
import {
  Brackets,
  Type,
  Link as LinkIcon,
  Layers,
  GitBranch,
  Brain,
  PlayCircle,
  Code2,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  brackets: Brackets,
  text: Type,
  link: LinkIcon,
  layers: Layers,
  "git-branch": GitBranch,
  brain: Brain,
};

export function TopicCard({ topic }: { topic: Topic }) {
  const Icon = iconMap[topic.icon] || Brackets;

  return (
    <Link href={`/topic/${topic.id}`} className="group block">
      <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              topic.color === "primary"
                ? "bg-primary/10 text-primary"
                : "bg-accent/10 text-accent"
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {topic.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {topic.description}
        </p>

        <div className="flex items-center gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-1.5">
            <PlayCircle className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              {topic.totalVideos} Videos
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code2 className="h-4 w-4 text-accent" />
            <span className="text-xs text-muted-foreground">
              {topic.totalProblems} Problems
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
