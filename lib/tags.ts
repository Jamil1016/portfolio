export const ALL_TAGS = [
  // tech (7)
  "python",
  "typescript",
  "postgresql",
  "supabase",
  "fastapi",
  "nextjs",
  "claude-api",
  // patterns (6)
  "async",
  "etl",
  "incremental-sync",
  "materialized-views",
  "rls",
  "dedup",
  // ai-agents (6)
  "rag",
  "nl-sql",
  "agent",
  "tool-use",
  "evals",
  "prompt-engineering",
  // domain (3)
  "email-parsing",
  "data-quality",
  "automation",
] as const;

export type Tag = (typeof ALL_TAGS)[number];

export function isValidTag(s: string): s is Tag {
  return (ALL_TAGS as readonly string[]).includes(s);
}
