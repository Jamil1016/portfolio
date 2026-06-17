// Real, hand-maintained facts that drive the home page.
// Source of truth for metrics/stack/experience lives here; projects + tags
// come from lib/projects.ts and lib/tags.ts.

export const GITHUB_URL = "https://github.com/Jamil1016";
export const CONTACT_EMAIL = "jamilmendez1016@gmail.com";

export type Stat = {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
};

// Headline proof points (see DESIGN_BRIEF §1).
export const STATS: Stat[] = [
  { value: 12.2, decimals: 1, suffix: "M+", label: "rows across 111 tables" },
  { value: 14, decimals: 0, suffix: "", label: "active pipelines" },
  { value: 10, decimals: 0, suffix: "", label: "systems in production" },
  { value: 2, decimals: 0, suffix: "", label: "LLM agents in production" },
];

export type Skill = { name: string; pct: number };
export type SkillColumn = { title: string; skills: Skill[] };

export const STACK: SkillColumn[] = [
  {
    title: "Data & Pipelines",
    skills: [
      { name: "Python", pct: 95 },
      { name: "PostgreSQL", pct: 92 },
      { name: "Async ETL (asyncpg)", pct: 90 },
      { name: "GitHub Actions", pct: 88 },
      { name: "Supabase", pct: 85 },
      { name: "Data quality & dedup", pct: 84 },
    ],
  },
  {
    title: "AI & Orchestration",
    skills: [
      { name: "Claude API", pct: 95 },
      { name: "Prompt engineering", pct: 92 },
      { name: "Agent design & tool use", pct: 90 },
      { name: "NL → SQL", pct: 90 },
      { name: "Evals & safety rails", pct: 86 },
      { name: "FastAPI + Next.js", pct: 82 },
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
    role: "Data & AI Automation Engineer · Nanoninth (Ontel)",
    what: "Hired as a Data Analyst; in practice I build the platform, solo. Replaced the team's manual pull-and-clean routine across API, Google/Microsoft Drive, Sheets and email with ~14 automated ETL pipelines into a 111-table Supabase warehouse (~12.2M rows), then automated the PDF reports and built dashboards on top. Beyond the data team I ship cross-department tools too. A Quote Automation System took accounting from 20–30 hand-checked quotes a day to 100–200+, while my main build now is DARA (natural-language reporting via Claude + MCP) and AI pipeline monitoring.",
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
    title: "DARA's eval suite",
    detail: "Schema-aware NL→SQL that fails safe.",
  },
  {
    learned: "Async Python patterns",
    title: "Async ETL platform",
    detail: "~14 pipelines feeding a 111-table, ~12.2M-row Postgres warehouse.",
  },
  {
    learned: "Agent design & tool use",
    title: "Pipeline Guardian",
    detail: "An agent that repairs failed nightly runs.",
  },
];
