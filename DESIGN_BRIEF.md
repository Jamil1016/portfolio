# Portfolio Redesign — Design Brief

> **Purpose of this document.** I'm about to redesign my personal portfolio web app and I want you (the design assistant) to have full context before proposing directions. This explains who I am, the kind of work I build, every feature/section the site already has, the tech it runs on, and what the redesign needs to achieve. **I'm open to a fresh visual direction** — the current look is just a baseline, not a constraint.

---

## 1. Who I am

**Jamil Mendez — Data + AI Engineer.** I build and operate production data platforms and AI agents at telecom-operations scale. Day to day I run nightly ETL over millions of rows, build LLM-powered agents (NL→SQL, auto-remediation), and automate reporting/data-quality pipelines. I work primarily in Python + Postgres + the Claude API, with Next.js for the front ends.

Headline proof points I want a visitor to absorb fast:
- **6.2M+ rows / night** processed across **25 production tables**
- **99%+ pipeline uptime**
- **6 systems shipped**
- A PDF extraction rewrite that hit a **76× speedup**

## 2. What this site is — and its target output

A **personal portfolio web app**. The **target final output is a portfolio site** that showcases my engineering work and converts a visitor into an opportunity.

**Primary audience: hiring managers and technical recruiters** evaluating me for **AI / Data Engineer roles.** Optimize the design for them:
- Signal **seniority and real production impact** immediately (metrics, scale, "systems that operate themselves").
- Be **skimmable** — a busy reviewer should grasp "what he builds + how good he is" in ~15 seconds, then be able to drill into a case study for depth.
- Make it **easy to verify and contact** — clear links to GitHub, case studies, resume, and a get-in-touch path.
- Feel **distinctive and engineered**, not a generic template or "AI-slop" aesthetic — but credibility/clarity beats novelty for this audience.

## 3. The kind of projects I make

Production data + AI systems (not toy demos). The portfolio currently features **7 projects**:

| Project | What it is | Stack | Status |
|---|---|---|---|
| **Async ETL Platform** (flagship) | 6.2M rows/night across 25 tables on Postgres | Python, asyncpg, Postgres, GitHub Actions | OSS coming (W12) |
| **Pipeline Guardian** | Auto-remediation agent for ETL failures | Python, Claude API, Supabase | Live |
| **DARA — Data Analyst Reporting Agent** | Schema-aware natural-language → SQL with safety rails | FastAPI, Next.js, Claude API, Postgres | OSS coming (W10) |
| **Gmail Document Parser** | HTML email → JSONB with dynamic field discovery | Python, Gmail API, Postgres | Live |
| **Cross-Source Date Validator** | Daily reconciliation of task dates vs. email dates | Python, GitHub Actions, Google Sheets API | OSS coming (W11) |
| **Report Automation** | Automated daily finance report pipeline | Python, Supabase, Chart.js, GitHub Actions | Live |
| **PDF Attachment Extractor** | Parallel PDF extraction from email attachments (76× speedup) | Python, pdfplumber, ProcessPoolExecutor, Postgres | OSS coming (W7) |

Themes the design should reinforce: **automation, autonomy ("systems that operate themselves"), data at scale, AI agents, and a security/AI-safety angle** (several projects are explicitly framed around safety rails, evals, and OWASP-style hardening).

## 4. Current features / site structure

The design must accommodate all of these. (Information architecture can change — but this is the content that exists.)

**Home (`/`)** — single-page scroll, composed of:
- **Navbar** — floating, centered pill with backdrop blur; monogram "JM", anchor links (Work, Stack, About), a "Get in Touch" button.
- **Hero** — huge serif headline ("Operating *Intelligence.*"), an "Available for hire" status pill, a subhead, two CTAs (View Case Studies / GitHub), and a **4-stat row** (the metrics above).
- **Selected Works** — a bento-style grid: one large featured project card + two secondary cards, each with icon, name, tagline, stack chips, and OSS status; link to all projects.
- **Technical Stack** — two columns ("Data & Pipelines", "AI & Orchestration") of skills with **proficiency bars**.
- **Experience Log** — a vertical timeline of roles (date range + role + description, "current" marker).

**Projects index (`/projects`)** — filterable grid of all 7 projects with a **tag filter**.

**Case study (`/projects/[slug]`)** — long-form **MDX** write-ups that include **Mermaid architecture diagrams** and **tag pills**. These are the depth layer for technical reviewers. (7 case studies exist.)

**About (`/about`)**, **Resume (`/resume`)** — standard supporting pages.

**Private dashboard (`/dashboard`)** — a magic-link-gated **"Learning tracker"** (my study roadmap). A public **"NOW LEARNING"** tile on the home page surfaces the single course I'm currently on. (Auth via Supabase magic link; not public-facing beyond that one tile.)

### Tag taxonomy (used on projects + case studies)
22 tags across 4 axes — the filter/case-study system should stay legible with this many:
- **Tech (7):** python, typescript, postgresql, supabase, fastapi, nextjs, claude-api
- **Patterns (6):** async, etl, incremental-sync, materialized-views, rls, dedup
- **AI agents (6):** rag, nl-sql, agent, tool-use, evals, prompt-engineering
- **Domain (3):** email-parsing, data-quality, automation
- **Security (2):** security, ai-safety

## 5. Tech stack & constraints (important for design feasibility)

This is a **real, live codebase** — design output should translate into it, not fight it:
- **Next.js 14 (App Router)**, React 18, TypeScript
- **Tailwind CSS** + **shadcn/ui** + `class-variance-authority` (component-driven; design as composable components/tokens)
- **Supabase** (Postgres + magic-link auth) for the learning tracker
- **MDX** (`next-mdx-remote`) for case studies; **Mermaid** for architecture diagrams — diagrams must stay readable in whatever palette you choose
- **lucide-react** icons, **Vercel Analytics**, deployed on **Vercel** (target domain `jamilmendez.dev`)

Design implications:
- Deliver a **design system / tokens** (type scale, color, spacing, components) that maps cleanly to Tailwind.
- Must be **responsive** (mobile → desktop) and **performance- and accessibility-conscious** (contrast, focus states, reduced-motion).
- Reusable component shapes needed: stat blocks, project cards (featured + compact), tag chips, skill/proficiency display, timeline entries, MDX prose + diagram styling, a nav, and CTAs.

## 6. Current design system (baseline only — open to replacing)

So you know where I'm starting from:
- **Type:** Instrument Serif (display headlines, with *italic* word-accents), Inter (sans body), JetBrains Mono (uppercase eyebrow labels with wide letter-spacing).
- **Color:** dark theme — slate-950 background, slate-100/400 text; indigo radial-gradient glows; a **cream** accent for primary buttons; emerald dots for "available/live" status.
- **Motifs:** oversized serif headlines with one italicized word; mono uppercase section eyebrows; rounded **pill** nav with blur; bordered "glass" cards on dark; gradient skill bars; minimal line icons.

> **Honest read for the redesign:** this current style is editorial/literary (serif + cream + italics). It's distinctive, but for **engineering hiring managers** it may under-signal technical depth and over-signal "design portfolio." Feel free to propose a direction that reads as **sharp, technical, and senior** while staying distinctive — or make the case for keeping/elevating the editorial feel if you think it wins. I'm genuinely open.

## 7. What to keep vs. what's open

**Keep (the substance):**
- The proof points and metrics, the 7 projects and their framing, the tag taxonomy, the MDX case-study + Mermaid-diagram depth layer, and the "NOW LEARNING" touch.
- Roughly the same information the site conveys (who I am → proof → work → depth → contact).

**Open to change (everything visual + structural):**
- Visual identity: color, typography, layout, motion, iconography.
- Section order and page structure / IA.
- How projects, skills, and experience are presented.

## 8. What I'd love from a design session

1. **2–3 distinct visual directions** tailored to "AI/Data Engineer applying to senior roles," each with a one-line rationale, a palette (concrete hex), type choices, and a hero mockup — so I can pick one before you build it out.
2. A **hero** that lands the seniority + scale story in seconds.
3. A **Selected Works / case-study system** that makes deep technical write-ups (with architecture diagrams) feel inviting, not heavy.
4. A coherent **design-token set** I can implement in Tailwind.

---

*Maintained by Jamil. If anything here is stale, the source of truth is the live app and the project list in `lib/projects.ts` / tag taxonomy in `lib/tags.ts`.*
