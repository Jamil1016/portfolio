# portfolio

Personal portfolio site for Jamil Mendez, Data & AI Automation Engineer.

Live: https://jamil-mendez.vercel.app

It has a home page (hero, stats, selected work, stack, experience, contact), an about page, a filterable
projects index, and one case study per project with an architecture diagram, key decisions, code samples
and honest status (production, pilot, prototype or personal tool). A private, magic-link-protected
`/dashboard` holds a personal learning tracker.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3 plus a hand-written editorial theme in `app/home.css` (cream, dark and colourful themes)
- Case studies in MDX, rendered with `next-mdx-remote`; diagrams with Mermaid (client-side, with a
  `<noscript>` text outline for crawlers)
- Supabase (SSR auth + Postgres) for the private dashboard only
- OG images and the icon are generated in code with `next/og`
- Vitest + Testing Library; ESLint; deployed on Vercel

## Run it

```bash
npm ci
cp .env.example .env.local   # fill in the values, see below
npm run dev -- -p 3001       # http://localhost:3001
```

The public pages render without Supabase credentials. `/login` and `/dashboard` need them.

### Environment variables

| Variable | Needed for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical origin. Defaults to `https://jamil-mendez.vercel.app`. Set it when a custom domain is wired. |
| `NEXT_PUBLIC_SUPABASE_URL` | dashboard, login | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | dashboard, login | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Secret. Never commit it. |
| `ALLOWED_EMAIL` | dashboard, login | The one email allowed to sign in. Checked in middleware, in the page and in the server action. |

## Checks

```bash
npm run lint
npm run typecheck     # tsc --noEmit
npm test              # vitest run
npm run build
```

CI (`.github/workflows/ci.yml`) runs the same four on every push and pull request.

## Structure

```
app/                     routes: /, /about, /projects, /projects/[slug], /login, /dashboard, /api/auth/*
  opengraph-image.tsx    site OG image; projects/[slug]/opengraph-image.tsx per case study
  icon.tsx               generated "JM" icon
  sitemap.ts, robots.ts  both read SITE_URL
components/home/         home-page sections, header, footer, theme toggle
components/case-study/   case-study layout, Mermaid diagram, tag pills
components/projects/     tag filter for the projects index
components/tracker/      private dashboard UI
content/projects/*.mdx   case-study bodies, one file per slug
lib/projects.ts          project catalogue (order = home-page order), status and repo rules
lib/site-data.ts         site copy, SITE_URL, contact links, stats, experience
lib/og.tsx               shared OG card
documents/*.md           resume, CV and a private cover-letter template (sources)
scripts/build-docs.mjs   renders documents/*.md to PDF with headless Edge/Chrome
public/                  resume.pdf, cv.pdf, projects/<slug>/ screenshot folders
supabase/migrations/     schema for the learning tracker
tests/                   vitest suites
```

## Add a case study

1. Add an entry to `projects` in `lib/projects.ts`. Position in the array is position on the home page
   (the first three are cards, the rest are rows).
   - `prod`: `production`, `pilot`, `prototype` or `personal`. Use `statusLabel` when the truth needs more words.
   - `code: "public"` needs a `publicRepoUrl` under `github.com/Jamil1016` (optionally a `repoLabel`).
   - `code: "private"` shows no repo button, only the private-code note.
   - Tags must exist in `lib/tags.ts`.
2. Write `content/projects/<slug>.mdx` with the usual sections: The Problem, Architecture (with a
   `<MermaidDiagram>`), Key Decisions, Code Samples, Metrics, What I Learned, Links.
3. Optional: put screenshots in `public/projects/<slug>/` and list them in `screenshots`.
4. Run `npm test`. The suite checks that every project has an MDX file, valid tags and a legal repo link,
   and that the "systems in production" stat equals the count in `lib/projects.ts`.

### Confidentiality rules for case studies

Employer systems are described generically. No client or carrier names, no vendor product names, no
internal table names, domains, project ids, people's names, revenue figures or HR policy numbers. Code
samples are short and genericized, with no secrets. Every number must be checkable in the source repository.

## Documents

`documents/resume.md` and `documents/cv.md` are the sources for `public/resume.pdf` and `public/cv.pdf`.
After editing them, run:

```bash
npm run build:docs
```

This needs Microsoft Edge or Chrome installed (it prints to PDF headlessly). The public documents carry
email only, no phone number or home address. The cover letter is a private template: it renders to
`documents/cover-letter.pdf`, which is git-ignored and never published.

## Deployment

Vercel, from `main`. See `docs/DEPLOYMENT.md`.
