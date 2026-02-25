import type { Problem } from "./data";
import type { LanguageKey } from "./judge0";

/**
 * Generates multi-language starter codes from the existing JS starter code.
 * Extracts the function name and parameters, then generates equivalent
 * boilerplate for C, C++, Java, and Python.
 */
export function getStarterCodes(
  problem: Problem
): Record<LanguageKey, string> {
  // If the problem already has explicit starterCodes, use them
  if (problem.starterCodes) {
    return problem.starterCodes;
  }

  // Parse the JS starter code to extract function name and params
  const jsCode = problem.starterCode;

  // Handle class-based problems (MinStack, MyQueue, LRUCache, MedianFinder)
  if (jsCode.startsWith("class ")) {
    return generateClassStarterCodes(jsCode);
  }

  // Handle dual-function problems (serialize/deserialize, encode/decode)
  const fnMatches = [...jsCode.matchAll(/function\s+(\w+)\s*\(([^)]*)\)/g)];
  if (fnMatches.length > 1) {
    return generateMultiFunctionStarterCodes(fnMatches);
  }

  // Single function problems
  const match = jsCode.match(/function\s+(\w+)\s*\(([^)]*)\)/);
  if (!match) {
    return {
      c: "// Write your solution here\n#include <stdio.h>\n\nint main() {\n    return 0;\n}",
      cpp: "// Write your solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}",
      java: "// Write your solution here\npublic class Solution {\n    public static void main(String[] args) {\n        \n    }\n}",
      python: "# Write your solution here\n",
    };
  }

  const funcName = match[1];
  const params = match[2]
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    c: generateCCode(funcName, params),
    cpp: generateCppCode(funcName, params),
    java: generateJavaCode(funcName, params),
    python: generatePythonCode(funcName, params),
  };
}

function generatePythonCode(funcName: string, params: string[]): string {
  const paramList = params.join(", ");
  return `def ${funcName}(${paramList}):\n    # Write your solution here\n    pass\n\n# Example usage:\n# print(${funcName}(${params.map(() => "...").join(", ")}))`;
}

function generateCCode(funcName: string, params: string[]): string {
  const paramList = params.map((p) => `int ${p}`).join(", ");
  return `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n// Modify parameter/return types as needed\nint ${funcName}(${paramList}) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    // Test your solution here\n    return 0;\n}`;
}

function generateCppCode(funcName: string, params: string[]): string {
  const paramList = params.map((p) => `int ${p}`).join(", ");
  return `#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\n// Modify parameter/return types as needed\nint ${funcName}(${paramList}) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    // Test your solution here\n    return 0;\n}`;
}

function generateJavaCode(funcName: string, params: string[]): string {
  const paramList = params.map((p) => `int ${p}`).join(", ");
  return `import java.util.*;\n\npublic class Solution {\n    // Modify parameter/return types as needed\n    public static int ${funcName}(${paramList}) {\n        // Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        // Test your solution here\n    }\n}`;
}

function generateClassStarterCodes(jsCode: string): Record<LanguageKey, string> {
  const classMatch = jsCode.match(/class\s+(\w+)/);
  const className = classMatch ? classMatch[1] : "Solution";

  const methods = [...jsCode.matchAll(/(\w+)\s*\(([^)]*)\)\s*\{/g)]
    .filter(m => m[1] !== "constructor" && m[1] !== className)
    .map(m => ({ name: m[1], params: m[2].trim() }));

  const pythonMethods = methods
    .map(m => `    def ${m.name}(self${m.params ? ", " + m.params : ""}):\n        pass`)
    .join("\n\n");

  const javaMethods = methods
    .map(m => `    public void ${m.name}(${m.params ? "int " + m.params.split(",").map(p => p.trim()).join(", int ") : ""}) {\n        // TODO\n    }`)
    .join("\n\n");

  const cppMethods = methods
    .map(m => `    void ${m.name}(${m.params ? "int " + m.params.split(",").map(p => p.trim()).join(", int ") : ""}) {\n        // TODO\n    }`)
    .join("\n\n");

  return {
    c: `#include <stdio.h>\n#include <stdlib.h>\n\n// Implement ${className} using structs and functions\ntypedef struct {\n    // Add fields here\n} ${className};\n\nint main() {\n    // Test your solution here\n    return 0;\n}`,
    cpp: `#include <iostream>\n#include <stack>\n#include <queue>\n#include <unordered_map>\nusing namespace std;\n\nclass ${className} {\npublic:\n    ${className}() {\n        // Initialize here\n    }\n\n${cppMethods}\n};\n\nint main() {\n    // Test your solution here\n    return 0;\n}`,
    java: `import java.util.*;\n\npublic class ${className} {\n    public ${className}() {\n        // Initialize here\n    }\n\n${javaMethods}\n\n    public static void main(String[] args) {\n        // Test your solution here\n    }\n}`,
    python: `class ${className}:\n    def __init__(self):\n        # Initialize here\n        pass\n\n${pythonMethods}\n\n# Test your solution here`,
  };
}

function generateMultiFunctionStarterCodes(
  fnMatches: RegExpExecArray[]
): Record<LanguageKey, string> {
  const pythonFns = fnMatches
    .map(m => {
      const params = m[2].trim();
      return `def ${m[1]}(${params || ""}):\n    # Write your solution here\n    pass`;
    })
    .join("\n\n");

  const javaFns = fnMatches
    .map(m => {
      const params = m[2].trim();
      const jParams = params
        ? params.split(",").map(p => "String " + p.trim()).join(", ")
        : "";
      return `    public static String ${m[1]}(${jParams}) {\n        // Write your solution here\n        return "";\n    }`;
    })
    .join("\n\n");

  const cppFns = fnMatches
    .map(m => {
      const params = m[2].trim();
      const cParams = params
        ? params.split(",").map(p => "string " + p.trim()).join(", ")
        : "";
      return `string ${m[1]}(${cParams}) {\n    // Write your solution here\n    return "";\n}`;
    })
    .join("\n\n");

  return {
    c: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n// Write your solution here\n\nint main() {\n    return 0;\n}`,
    cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\n${cppFns}\n\nint main() {\n    // Test your solution here\n    return 0;\n}`,
    java: `import java.util.*;\n\npublic class Solution {\n${javaFns}\n\n    public static void main(String[] args) {\n        // Test your solution here\n    }\n}`,
    python: `${pythonFns}\n\n# Test your solution here`,
  };
}
