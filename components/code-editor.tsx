"use client";

import { useState, useRef, useCallback } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeEditor({ starterCode }: { starterCode: string }) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput("");

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: unknown[]) => {
            logs.push(
              args
                .map((a) =>
                  typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
                )
                .join(" ")
            );
          },
        };

        const wrappedCode = `
          (function(console) {
            ${code}
          })
        `;

        const fn = eval(wrappedCode);
        fn(mockConsole);

        if (logs.length > 0) {
          setOutput(logs.join("\n"));
        } else {
          setOutput(
            "Code executed successfully. Use console.log() to see output."
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          setOutput(`Error: ${error.message}`);
        } else {
          setOutput("An unknown error occurred.");
        }
      } finally {
        setIsRunning(false);
      }
    }, 500);
  }, [code]);

  const resetCode = () => {
    setCode(starterCode);
    setOutput("");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      setCode(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
          </div>
          <span className="ml-2 text-xs font-mono text-muted-foreground">
            solution.js
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Reset code"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={cn(
              "flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Run code"
          >
            <Play className="h-3.5 w-3.5" />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Code Input */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[300px] w-full resize-y bg-background p-4 font-mono text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground"
          spellCheck="false"
          aria-label="Code editor"
        />
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-border">
          <div className="flex items-center gap-2 bg-secondary px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">
              Output
            </span>
          </div>
          <pre className="max-h-48 overflow-auto p-4 font-mono text-sm text-foreground">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
