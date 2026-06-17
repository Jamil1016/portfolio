# Jamil Mendez

**Data & AI Automation Engineer** · Santo Tomas City, Batangas, Philippines

jamilmendez1016@gmail.com · 0993 369 3701 · github.com/Jamil1016 · jamil-mendez.vercel.app

## Profile

Data & AI Automation Engineer with an Industrial Engineering foundation and a track record of replacing manual, error-prone processes with systems that run on their own. Over four roles I have moved from front-line operations to QA automation, to demand-planning analytics, to building a full data platform and production AI agents. I am most useful where data is scattered across APIs, spreadsheets, drives, and email, and someone needs it pulled together, trustworthy, and queryable. I care about impact that holds up after I walk away: pipelines that recover from failure, reports that build themselves, and agents that ask before they act.

## Skills

**Data & Languages:** Python (pandas, automation), SQL, PostgreSQL, DuckDB, Parquet

**AI:** Claude API, Model Context Protocol (MCP), natural-language-to-SQL, LLM agents, prompt engineering, LLM safety (human-in-the-loop, schema allowlists)

**BI & Reporting:** Power BI, Power Query, Excel VBA and Macros, automated PDF reporting, dashboarding

**Platform & Tooling:** Supabase, GitHub Actions, Next.js, FastAPI, Playwright, Google and Gmail APIs

**Practices:** ETL and incremental sync, data quality and deduplication, materialized views, Lean Six Sigma, Kaizen

## Experience

### Data & AI Automation Engineer · Nanoninth (Ontel)
*2025 – present*

Hired as a Data Analyst; in practice I build and run the data platform solo.

- Replaced a manual pull-and-clean routine spanning third-party APIs, Google and Microsoft Drive, Sheets, and email with roughly 14 automated ETL pipelines feeding a 111-table Supabase (Postgres) warehouse of about 12.2 million rows, with incremental sync and deduplication.
- Built DARA, a chat-first natural-language reporting tool on Claude and MCP: it answers business questions in plain English, generating SQL against Postgres row-level security and a defined-metric library so numbers stay consistent.
- Built Pipeline Guardian, an email-conversational remediation agent that classifies pipeline failures against a knowledge base, auto-fixes the safe cases inside a schema allowlist, and emails me for approval on the rest.
- Shipped a Quote Automation System for the accounting team: a review queue, batch PDF generation to Drive, and Gmail-draft sending with live presence. It took quoting from 20 to 30 hand-checked quotes a day to 100 to 200 plus.
- Automated PDF report generation and built the dashboards that sit on top of the warehouse.

### Demand Planning Analyst II · Emerson (Copeland)
*2023 – 2025*

Demand planning for the HVACR business.

- Migrated a manual Excel forecast-tracking system into a real-time Power BI dashboard, giving stakeholders live insight instead of waiting on analyst-built reports.
- Wrote a Python pipeline to clean, merge, and consolidate raw demand data, cutting analyst hours and improving forecast accuracy.

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

- **Async ETL Platform.** Roughly 14 multi-pipeline workflows on GitHub Actions loading a 111-table Postgres warehouse, with incremental sync, deduplication, and materialized views.
- **DARA (Data Analyst Reporting Agent).** Chat-first NL-to-SQL analytics with Postgres row-level security and a defined-metric library, built on Claude and MCP.
- **Pipeline Guardian.** Email-conversational ETL remediation agent: an 18-pattern knowledge base, a three-tier severity router, a SQL schema allowlist for safety, and human approval by email.
- **Quote Automation System.** Internal quoting tool with a review queue, batch PDF-to-Drive generation, Gmail-draft emailing, and real-time presence; lifted output from 20 to 30 quotes a day to 100 to 200 plus.
- **GC Asset Lake.** Lakehouse-lite ETL with incremental API sync and hybrid hot (Postgres) and cold (Parquet plus DuckDB) storage.
- **RFDS Extractor.** Windows tool that scrapes telecom PDFs from Gmail and parses them deterministically, with an optional Claude fallback, packaged as a single executable.

## Education

**BS Industrial Engineering**, Batangas State University, 2020

## Awards & Certifications

- Top Management's Choice Award, Citizen Finedevice (2022)
- In progress: Claude Certified Architect, Foundations (CCA-F)
