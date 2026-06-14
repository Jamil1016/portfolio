export type ProjectMeta = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  publicRepoUrl: string;
  /** Is the system actually running and doing real work? */
  prod: "production" | "prototype";
  /** Can an outsider read the repo? */
  code: "public" | "private" | "coming";
  /** Only meaningful when code === "coming". */
  etaWeek?: string;
  tags: string[];
};

export const projects: ProjectMeta[] = [
  {
    slug: "local-pipeline",
    name: "Async ETL Platform",
    tagline: "Async multi-pipeline ETL into Postgres across 12 GitHub Actions workflows",
    stack: ["Python", "asyncpg", "Postgres", "Supabase", "GitHub Actions", "Apps Script"],
    publicRepoUrl: "https://github.com/Jamil1016/local-pipeline",
    prod: "production",
    code: "coming",
    etaWeek: "W12",
    tags: ["python", "async", "etl", "postgresql", "materialized-views", "incremental-sync", "automation", "supabase", "dedup", "data-quality"],
  },
  {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Email-conversational ETL remediation agent with human-in-the-loop approvals",
    stack: ["Python", "Claude API", "Supabase", "asyncpg", "GitHub Actions", "Gmail API"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    prod: "production",
    code: "public",
    tags: ["python", "claude-api", "agent", "tool-use", "automation", "supabase", "postgresql", "security", "ai-safety", "email-parsing"],
  },
  {
    slug: "data-analyst-reporting-agent",
    name: "DARA — Data Analyst Reporting Agent",
    tagline: "Chat-first NL→SQL analytics with Postgres RLS and a defined-metric library",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/data-analyst-reporting-agent",
    prod: "production",
    code: "coming",
    etaWeek: "W10",
    tags: ["typescript", "nextjs", "supabase", "claude-api", "nl-sql", "agent", "tool-use", "postgresql", "rls", "ai-safety"],
  },
  {
    slug: "gmail-scraper",
    name: "Gmail Document Parser",
    tagline: "HTML email → JSONB with dynamic field discovery",
    stack: ["Python", "Gmail API", "Postgres", "BeautifulSoup", "Supabase"],
    publicRepoUrl: "https://github.com/Jamil1016/gmail-scraper",
    prod: "production",
    code: "public",
    tags: ["python", "email-parsing", "postgresql", "automation", "dedup", "supabase"],
  },
  {
    slug: "date-validator",
    name: "Cross-Source Date Validator",
    tagline: "Daily per-carrier reconciliation of COP & 48Hr task dates vs. email dates",
    stack: ["Python", "Postgres", "asyncpg", "GitHub Actions", "Apps Script", "Gmail API"],
    publicRepoUrl: "https://github.com/Jamil1016/date-validator",
    prod: "production",
    code: "coming",
    etaWeek: "W11",
    tags: ["python", "data-quality", "automation", "postgresql", "security", "dedup", "incremental-sync", "async"],
  },
  {
    slug: "report-automation",
    name: "Report Automation",
    tagline: "Scheduled multi-report suite — finance, compliance & open-items via Gmail + Drive",
    stack: ["Python", "Supabase", "Playwright", "Gmail API", "Google Drive", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/report-automation",
    prod: "production",
    code: "public",
    tags: ["python", "automation", "etl", "postgresql", "supabase", "pdf", "dashboards", "visualization"],
  },
  {
    slug: "swift-pdf-extractor",
    name: "PDF Attachment Extractor",
    tagline: "Org-wide parallel PDF requirement downloader over the Swift Projects API",
    stack: ["Python", "requests", "ThreadPoolExecutor", "openpyxl"],
    publicRepoUrl: "https://github.com/Jamil1016/swift-pdf-extractor",
    prod: "production",
    code: "private",
    tags: ["python", "pdf", "automation", "etl", "incremental-sync"],
  },
  {
    slug: "agent-town",
    name: "Agent Town",
    tagline: "Live pixel-art town that visualizes a monorepo's activity in real time",
    stack: ["TypeScript", "Phaser 3", "Node", "WebSockets", "Vite"],
    publicRepoUrl: "https://github.com/jamilmendez-ontel/agent-town",
    prod: "prototype",
    code: "public",
    tags: ["typescript", "visualization", "websockets", "nodejs", "automation"],
  },
  {
    slug: "daily-claude-digest",
    name: "Daily Claude Digest",
    tagline: "Scheduled AI digest pipeline — Claude + Gmail OAuth compile a daily briefing",
    stack: ["Python", "Claude API", "Gmail API", "Google Calendar API"],
    publicRepoUrl: "https://github.com/Jamil1016/daily-claude-digest",
    prod: "production",
    code: "coming",
    etaWeek: "soon",
    tags: ["python", "claude-api", "automation", "prompt-engineering"],
  },
  {
    slug: "gc-asset-lake",
    name: "GC Asset Lake",
    tagline: "Lakehouse-lite ETL: incremental API sync with hybrid hot/cold storage (2.6M+ rows)",
    stack: ["Python", "DuckDB", "Parquet", "Supabase", "asyncpg"],
    publicRepoUrl: "https://github.com/Jamil1016/gc-asset-lake",
    prod: "production",
    code: "private",
    tags: ["python", "etl", "postgresql", "incremental-sync", "automation", "async"],
  },
  {
    slug: "quote-automation",
    name: "Quote Automation",
    tagline: "Full-stack quote generation with real-time collaboration and PDF export",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Playwright"],
    publicRepoUrl: "https://github.com/Jamil1016/quote-automation",
    prod: "prototype",
    code: "coming",
    etaWeek: "soon",
    tags: ["nextjs", "react", "typescript", "supabase", "automation", "pdf"],
  },
  {
    slug: "rfds-extractor",
    name: "RFDS Extractor",
    tagline: "Gmail PDF scraper with a deterministic parser + optional Claude fallback",
    stack: ["Python", "pdfplumber", "Gmail API", "PyInstaller"],
    publicRepoUrl: "https://github.com/Jamil1016/rfds-extractor",
    prod: "production",
    code: "private",
    tags: ["python", "email-parsing", "pdf", "claude-api", "automation"],
  },
  {
    slug: "portal",
    name: "Ops Portal",
    tagline: "Multi-tenant internal ops portal — Supabase RLS, OAuth, and live dashboards",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Framer Motion"],
    publicRepoUrl: "https://github.com/Jamil1016/portal",
    prod: "prototype",
    code: "coming",
    etaWeek: "soon",
    tags: ["nextjs", "react", "typescript", "supabase", "security", "dashboards"],
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
