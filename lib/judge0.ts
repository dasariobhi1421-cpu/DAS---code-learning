const JUDGE0_API_URL = "https://judge0-ce.p.sulu.sh";

export type LanguageKey = "c" | "cpp" | "java" | "python";

export const LANGUAGE_CONFIG: Record<
  LanguageKey,
  { id: number; name: string; ext: string; monacoId: string }
> = {
  c: { id: 50, name: "C", ext: "solution.c", monacoId: "c" },
  cpp: { id: 54, name: "C++", ext: "solution.cpp", monacoId: "cpp" },
  java: { id: 62, name: "Java", ext: "Solution.java", monacoId: "java" },
  python: { id: 71, name: "Python", ext: "solution.py", monacoId: "python" },
};

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return str;
  }
}

export async function executeCode(
  sourceCode: string,
  languageId: number,
  stdin?: string
): Promise<ExecutionResult> {
  const body: Record<string, unknown> = {
    source_code: toBase64(sourceCode),
    language_id: languageId,
    stdin: stdin ? toBase64(stdin) : undefined,
  };

  // Submit and wait for result
  const response = await fetch(
    `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,compile_output,status,time,memory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    // If rate limited or server error, try polling approach
    if (response.status === 429) {
      throw new Error("Rate limited. Please wait a moment and try again.");
    }
    throw new Error(`Judge0 API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    stdout: data.stdout ? fromBase64(data.stdout) : null,
    stderr: data.stderr ? fromBase64(data.stderr) : null,
    compile_output: data.compile_output ? fromBase64(data.compile_output) : null,
    status: data.status,
    time: data.time,
    memory: data.memory,
  };
}

export function getStatusColor(statusId: number): string {
  switch (statusId) {
    case 3: // Accepted
      return "text-primary";
    case 4: // Wrong Answer
      return "text-destructive";
    case 5: // Time Limit Exceeded
      return "text-accent";
    case 6: // Compilation Error
      return "text-destructive";
    default:
      if (statusId >= 7 && statusId <= 12) return "text-destructive"; // Runtime errors
      return "text-muted-foreground";
  }
}

export function getStatusLabel(statusId: number): string {
  switch (statusId) {
    case 1: return "In Queue";
    case 2: return "Processing";
    case 3: return "Accepted";
    case 4: return "Wrong Answer";
    case 5: return "Time Limit Exceeded";
    case 6: return "Compilation Error";
    case 7: return "Runtime Error (SIGSEGV)";
    case 8: return "Runtime Error (SIGXFSZ)";
    case 9: return "Runtime Error (SIGFPE)";
    case 10: return "Runtime Error (SIGABRT)";
    case 11: return "Runtime Error (NZEC)";
    case 12: return "Runtime Error (Other)";
    case 13: return "Internal Error";
    case 14: return "Exec Format Error";
    default: return "Unknown";
  }
}
