"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  Upload,
  Loader2,
  Clock,
  HardDrive,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  executeCode,
  LANGUAGE_CONFIG,
  getStatusColor,
  getStatusLabel,
  type LanguageKey,
  type ExecutionResult,
} from "@/lib/judge0";
import { saveSubmission } from "@/lib/storage";
import { toast } from "sonner";

interface CodeEditorProps {
  starterCode: string;
  starterCodes?: Record<LanguageKey, string>;
  problemId: string;
  problemTitle: string;
  topicId: string;
  topicTitle: string;
}

export function CodeEditor({
  starterCode,
  starterCodes,
  problemId,
  problemTitle,
  topicId,
  topicTitle,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<LanguageKey>("python");
  const [codes, setCodes] = useState<Record<LanguageKey, string>>(() => {
    if (starterCodes) {
      return { ...starterCodes };
    }
    return {
      c: starterCode,
      cpp: starterCode,
      java: starterCode,
      python: starterCode,
    };
  });
  const [output, setOutput] = useState<string>("");
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showStdin, setShowStdin] = useState(false);
  const [stdin, setStdin] = useState("");
  const [hasRun, setHasRun] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentCode = codes[language];

  // Close language menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const setCode = (val: string) => {
    setCodes((prev) => ({ ...prev, [language]: val }));
  };

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setExecutionResult(null);
    setHasRun(true);

    try {
      const config = LANGUAGE_CONFIG[language];
      const result = await executeCode(currentCode, config.id, stdin || undefined);
      setExecutionResult(result);

      // Build output display
      let outputText = "";
      if (result.compile_output) {
        outputText += `Compilation:\n${result.compile_output}\n`;
      }
      if (result.stderr) {
        outputText += `${result.compile_output ? "\n" : ""}Error:\n${result.stderr}\n`;
      }
      if (result.stdout) {
        outputText += `${outputText ? "\n" : ""}${result.stdout}`;
      }
      if (!outputText && result.status.id === 3) {
        outputText = "Code executed successfully (no output).";
      }
      if (!outputText) {
        outputText = `Status: ${result.status.description}`;
      }

      setOutput(outputText);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to execute code.";
      setOutput(`Error: ${msg}`);
      setExecutionResult(null);
    } finally {
      setIsRunning(false);
    }
  }, [currentCode, language, stdin]);

  const handleSubmit = useCallback(() => {
    if (!executionResult) return;

    saveSubmission({
      problemId,
      topicId,
      problemTitle,
      topicTitle,
      language,
      code: currentCode,
      status: getStatusLabel(executionResult.status.id),
      statusId: executionResult.status.id,
      executionTime: executionResult.time,
      memory: executionResult.memory,
    });

    toast.success("Submitted to DSA Lab!", {
      description: `${problemTitle} - ${getStatusLabel(executionResult.status.id)}`,
    });
  }, [executionResult, problemId, topicId, problemTitle, topicTitle, language, currentCode]);

  const resetCode = () => {
    if (starterCodes) {
      setCodes((prev) => ({ ...prev, [language]: starterCodes[language] }));
    } else {
      setCodes((prev) => ({ ...prev, [language]: starterCode }));
    }
    setOutput("");
    setExecutionResult(null);
    setHasRun(false);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const indent = language === "python" ? "    " : "  ";
      const newValue = currentCode.substring(0, start) + indent + currentCode.substring(end);
      setCode(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + indent.length;
      });
    }
  };

  const config = LANGUAGE_CONFIG[language];

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

          {/* Language Selector */}
          <div ref={langMenuRef} className="relative ml-2">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>{config.name}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", showLangMenu && "rotate-180")} />
            </button>
            {showLangMenu && (
              <div className="absolute left-0 top-full z-20 mt-1 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                {(Object.keys(LANGUAGE_CONFIG) as LanguageKey[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                      setOutput("");
                      setExecutionResult(null);
                      setHasRun(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-secondary",
                      lang === language
                        ? "text-primary font-semibold"
                        : "text-foreground"
                    )}
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {LANGUAGE_CONFIG[lang].ext}
                    </span>
                    <span className="ml-auto">{LANGUAGE_CONFIG[lang].name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
            {config.ext}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowStdin(!showStdin)}
            className={cn(
              "flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors hover:bg-background",
              showStdin ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Toggle stdin input"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Input</span>
          </button>
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
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Stdin Input */}
      {showStdin && (
        <div className="border-b border-border bg-background">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Custom Input (stdin)
            </span>
          </div>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Enter input for your program..."
            className="min-h-[60px] w-full resize-y bg-background p-3 font-mono text-xs leading-5 text-foreground outline-none placeholder:text-muted-foreground/50"
            spellCheck="false"
          />
        </div>
      )}

      {/* Code Input */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={currentCode}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[300px] w-full resize-y bg-background p-4 font-mono text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground"
          spellCheck="false"
          aria-label="Code editor"
        />
      </div>

      {/* Output */}
      {(output || isRunning) && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between bg-secondary px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Output
              </span>
              {executionResult && (
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] font-semibold",
                    executionResult.status.id === 3
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {executionResult.status.description}
                </span>
              )}
            </div>
            {executionResult && (
              <div className="flex items-center gap-3">
                {executionResult.time && (
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {executionResult.time}s
                  </div>
                )}
                {executionResult.memory && (
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <HardDrive className="h-3 w-3" />
                    {Math.round(executionResult.memory)}KB
                  </div>
                )}
              </div>
            )}
          </div>
          <pre className="max-h-48 overflow-auto p-4 font-mono text-sm text-foreground">
            {isRunning ? (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Compiling and executing...
              </span>
            ) : (
              output
            )}
          </pre>
        </div>
      )}

      {/* Submit Button */}
      {hasRun && executionResult && !isRunning && (
        <div className="flex items-center justify-between border-t border-border bg-secondary/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                executionResult.status.id === 3 ? "bg-primary" : "bg-destructive"
              )}
            />
            <span className="text-xs text-muted-foreground">
              {executionResult.status.id === 3
                ? "Looks good! Submit your solution."
                : "Fix errors and try again, or submit as-is."}
            </span>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Upload className="h-3.5 w-3.5" />
            Submit to DSA Lab
          </button>
        </div>
      )}
    </div>
  );
}
