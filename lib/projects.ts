export type ProjectStatus = "production" | "pilot" | "prototype" | "personal";

export type Screenshot = {
  /** Path under /public, e.g. "/projects/quote-automation/queue.png". */
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectMeta = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  /** Is the system actually running and doing real work? */
  prod: ProjectStatus;
  /** Overrides the default status label when the truth needs more words. */
  statusLabel?: string;
  /**
   * Can an outsider read the code? "private" renders no repo button, only
   * PRIVATE_CODE_NOTE. "public" requires publicRepoUrl.
   */
  code: "public" | "private";
  /** Replaces PRIVATE_CODE_NOTE for private code that is not an employer system. */
  privateNote?: string;
  /** Only rendered when code === "public". */
  publicRepoUrl?: string;
  /** Button label for the repo link. Defaults to "View repository". */
  repoLabel?: string;
  /** One short proof line shown on the home-page featured card. */
  metric?: string;
  /** Optional screenshots, rendered by the case-study layout when present. */
  screenshots?: Screenshot[];
  tags: string[];
};

export const PRIVATE_CODE_NOTE =
  "Code is private (employer system). Architecture and decisions are documented here.";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  production: "In production",
  pilot: "Pilot",
  prototype: "Prototype",
  personal: "Personal tool",
};

export function statusLabel(p: ProjectMeta): string {
  return p.statusLabel ?? STATUS_LABEL[p.prod];
}

export function isLive(p: ProjectMeta): boolean {
  return p.prod === "production";
}

// Order matters: the home page features the first three as cards and lists the
// rest, so the strongest proof goes first.
export const projects: ProjectMeta[] = [
  {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Email-conversational ETL remediation agent with human-in-the-loop approvals",
    stack: ["Python", "Claude API", "Supabase", "asyncpg", "GitHub Actions", "Gmail API"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    prod: "production",
    code: "public",
    metric: "Diagnoses failed runs · asks before it fixes · public repo",
    tags: ["python", "claude-api", "agent", "tool-use", "automation", "supabase", "postgresql", "security", "ai-safety", "email-parsing"],
  },
  {
    slug: "data-analyst-reporting-agent",
    name: "DARA: Data Analyst Reporting Agent",
    tagline: "Chat-first NL→SQL analytics with Postgres RLS and a defined-metric library (prototype)",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/cca-capstone",
    repoLabel: "Public reference build",
    prod: "prototype",
    statusLabel: "Prototype, in development",
    code: "public",
    tags: ["typescript", "nextjs", "supabase", "claude-api", "nl-sql", "agent", "tool-use", "postgresql", "rls", "ai-safety"],
  },
  {
    slug: "quote-automation",
    name: "Quote Automation",
    tagline: "Internal quoting tool that took accounting from 20-30 quotes a day to over 100: review queue, batch PDF-to-Drive and Gmail-draft emailing",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Playwright"],
    publicRepoUrl: "https://github.com/Jamil1016/quote-automation",
    repoLabel: "Public reference repository",
    prod: "production",
    code: "public",
    tags: ["nextjs", "react", "typescript", "supabase", "automation", "pdf"],
  },
  {
    slug: "workforce-compliance-platform",
    name: "Workforce Report-Compliance Platform",
    tagline: "Internal platform for daily-report approvals, reminders, management PDFs and extracts, with write-back to the vendor API as each approver",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Vercel Cron", "Playwright"],
    prod: "production",
    code: "private",
    tags: ["nextjs", "react", "typescript", "supabase", "postgresql", "security", "automation", "pdf", "dashboards"],
  },
  {
    slug: "event-driven-sync",
    name: "Event-Driven Sync on Google Cloud",
    tagline: "Change events over SSE trigger debounced incremental walks and guarded idempotent upserts, with an hourly reconcile as the safety net",
    stack: ["Python", "psycopg3", "Cloud Run", "Cloud Scheduler", "Secret Manager", "GitHub Actions (OIDC)"],
    prod: "production",
    statusLabel: "One job in production · listener in shadow",
    code: "private",
    tags: ["python", "postgresql", "incremental-sync", "etl", "automation", "security", "data-quality"],
  },
  {
    slug: "local-pipeline",
    name: "Async ETL Platform",
    tagline: "Async multi-pipeline ETL into Postgres: about 14 scheduled pipelines across 25 GitHub Actions workflows",
    stack: ["Python", "asyncpg", "Postgres", "Supabase", "GitHub Actions", "Apps Script"],
    publicRepoUrl: "https://github.com/Jamil1016/local-pipeline",
    repoLabel: "Public reference repository",
    prod: "production",
    code: "public",
    metric: "12.2M+ rows · 111 tables · about 14 scheduled pipelines",
    tags: ["python", "async", "etl", "postgresql", "materialized-views", "incremental-sync", "automation", "supabase", "dedup", "data-quality"],
  },
  {
    slug: "report-automation",
    name: "Report Automation",
    tagline: "Scheduled report suite: finance, compliance and open-items reports via Gmail, Drive and Google Chat",
    stack: ["Python", "Supabase", "Playwright", "Gmail API", "Google Drive", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/report-automation",
    repoLabel: "Public reference repository",
    prod: "production",
    code: "public",
    tags: ["python", "automation", "etl", "postgresql", "supabase", "pdf", "dashboards", "visualization"],
  },
  {
    slug: "date-validator",
    name: "Cross-Source Date Validator",
    tagline: "Daily reconciliation of task completion dates in the system of record against dates reported by email",
    stack: ["Python", "Postgres", "asyncpg", "GitHub Actions", "Apps Script", "Gmail API"],
    prod: "production",
    code: "private",
    tags: ["python", "data-quality", "automation", "postgresql", "security", "dedup", "incremental-sync", "async"],
  },
  {
    slug: "gmail-scraper",
    name: "Gmail Document Parser",
    tagline: "HTML email → JSONB with dynamic field discovery",
    stack: ["Python", "Gmail API", "Postgres", "BeautifulSoup", "Supabase"],
    publicRepoUrl: "https://github.com/Jamil1016/gmail-scraper",
    repoLabel: "Public reference repository",
    prod: "production",
    code: "public",
    tags: ["python", "email-parsing", "postgresql", "automation", "dedup", "supabase"],
  },
  {
    slug: "report-run-ledger",
    name: "Report Run Ledger and Scheduler",
    tagline: "Pilot: one place that records every report run, dispatches scheduled ones, and flags missed or stuck runs",
    stack: ["Next.js 16", "TypeScript", "Supabase", "zod", "Vercel Cron", "GitHub Actions"],
    prod: "pilot",
    statusLabel: "Pilot (test phase)",
    code: "private",
    tags: ["nextjs", "typescript", "supabase", "postgresql", "automation", "security", "dashboards"],
  },
  {
    slug: "rfds-extractor",
    name: "RFDS Extractor",
    tagline: "Gmail PDF scraper with a deterministic parser + optional Claude fallback",
    stack: ["Python", "pdfplumber", "Gmail API", "PyInstaller"],
    publicRepoUrl: "https://github.com/Jamil1016/rfds-extractor",
    prod: "production",
    code: "public",
    tags: ["python", "email-parsing", "pdf", "claude-api", "automation"],
  },
  {
    slug: "pdf-attachment-extractor",
    name: "PDF Attachment Extractor",
    tagline: "Org-wide parallel PDF requirement downloader over the vendor's project-management API",
    stack: ["Python", "requests", "ThreadPoolExecutor", "openpyxl"],
    prod: "production",
    code: "private",
    tags: ["python", "pdf", "automation", "etl", "incremental-sync"],
  },
  {
    slug: "gc-asset-lake",
    name: "GC Asset Lake",
    tagline: "Lakehouse-lite ETL: incremental API sync with hybrid hot (Postgres) / cold (Parquet + DuckDB) storage",
    stack: ["Python", "DuckDB", "Parquet", "Supabase", "psycopg2"],
    publicRepoUrl: "https://github.com/Jamil1016/gc-asset-lake",
    prod: "prototype",
    code: "public",
    tags: ["python", "etl", "postgresql", "incremental-sync", "automation", "async"],
  },
  {
    slug: "daily-claude-digest",
    name: "Daily Claude Digest",
    tagline: "Personal daily briefing: fail-soft fetchers, one Claude composition call, sent over Gmail, scheduled via GitHub Actions",
    stack: ["Python", "Claude API", "Gmail API", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/daily-claude-digest",
    prod: "personal",
    code: "public",
    tags: ["python", "claude-api", "automation", "prompt-engineering"],
  },
  {
    slug: "portal",
    name: "Ops Portal",
    tagline: "Internal ops portal UI: unified data-health, dashboards & embedded analyst (foundation phase)",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Framer Motion"],
    publicRepoUrl: "https://github.com/Jamil1016/portal",
    prod: "prototype",
    code: "public",
    tags: ["nextjs", "react", "typescript", "supabase", "security", "dashboards"],
  },
  {
    slug: "agent-town",
    name: "Agent Town",
    tagline: "Live pixel-art town that visualizes a monorepo's activity in real time",
    stack: ["TypeScript", "Phaser 3", "Node", "WebSockets", "Vite"],
    prod: "prototype",
    code: "private",
    privateNote: "Code is private. Architecture and decisions are documented here.",
    tags: ["typescript", "visualization", "websockets", "nodejs", "automation"],
  },
];

export const PRODUCTION_COUNT = projects.filter(isLive).length;

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
