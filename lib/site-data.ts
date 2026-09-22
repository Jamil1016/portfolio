// Real, hand-maintained facts that drive the home page.
// Source of truth for metrics/stack/experience lives here; projects + tags
// come from lib/projects.ts and lib/tags.ts.
import { PRODUCTION_COUNT } from "@/lib/projects";

// Canonical origin for metadata, sitemap, robots and OG images. Override with
// NEXT_PUBLIC_SITE_URL when a custom domain is wired up.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://jamil-mendez.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Jamil Mendez";
export const SITE_TITLE = "Data & AI Automation Engineer";
export const SITE_TAGLINE =
  "I turn manual data work into pipelines, reports and agents that run unattended.";

export const GITHUB_URL = "https://github.com/Jamil1016";
export const CONTACT_EMAIL = "jamilmendez1016@gmail.com";
// TODO(Jamil): paste your LinkedIn profile URL here. While this is empty the
// LinkedIn link is hidden everywhere on the site.
export const LINKEDIN_URL = "";
export const RESUME_URL = "/resume.pdf";

export const AVAILABILITY =
  "Open to full-time, contract and part-time project work, remote (UTC+8)";
export const EXPERIENCE_LINE = "5+ years automating manual work";

export type Stat = {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
};

// Headline proof points. "systems in production" is derived from
// lib/projects.ts so the number can never drift from the case studies.
export const STATS: Stat[] = [
  { value: 12.2, decimals: 1, suffix: "M+", label: "rows across 111 tables" },
  { value: 14, decimals: 0, suffix: "", label: "scheduled pipelines, approx." },
  { value: PRODUCTION_COUNT, decimals: 0, suffix: "", label: "systems in production" },
  { value: 5, decimals: 0, suffix: "+", label: "years automating manual work" },
];

// Each skill is backed by evidence, not a self-rated percentage: a concrete
// proof phrase plus the real project (in lib/projects.ts) that demonstrates it.
export type Skill = {
  name: string;
  proof: string;
  projectSlug: string;
  projectName: string;
};
export type SkillColumn = { title: string; skills: Skill[] };

export const STACK: SkillColumn[] = [
  {
    title: "Data & Pipelines",
    skills: [
      { name: "Python", proof: "12.2M+ rows, about 14 scheduled pipelines", projectSlug: "local-pipeline", projectName: "Async ETL Platform" },
      { name: "PostgreSQL", proof: "111 tables, materialized views", projectSlug: "local-pipeline", projectName: "Async ETL Platform" },
      { name: "Async ETL (asyncpg)", proof: "binary COPY on a background event loop", projectSlug: "local-pipeline", projectName: "Async ETL Platform" },
      { name: "GitHub Actions", proof: "25 workflows, dispatch chains and watchers", projectSlug: "local-pipeline", projectName: "Async ETL Platform" },
      { name: "Supabase", proof: "warehouse, auth and RLS behind the internal apps", projectSlug: "workforce-compliance-platform", projectName: "Workforce Platform" },
      { name: "Data quality & dedup", proof: "cross-source date reconciliation with confidence scores", projectSlug: "date-validator", projectName: "Cross-Source Date Validator" },
    ],
  },
  {
    title: "AI & Orchestration",
    skills: [
      { name: "Claude API", proof: "approval-gated agent in production", projectSlug: "pipeline-guardian", projectName: "Pipeline Guardian" },
      { name: "Prompt engineering", proof: "digest spec lives in one system prompt", projectSlug: "daily-claude-digest", projectName: "Daily Claude Digest" },
      { name: "Agent design & tool use", proof: "human-in-the-loop tool approvals", projectSlug: "pipeline-guardian", projectName: "Pipeline Guardian" },
      { name: "NL → SQL", proof: "prototype: metric templates before free SQL", projectSlug: "data-analyst-reporting-agent", projectName: "DARA" },
      { name: "Safety rails", proof: "SQL guardrail, locked-down RPC, Postgres RLS", projectSlug: "data-analyst-reporting-agent", projectName: "DARA" },
      { name: "Next.js + TypeScript", proof: "2 internal apps in production", projectSlug: "workforce-compliance-platform", projectName: "Workforce Platform" },
    ],
  },
];

export type ExperienceEntry = {
  when: string;
  current?: boolean;
  role: string;
  what: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    when: "2025–now",
    current: true,
    role: "Data Analyst (Data & AI Automation) · Nanoninth (Ontel)",
    what: "Hired as a Data Analyst; the work is data and AI automation engineering, and I build the platform solo. Replaced the team's manual pull-and-clean routine across API, Google/Microsoft Drive, Sheets and email with about 14 scheduled pipelines into a Supabase warehouse (12.2M+ rows across 111 tables), then automated the PDF reports and built dashboards on top. I also ship tools for other departments: a quoting app that took accounting from 20-30 quotes a day to over 100, and a workforce report-compliance platform used for daily-report approvals. On the AI side, an approval-gated agent that diagnoses failed pipeline runs is in production, and DARA (natural-language reporting) is a working prototype.",
  },
  {
    when: "2023–2025",
    role: "Demand Planning Analyst II · Emerson (Copeland)",
    what: "Demand planning for the HVACR business. Migrated a manual Excel forecast-tracking system into a real-time Power BI dashboard and wrote a Python script to clean, merge and consolidate the raw demand data, cutting analyst hours, improving accuracy, and giving stakeholders up-to-date insight instantly instead of waiting on hand-built reports.",
  },
  {
    when: "2020–2023",
    role: "Quality Assurance Engineer · Citizen Finedevice",
    what: "QA and compliance in precision manufacturing, where preparing quality reports meant manually collecting and cleaning data from multiple sources before any analysis could begin. Automated that collection and cleaning with Excel Macros, VBA and Power Query (87.5% less reporting time), which freed the team for actual insight and fed Lean Six Sigma Kaizen work that cut defects by 4.9%. Earned the company's Top Management's Choice Award (2022) for the cumulative result: higher production rate, less time lost to reporting, and fewer rejects.",
  },
  {
    when: "2016–2020",
    role: "Service Crew · McDonald's Tanauan",
    what: "Worked the front line through my Industrial Engineering degree. Those were the years that taught pace, reliability, and showing up before the rest of the résumé existed.",
  },
];

// Curated "learned → shipped" mapping. These map skills to real shipped projects.
export type StudyToProd = { learned: string; title: string; detail: string };

export const STUDY_TO_PROD: StudyToProd[] = [
  {
    learned: "Evals & safety rails",
    title: "DARA's guardrails",
    detail: "Schema-aware NL→SQL prototype that fails safe.",
  },
  {
    learned: "Async Python patterns",
    title: "Async ETL platform",
    detail: "About 14 scheduled pipelines feeding 12.2M+ rows across 111 tables.",
  },
  {
    learned: "Agent design & tool use",
    title: "Pipeline Guardian",
    detail: "An agent that repairs failed nightly runs.",
  },
];
