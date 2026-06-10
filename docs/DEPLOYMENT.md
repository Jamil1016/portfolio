# Deployment Guide — portfolio

Status as of 2026-06-09: code is feature-complete, 27 tests pass, production build is clean.
The only remaining work is **deploying to Vercel and wiring the domain**. This guide covers it.

Steps marked **[you]** require your accounts/credentials and can't be automated from here.
Steps marked **[claude]** I can do on request.

---

## Prerequisites

- GitHub repo already exists and is pushed: `https://github.com/Jamil1016/portfolio` (✅ on `main`)
- A Supabase project (Auth + Postgres) for the auth-gated learning tracker
- A personal Vercel account (sign in with the `Jamil1016` GitHub account)

---

## Environment variables

These must be added in **Vercel → Project → Settings → Environment Variables**.
Values come from your Supabase project dashboard (Settings → API).

| Variable | Where to find it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | public, safe to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → `anon` `public` key | public, safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` key | **SECRET** — never commit, server-only |
| `ALLOWED_EMAIL` | your personal email | gates magic-link login to just you |

Set all four for the **Production**, **Preview**, and **Development** environments in Vercel.

---

## Step 1 — Connect Vercel  **[you]**

1. In a browser, go to [vercel.com](https://vercel.com) and sign in with the **`Jamil1016` GitHub account**.
2. **Add New… → Project → Import `Jamil1016/portfolio`**.
3. Framework preset auto-detects as **Next.js** — accept the defaults (build `next build`, output handled automatically).
4. Before the first deploy, add the four env vars from the table above.
5. Click **Deploy**. Wait ~2 minutes, then open the `*.vercel.app` URL and confirm the landing page renders and `/projects` case studies load (Mermaid diagrams render client-side, so give them a beat).

## Step 2 — Wire the domain  **[you]**

1. Register `jamilmendez.dev` (Namecheap or Cloudflare Registrar) with your personal email — or pick another domain.
2. Vercel → Project → **Settings → Domains → Add → `jamilmendez.dev`**.
3. Add the A / CNAME records Vercel shows you at your registrar. Propagation takes 5–60 min.
4. **If you chose a domain other than `jamilmendez.dev`**, update the hardcoded URL in these files, then commit + push  **[claude can do this]**:
   - `app/layout.tsx` (`metadataBase`)
   - `app/sitemap.ts`
   - `app/robots.ts`
   - `README.md` (the `Production:` line)

## Step 3 — Verify  **[you + claude]**

1. Visit the live domain; click through `/`, `/projects`, a case study, and `/login`.
2. Test the magic-link login with your `ALLOWED_EMAIL`; confirm `/dashboard` loads and a non-allowed email is rejected.
3. Chrome DevTools → Lighthouse → Mobile + Desktop. Target ≥ 95 on Performance / Accessibility / Best Practices / SEO. Fix the cheapest failures first (alt text, meta description, image sizes). **[claude can fix]**

---

## Local sanity checks (already green)

```powershell
npm test        # 27 passing
npm run build   # clean; all 7 case-study pages prerender
```
