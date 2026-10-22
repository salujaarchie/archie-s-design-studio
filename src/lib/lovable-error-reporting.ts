export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("Runtime error:", error, context);
}

export const reportLovableError = reportError;
