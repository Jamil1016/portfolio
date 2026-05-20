export type ProjectMeta = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  publicRepoUrl: string;
  publicRepoStatus: "coming" | "live";
  publicEtaWeek?: string;
  privateRepoUrl?: string;
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
  },
  {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Auto-remediation agent for ETL failures",
    stack: ["Python", "Claude API", "Supabase"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    publicRepoStatus: "coming",
    publicEtaWeek: "W8",
  },
  {
    slug: "data-analyst-reporting-agent",
    name: "DARA — Data Analyst Reporting Agent",
    tagline: "Schema-aware natural-language SQL with safety rails",
    stack: ["FastAPI", "Next.js", "Claude API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/data-analyst-reporting-agent",
    publicRepoStatus: "coming",
    publicEtaWeek: "W10",
  },
  {
    slug: "gmail-scraper",
    name: "Gmail Document Parser",
    tagline: "HTML email → JSONB with dynamic field discovery",
    stack: ["Python", "Gmail API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/gmail-scraper",
    publicRepoStatus: "coming",
    publicEtaWeek: "W3",
  },
  {
    slug: "date-validator",
    name: "Cross-Source Date Validator",
    tagline: "Daily reconciliation of task dates vs. email dates",
    stack: ["Python", "GitHub Actions", "Google Sheets API"],
    publicRepoUrl: "https://github.com/Jamil1016/date-validator",
    publicRepoStatus: "coming",
    publicEtaWeek: "W11",
  },
  {
    slug: "report-automation",
    name: "Report Automation",
    tagline: "Automated daily finance report pipeline",
    stack: ["Python", "Supabase", "Chart.js", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/report-automation",
    publicRepoStatus: "coming",
    publicEtaWeek: "W5",
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
