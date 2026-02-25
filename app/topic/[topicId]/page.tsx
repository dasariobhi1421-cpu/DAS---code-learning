import { notFound } from "next/navigation";
import { topics } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { VideoPlayer } from "@/components/video-player";
import { ProblemList } from "@/components/problem-list";
import {
  Brackets,
  Type,
  Link as LinkIcon,
  Layers,
  GitBranch,
  Brain,
  PlayCircle,
  Code2,
  ArrowLeft,
  Search,
  Network,
  Hash,
  ArrowUpDown,
  Repeat,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  brackets: Brackets,
  text: Type,
  link: LinkIcon,
  layers: Layers,
  "git-branch": GitBranch,
  brain: Brain,
  search: Search,
  network: Network,
  hash: Hash,
  "arrow-up-down": ArrowUpDown,
  repeat: Repeat,
  zap: Zap,
};

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  const Icon = iconMap[topic.icon] || Brackets;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Topics
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl ${
              topic.color === "primary"
                ? "bg-primary/10 text-primary"
                : "bg-accent/10 text-accent"
            }`}
          >
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {topic.title}
            </h1>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </div>
        </div>

        {/* Theory Section */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <PlayCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Theory Classes
              </h2>
              <p className="text-xs text-muted-foreground">
                Watch the video lessons before solving problems
              </p>
            </div>
          </div>

          <VideoPlayer videos={topic.videos} />
        </section>

        {/* Problems Section */}
        <section id="problems" className="pb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Code2 className="h-4 w-4 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Practice Problems
              </h2>
              <p className="text-xs text-muted-foreground">
                Apply your knowledge by solving these problems
              </p>
            </div>
          </div>

          <ProblemList problems={topic.problems} topicId={topic.id} />
        </section>
      </div>
    </div>
  );
}
