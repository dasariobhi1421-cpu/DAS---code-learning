"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, BookOpen, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Terminal className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            DSA<span className="text-primary">Lab</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Topics</span>
          </Link>
          <Link
            href="/#problems"
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              "text-muted-foreground hover:text-foreground"
            )}
          >
            <Code2 className="h-4 w-4" />
            <span className="hidden sm:inline">Practice</span>
          </Link>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5 sm:flex">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">
              12 Topics Available
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
