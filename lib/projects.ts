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
    publicRepoStatus: "coming",
    publicEtaWeek: "W8",
    tags: ["python", "claude-api", "agent", "tool-use", "evals", "automation", "supabase"],
  },
  {
    slug: "data-analyst-reporting-agent",
    name: "DARA — Data Analyst Reporting Agent",
    tagline: "Schema-aware natural-language SQL with safety rails",
    stack: ["FastAPI", "Next.js", "Claude API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/data-analyst-reporting-agent",
    publicRepoStatus: "coming",
    publicEtaWeek: "W10",
    tags: ["python", "claude-api", "nl-sql", "agent", "prompt-engineering", "fastapi", "nextjs", "postgresql"],
  },
  {
    slug: "gmail-scraper",
    name: "Gmail Document Parser",
    tagline: "HTML email → JSONB with dynamic field discovery",
    stack: ["Python", "Gmail API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/gmail-scraper",
    publicRepoStatus: "coming",
    publicEtaWeek: "W3",
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
    tags: ["python", "data-quality", "automation", "postgresql"],
  },
  {
    slug: "report-automation",
    name: "Report Automation",
    tagline: "Automated daily finance report pipeline",
    stack: ["Python", "Supabase", "Chart.js", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/report-automation",
    publicRepoStatus: "coming",
    publicEtaWeek: "W5",
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
];

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
