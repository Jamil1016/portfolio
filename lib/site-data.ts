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
    when: "2023–now",
    current: true,
    role: "Data + AI Engineer · telecom operations",
    what: "Own the nightly data platform end to end: ~14 ETL pipelines into a six-schema, 111-table Postgres warehouse (~12.2M rows), the agent layer that monitors them, and the reporting it feeds.",
  },
  {
    when: "2021–2023",
    role: "Data Engineer · reporting & automation",
    what: "Replaced manual finance and operations reporting with automated pipelines; first production LLM integrations.",
  },
  {
    when: "2019–2021",
    role: "Software Engineer · backend",
    what: "APIs and integration work in Python; the plumbing years that made the platform years possible.",
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
