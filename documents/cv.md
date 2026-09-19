# Jamil Mendez

**Data & AI Automation Engineer** · Philippines (UTC+8) · remote

jamilmendez1016@gmail.com · github.com/Jamil1016 · jamil-mendez.vercel.app

## Profile

Data & AI Automation Engineer with an Industrial Engineering foundation and 5+ years automating manual work: replacing error-prone manual processes with systems that run on their own. Over four roles I have moved from front-line operations to QA automation, to demand-planning analytics, to building a full data platform, internal tools, and LLM agents. I am most useful where data is scattered across APIs, spreadsheets, drives, and email, and someone needs it pulled together, trustworthy, and queryable. I care about impact that holds up after I walk away: pipelines that recover from failure, reports that build themselves, and agents that ask before they act. I build with Claude Code as a pair programmer: I own the design, review every change, and the tests and evals I write decide what ships.

Open to part-time and project work, about 20 hours a week, remote (UTC+8, evenings and weekends).

## Skills

**Data & Languages:** Python (pandas, automation), SQL, PostgreSQL, DuckDB, Parquet

**AI:** Claude API, Model Context Protocol (MCP), natural-language-to-SQL, LLM agents, prompt engineering, LLM safety (human-in-the-loop, schema allowlists)

**BI & Reporting:** Power BI, Power Query, Excel VBA and Macros, automated PDF reporting, dashboarding

**Platform & Tooling:** Supabase, GitHub Actions, Next.js, FastAPI, Playwright, Google and Gmail APIs

**Practices:** ETL, data warehousing and data modeling, workflow orchestration, incremental sync, API integration, data quality and deduplication, materialized views, Lean Six Sigma, Kaizen

## Experience

### Data Analyst (Data & AI Automation) · Nanoninth (Ontel)
*2025 – present*

Hired as a Data Analyst; the work is data and AI automation engineering, and I build and run the data platform solo.

- Replaced a manual pull-and-clean routine spanning third-party APIs, Google and Microsoft Drive, Sheets, and email with about 14 scheduled pipelines feeding a Supabase (Postgres) warehouse of 12.2M+ rows across 111 tables, with incremental sync and deduplication.
- Prototyped DARA, a chat-first natural-language reporting tool on the Claude API: it answers business questions in plain English, generating SQL against Postgres row-level security and a defined-metric library so numbers stay consistent. Working prototype, not yet deployed.
- Built a workforce report-compliance platform (Next.js, Supabase): allowlisted sign-in with five role tiers, daily-report approvals written back to a vendor API as each approver, durable bulk approve, once-only reminder emails, scheduled PDF packs and extracts.
- Built the second generation of the extractors on Google Cloud: an event listener on Cloud Run, debounced incremental walks, guarded idempotent upserts, an hourly sharded reconcile job, and keyless deploys from GitHub Actions. One job is in production; the listener runs in shadow pending a parity streak.
- Built Pipeline Guardian, an email-conversational remediation agent that classifies pipeline failures against a knowledge base, auto-fixes the safe cases inside a schema allowlist, and emails me for approval on the rest.
- Shipped a Quote Automation System for the accounting team: a review queue, batch PDF generation to Drive, and Gmail-draft sending with live presence. It took quoting from 20-30 quotes a day to over 100.
- Automated the recurring PDF reports and built the warehouse dashboards so they refresh without manual assembly.

### Demand Planning Analyst II · Emerson (Copeland)
*2023 – 2025*

Demand planning for the HVACR business.

- Migrated a manual Excel forecast-tracking system into a real-time Power BI dashboard, giving stakeholders live insight instead of waiting on analyst-built reports.
- Wrote a Python pipeline to clean, merge, and consolidate raw demand data, removing the manual prep step entirely and freeing analyst hours every cycle.

### Quality Assurance Engineer · Citizen Finedevice
*2020 – 2023*

QA and compliance in precision manufacturing.

- Automated the data collection and cleaning behind quality reports using Excel Macros, VBA, and Power Query, reducing reporting time by 87.5% and freeing the team to focus on insight rather than data wrangling.
- Fed Lean Six Sigma Kaizen initiatives that reduced defects by 4.9%.
- Earned the company's Top Management's Choice Award (2022) for the cumulative result: higher production rate, less time lost to reporting, and fewer rejects.

### Service Crew · McDonald's Tanauan
*2016 – 2020*

- Worked the front line throughout my Industrial Engineering degree. It taught pace, reliability, and discipline under pressure before the rest of the resume existed.

## Selected Projects

A fuller set, with architecture and code, lives at jamil-mendez.vercel.app.

- **Async ETL Platform.** About 14 scheduled pipelines across 25 GitHub Actions workflows loading a Postgres warehouse of 12.2M+ rows across 111 tables, with incremental sync, deduplication, and materialized views.
- **DARA (Data Analyst Reporting Agent), prototype.** Chat-first NL-to-SQL analytics with Postgres row-level security and a defined-metric library, built on the Claude API.
- **Pipeline Guardian.** Email-conversational ETL remediation agent: an 18-pattern knowledge base, a three-tier severity router, a SQL schema allowlist for safety, and human approval by email.
- **Quote Automation System.** Internal quoting tool with a review queue, batch PDF-to-Drive generation, Gmail-draft emailing, and real-time presence; lifted output from 20-30 quotes a day to over 100.
- **GC Asset Lake.** Lakehouse-lite ETL with incremental API sync and hybrid hot (Postgres) and cold (Parquet plus DuckDB) storage.
- **RFDS Extractor.** Windows tool that scrapes telecom PDFs from Gmail and parses them deterministically, with an optional Claude fallback, packaged as a single executable.

## Education

**BS Industrial Engineering**, Batangas State University, 2020

## Awards & Certifications

- Top Management's Choice Award, Citizen Finedevice (2022)
- In progress: Google Cloud Associate Cloud Engineer, then dbt, then Google Cloud Professional Data Engineer
