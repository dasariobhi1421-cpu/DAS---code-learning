"use client";

import { useState } from "react";
import type { VideoLesson } from "@/lib/data";
import { PlayCircle, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoPlayer({ videos }: { videos: VideoLesson[] }) {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  const handleVideoSelect = (video: VideoLesson) => {
    setActiveVideo(video);
    setWatchedVideos((prev) => new Set(prev).add(video.id));
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-foreground">
            {activeVideo.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {activeVideo.description}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-80">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Course Content
          </h4>
          <div className="flex flex-col gap-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={cn(
                  "flex items-start gap-3 rounded-lg p-3 text-left transition-colors",
                  activeVideo.id === video.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-secondary border border-transparent"
                )}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  {watchedVideos.has(video.id) ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <PlayCircle
                      className={cn(
                        "h-4 w-4",
                        activeVideo.id === video.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      activeVideo.id === video.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {index + 1}. {video.title}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {video.duration}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
