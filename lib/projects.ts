export type ProjectStatus = "production" | "pilot" | "prototype" | "personal";

export type Screenshot = {
  /** Path under /public, e.g. "/projects/quote-automation/queue.png". */
  src: string;
  alt: string;
  caption?: string;
};

export type CaseSummary = {
  problem: string;
  built: string;
  result: string;
  role: string;
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
  /** The "30-second version" box at the top of the case study. One sentence each. */
  summary?: CaseSummary;
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
    slug: "local-pipeline",
    name: "Async ETL Platform",
    tagline: "Async multi-pipeline ETL into Postgres: about 14 scheduled pipelines across 25 GitHub Actions workflows",
    stack: ["Python", "asyncpg", "Postgres", "Supabase", "GitHub Actions", "Apps Script"],
    publicRepoUrl: "https://github.com/Jamil1016/local-pipeline",
    repoLabel: "Public reference repository",
    prod: "production",
    code: "public",
    metric: "12.2M+ rows · 111 tables · about 14 scheduled pipelines",
    summary: {
      problem: "A single sequential nightly script took about six hours, timed out, and silently dropped rows past the API's ~1,000-row cap.",
      built: "Async multi-pipeline ETL into Postgres: per-day API chunking, asyncpg binary COPY on a background event loop, atomic clear-and-reload CTEs.",
      result: "12.2M+ rows across 111 tables, about 14 pipelines nightly; the task transform fell from ~44 to ~3 minutes.",
      role: "Sole engineer",
    },
    tags: ["python", "async", "etl", "postgresql", "materialized-views", "incremental-sync", "automation", "supabase", "dedup", "data-quality"],
  },
  {
    slug: "workforce-compliance-platform",
    name: "Workforce Report-Compliance Platform",
    tagline: "Internal platform for daily-report approvals, reminders, management PDFs and extracts, with write-back to the vendor API as each approver",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Vercel Cron", "Playwright"],
    publicRepoUrl: "https://github.com/Jamil1016/drmc-demo",
    repoLabel: "Public demo repository",
    prod: "production",
    code: "public",
    screenshots: [
      { src: "/projects/workforce-compliance-platform/approvals-queue.png", alt: "Approvals queue with wait-time tiers and KPI tiles", caption: "Approvals queue in the live demo (invented data)" },
      { src: "/projects/workforce-compliance-platform/dr-monitoring.png", alt: "Filing compliance dashboard with backlog aging and daily trends", caption: "DR monitoring: filing compliance, backlog aging and late rate by group" },
      { src: "/projects/workforce-compliance-platform/hours-analysis.png", alt: "Stated versus timed hours distribution with a breach line", caption: "Hours analysis: stated hours against timer evidence" },
      { src: "/projects/workforce-compliance-platform/activity-log.png", alt: "Activity log with sign-in and approval charts", caption: "Activity log built on the audit table" },
    ],
    summary: {
      problem: "Leads approved daily reports one at a time in a slow vendor screen; reminders and the weekly picture were manual.",
      built: "Next.js app with durable SKIP LOCKED bulk approvals written back as each approver, database-enforced once-only reminders, and printed PDF packs.",
      result: "58 weekly per-member PDF packs and 4 crons in production; a bulk approve survives a closed tab.",
      role: "Sole engineer",
    },
    tags: ["nextjs", "react", "typescript", "supabase", "postgresql", "security", "automation", "pdf", "dashboards"],
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
    summary: {
      problem: "Quotes were built by hand: match invoice lines to asset metadata, pick rates, build PDFs, look up recipients.",
      built: "Next.js review queue over one SQL view, server-side react-pdf bulk generation to Drive, and Gmail drafts instead of sends.",
      result: "Accounting went from 20–30 quotes a day to over 100; in production since June 2026.",
      role: "Sole engineer",
    },
    tags: ["nextjs", "react", "typescript", "supabase", "automation", "pdf"],
  },
  {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Email-conversational ETL remediation agent with human-in-the-loop approvals",
    stack: ["Python", "Claude API", "Supabase", "asyncpg", "GitHub Actions", "Gmail API"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    prod: "production",
    code: "public",
    metric: "Diagnoses failed runs · asks before it fixes · public repo",
    summary: {
      problem: "Nightly ETL failures took about 40 minutes each to triage by hand, two or three times a week.",
      built: "Email-conversational agent that routes failures by a YAML severity tier (auto-fix, ask by email, escalate) behind a schema allowlist.",
      result: "18 failure patterns (5 auto-fix, 6 approve, 7 escalate) running in production; outcomes not yet measured.",
      role: "Sole engineer",
    },
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
    summary: {
      problem: "Leaders wanted plain-English warehouse answers; the prior tool generated SQL freely with no real access boundary.",
      built: "Manual Claude tool-use loop over Postgres with a SQL guardrail, a SECURITY INVOKER RPC and JWT-keyed row-level security.",
      result: "37 metrics and a 22-case guardrail suite work locally; prototype, not deployed, no production users.",
      role: "Sole engineer",
    },
    tags: ["typescript", "nextjs", "supabase", "claude-api", "nl-sql", "agent", "tool-use", "postgresql", "rls", "ai-safety"],
  },
  {
    slug: "event-driven-sync",
    name: "Event-Driven Sync on Google Cloud",
    tagline: "Change events over SSE trigger debounced incremental walks and guarded idempotent upserts, with an hourly reconcile as the safety net",
    stack: ["Python", "psycopg3", "Cloud Run", "Cloud Scheduler", "Secret Manager", "GitHub Actions (OIDC)"],
    prod: "production",
    statusLabel: "One job in production · listener in shadow",
    code: "private",
    summary: {
      problem: "Scheduled API pulls left data up to 58 minutes stale and walked every project to find nothing changed.",
      built: "Cloud Run SSE listener with per-project 60-second debounce, IS DISTINCT FROM guarded upserts, and an hourly sharded reconcile job.",
      result: "~290 to ~100 quiet-hour API calls and ~20 s freshness; one job in production, listener in shadow.",
      role: "Sole engineer; in production since September 2026",
    },
    tags: ["python", "postgresql", "incremental-sync", "etl", "automation", "security", "data-quality"],
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
    summary: {
      problem: "Recurring finance and compliance reports had no reliable automated delivery; a missed report meant reconstructing numbers by hand.",
      built: "Python report suite triggered by Apps Script and upstream pipeline events, Chart.js rendered to PDF via Playwright, sent over the Gmail API.",
      result: "4 of 7 reports live for months; ~4-minute daily finance run, 5–15 minutes from trigger to inbox.",
      role: "Sole engineer",
    },
    tags: ["python", "automation", "etl", "postgresql", "supabase", "pdf", "dashboards", "visualization"],
  },
  {
    slug: "date-validator",
    name: "Cross-Source Date Validator",
    tagline: "Daily reconciliation of task completion dates in the system of record against dates reported by email",
    stack: ["Python", "Postgres", "asyncpg", "GitHub Actions", "Apps Script", "Gmail API"],
    prod: "production",
    code: "private",
    summary: {
      problem: "Task completion dates in the vendor platform and in status emails drifted; mismatches surfaced weeks later.",
      built: "Daily Postgres reconciliation view with multi-method matching and confidence scores, delta-vs-snapshot diffs, and one-click Scrub/Confirm emails.",
      result: "176 email date patterns parsed across two task kinds and three client groups; runs every evening in production.",
      role: "Sole engineer",
    },
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
    summary: {
      problem: "Close-out status reports arrived as HTML emails with five package types and shifting fields; data was copy-pasted by hand.",
      built: "Incremental Gmail fetcher plus a separate BeautifulSoup parser that strips hidden spans and extracts label:value pairs into JSONB.",
      result: "5 package types parsed into the warehouse daily in production; new fields need no schema change.",
      role: "Sole engineer",
    },
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
    summary: {
      problem: "Reports ran as separate GitHub Actions workflows across repositories; nobody could tell if one ran, stalled, or where its PDF was.",
      built: "Next.js ledger with a zod-validated ingest API, idempotent run claims on a partial unique index, a pure-function sweep, and signed downloads.",
      result: "193 unit and 6 end-to-end tests passing at handoff; pilot in test, no production report has run yet.",
      role: "Sole engineer, handed off August 2026",
    },
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
    summary: {
      problem: "Operators opened hundreds of carrier RFDS PDFs monthly and copy-pasted ~30 fields each into a spreadsheet.",
      built: "Gmail-to-Excel extractor with signature-based template detection, deterministic pdfplumber parsers, a gated Claude fallback, shipped as one Windows .exe.",
      result: "1,518 RFDS attachments parsed in ~21 minutes in a documented run; packaged tool with a 9-module test suite.",
      role: "Sole engineer",
    },
    tags: ["python", "email-parsing", "pdf", "claude-api", "automation"],
  },
  {
    slug: "pdf-attachment-extractor",
    name: "PDF Attachment Extractor",
    tagline: "Org-wide parallel PDF requirement downloader over the vendor's project-management API",
    stack: ["Python", "requests", "ThreadPoolExecutor", "openpyxl"],
    prod: "production",
    code: "private",
    summary: {
      problem: "Thousands of requirement PDFs sat behind a deep vendor API hierarchy; pulling them by hand meant clicking project by project.",
      built: "Two IO-bound thread pools (32 scan, 16 download) streaming presigned S3 files, with resumable per-project checkpointing.",
      result: "2,866 PDFs (3.4 GB) from an 83-project org in a 61-minute run; outage-hit projects resumed, not re-fetched.",
      role: "Sole engineer",
    },
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
    summary: {
      problem: "A nightly full re-pull of ~11.8M rows (~13 GB JSON) hit the 60-minute runner limit and crashed the pooler.",
      built: "Watermark-gated incremental extraction with a hot Postgres window and cold hive-partitioned Parquet deduped on read by DuckDB.",
      result: "168 passing unit tests; prototype in a two-org (~62 project) pilot, not yet replacing the nightly pipeline.",
      role: "Sole engineer",
    },
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
    summary: {
      problem: "Keeping up with Claude news, community signal and my own usage meant checking a dozen places by hand every morning.",
      built: "Fail-soft fetchers over 15+ sources feeding one Claude composition call whose system prompt is the digest spec, sent via Gmail.",
      result: "One daily briefing of up to 7 sections at 1 PM Philippine time; personal tool, not a production system.",
      role: "Sole engineer (personal tool)",
    },
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
    summary: {
      problem: "Internal tooling was split across separate surfaces for ETL health, data explorer, reports and the chat analyst, with no front door.",
      built: "Next.js dashboard shell against typed mock data as the future query contract, with CSS-variable theming and Framer Motion reveals.",
      result: "1 route built on mock data; prototype UI foundation with no auth routes, RLS policies or live queries yet.",
      role: "Sole engineer",
    },
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
    summary: {
      problem: "Monorepo activity (CI runs, file edits, commits) lived in places nobody watched; status dots showed no momentum.",
      built: "Collector with GitHub Actions and file-watch adapters, an event-to-town-action translator layer, and a Phaser 3 client over WebSockets.",
      result: "15 buildings and 10 event kinds working locally; prototype single-developer tool with placeholder CC0 art.",
      role: "Sole engineer (personal tool)",
    },
    tags: ["typescript", "visualization", "websockets", "nodejs", "automation"],
  },
];

export const PRODUCTION_COUNT = projects.filter(isLive).length;

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

/** Previous and next case study in catalog order, wrapping at the ends. */
export function getNeighbours(slug: string): { prev: ProjectMeta; next: ProjectMeta } | null {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
