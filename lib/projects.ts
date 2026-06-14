export type ProjectMeta = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  publicRepoUrl: string;
  publicRepoStatus: "coming" | "live";
  publicEtaWeek?: string;
  privateRepoUrl?: string;
  tags: string[];
};

export const projects: ProjectMeta[] = [
  {
    slug: "local-pipeline",
    name: "Async ETL Platform",
    tagline: "6.2M rows / night across 25 tables on Postgres",
    stack: ["Python", "asyncpg", "Postgres", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/local-pipeline",
    publicRepoStatus: "coming",
    publicEtaWeek: "W12",
    tags: ["python", "async", "etl", "postgresql", "materialized-views", "incremental-sync", "automation"],
  },
  {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Auto-remediation agent for ETL failures",
    stack: ["Python", "Claude API", "Supabase"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    publicRepoStatus: "live",
    tags: ["python", "claude-api", "agent", "tool-use", "evals", "automation", "supabase", "security", "ai-safety"],
  },
  {
    slug: "data-analyst-reporting-agent",
    name: "DARA — Data Analyst Reporting Agent",
    tagline: "Schema-aware natural-language SQL with safety rails",
    stack: ["FastAPI", "Next.js", "Claude API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/data-analyst-reporting-agent",
    publicRepoStatus: "coming",
    publicEtaWeek: "W10",
    tags: ["python", "claude-api", "nl-sql", "agent", "prompt-engineering", "fastapi", "nextjs", "postgresql", "security", "ai-safety"],
  },
  {
    slug: "gmail-scraper",
    name: "Gmail Document Parser",
    tagline: "HTML email → JSONB with dynamic field discovery",
    stack: ["Python", "Gmail API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/gmail-scraper",
    publicRepoStatus: "live",
    tags: ["python", "email-parsing", "postgresql", "automation", "dedup"],
  },
  {
    slug: "date-validator",
    name: "Cross-Source Date Validator",
    tagline: "Daily reconciliation of task dates vs. email dates",
    stack: ["Python", "GitHub Actions", "Google Sheets API"],
    publicRepoUrl: "https://github.com/Jamil1016/date-validator",
    publicRepoStatus: "coming",
    publicEtaWeek: "W11",
    tags: ["python", "data-quality", "automation", "postgresql", "security"],
  },
  {
    slug: "report-automation",
    name: "Report Automation",
    tagline: "Automated daily finance report pipeline",
    stack: ["Python", "Supabase", "Chart.js", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/report-automation",
    publicRepoStatus: "live",
    tags: ["python", "automation", "etl", "postgresql"],
  },
  {
    slug: "swift-pdf-extractor",
    name: "PDF Attachment Extractor",
    tagline: "Parallel PDF data extraction from email attachments (76× speedup)",
    stack: ["Python", "pdfplumber", "ProcessPoolExecutor", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/swift-pdf-extractor",
    publicRepoStatus: "coming",
    publicEtaWeek: "W7",
    tags: ["python", "email-parsing", "automation", "etl", "incremental-sync"],
  },
  {
    slug: "agent-town",
    name: "Agent Town",
    tagline: "Live pixel-art town that visualizes a monorepo's activity in real time",
    stack: ["TypeScript", "Phaser 3", "Node", "WebSockets", "Vite"],
    publicRepoUrl: "https://github.com/jamilmendez-ontel/agent-town",
    publicRepoStatus: "live",
    tags: ["typescript", "visualization", "websockets", "nodejs", "automation"],
  },
  {
    slug: "daily-claude-digest",
    name: "Daily Claude Digest",
    tagline: "Scheduled AI digest pipeline — Claude + Gmail OAuth compile a daily briefing",
    stack: ["Python", "Claude API", "Gmail API", "Google Calendar API"],
    publicRepoUrl: "https://github.com/Jamil1016/daily-claude-digest",
    publicRepoStatus: "coming",
    publicEtaWeek: "soon",
    tags: ["python", "claude-api", "automation", "prompt-engineering"],
  },
  {
    slug: "gc-asset-lake",
    name: "GC Asset Lake",
    tagline: "Lakehouse-lite ETL: incremental API sync with hybrid hot/cold storage (2.6M+ rows)",
    stack: ["Python", "DuckDB", "Parquet", "Supabase", "asyncpg"],
    publicRepoUrl: "https://github.com/Jamil1016/gc-asset-lake",
    publicRepoStatus: "coming",
    publicEtaWeek: "soon",
    tags: ["python", "etl", "postgresql", "incremental-sync", "automation", "async"],
  },
  {
    slug: "quote-automation",
    name: "Quote Automation",
    tagline: "Full-stack quote generation with real-time collaboration and PDF export",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Playwright"],
    publicRepoUrl: "https://github.com/Jamil1016/quote-automation",
    publicRepoStatus: "coming",
    publicEtaWeek: "soon",
    tags: ["nextjs", "react", "typescript", "supabase", "automation", "pdf"],
  },
  {
    slug: "rfds-extractor",
    name: "RFDS Extractor",
    tagline: "Gmail PDF scraper with a deterministic parser + optional Claude fallback",
    stack: ["Python", "pdfplumber", "Gmail API", "PyInstaller"],
    publicRepoUrl: "https://github.com/Jamil1016/rfds-extractor",
    publicRepoStatus: "coming",
    publicEtaWeek: "soon",
    tags: ["python", "email-parsing", "pdf", "claude-api", "automation"],
  },
  {
    slug: "portal",
    name: "Ops Portal",
    tagline: "Multi-tenant internal ops portal — Supabase RLS, OAuth, and live dashboards",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Framer Motion"],
    publicRepoUrl: "https://github.com/Jamil1016/portal",
    publicRepoStatus: "coming",
    publicEtaWeek: "soon",
    tags: ["nextjs", "react", "typescript", "supabase", "security", "dashboards"],
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
