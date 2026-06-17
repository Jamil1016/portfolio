import "../home.css";
import { SiteHeader } from "@/components/home/SiteHeader";
import { GITHUB_URL, CONTACT_EMAIL } from "@/lib/site-data";

export const metadata = { title: "Resume | Jamil Mendez" };

const PRINCIPLES = [
  {
    n: "01",
    title: "Systems that operate themselves",
    body: "I'd rather spend a week making a pipeline self-healing than answer the same 2 AM page twice. Auto-remediation, retries with backoff, and runbook-aware agents beat heroics.",
  },
  {
    n: "02",
    title: "Validate counts as a first-class signal",
    body: "The worst bugs don't error. They silently return fewer rows. I treat row-count reconciliation and data-quality checks as core features, not afterthoughts.",
  },
  {
    n: "03",
    title: "Only count it learned once it ships",
    body: "I keep a structured roadmap, but a course isn't done until the idea lands in a production system: evals, safety rails, and observability included.",
  },
];

const HIGHLIGHTS = [
  {
    metric: "44m → 2–3m",
    text: (
      <>
        Rewrote a six-hour, single-threaded nightly job into a{" "}
        <strong>parallel, idempotent ETL platform</strong>; the server-side transform alone
        now runs <strong>2.6M rows in 2–3 minutes</strong> (down from ~44 min in Python).
      </>
    ),
  },
  {
    metric: "12.2M+ rows",
    text: (
      <>
        Operate <strong>~14 scheduled ETL pipelines</strong> feeding a six-schema,
        111-table Postgres warehouse of <strong>~12.2M rows</strong>.
      </>
    ),
  },
  {
    metric: "2,866 PDFs",
    text: (
      <>
        Built a resumable, two-pool downloader that pulls an entire org&rsquo;s requirement
        PDFs over a paginated API: <strong>2,866 files / 3.4 GB in one ~61-minute run</strong>,
        recovering cleanly from a mid-run network outage.
      </>
    ),
  },
  {
    metric: "0 silent loss",
    text: (
      <>
        Eliminated silent upstream data loss by chunking a truncating API to one call
        per day and validating per-day row counts as a hard signal.
      </>
    ),
  },
  {
    metric: "2 agents",
    text: (
      <>
        Shipped <strong>Pipeline Guardian</strong> (auto-remediates failed nightly runs)
        and <strong>DARA</strong> (schema-aware NL→SQL with safety rails and a 48-case eval
        suite).
      </>
    ),
  },
];

const DECISIONS = [
  {
    t: "Per-day API chunking",
    d: (
      <>
        The upstream API silently truncated wide date ranges at ~1,000 rows. One call
        per calendar day bypassed it entirely, <em>zero silent data loss</em> at the cost
        of more requests.
      </>
    ),
  },
  {
    t: "asyncpg on a background thread",
    d: (
      <>
        A pure-async rewrite of the sync codebase would have stalled. Running the
        connection pool on its own event loop and bridging via{" "}
        <code>run_coroutine_threadsafe()</code> let sync callers reach an async DB layer.
      </>
    ),
  },
  {
    t: "Three-schema split",
    d: (
      <>
        <code>raw → staging → analytics</code>, each layer rebuildable from the one
        beneath it. The schema <em>is</em> the documentation.
      </>
    ),
  },
  {
    t: "Write-once derived IDs",
    d: (
      <>
        Once a foreign-key resolution lands on a row it never changes, surviving
        truncate-and-reload without cascading rewrites downstream.
      </>
    ),
  },
];

export default function Resume() {
  return (
    <div className="home-shell">
      <SiteHeader
        cta={
          <a className="btn" href="/resume.pdf" download>
            Download PDF
          </a>
        }
      />

      <main>
        <section className="page-intro">
          <div className="wrap">
            <div className="eyebrow">Resume · Data + AI Engineer</div>
            <h1>The short version.</h1>
            <p className="sub">
              The home page has the metrics and the project grid. This is how I think,
              the wins I&rsquo;m proudest of, and a look under the hood of the flagship
              system, the parts a résumé bullet can&rsquo;t hold.
            </p>
            <div className="contact-line">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                github.com/Jamil1016
              </a>
            </div>
            <div className="contact-line">
              <a href="/resume.pdf" download>
                Resume (PDF)
              </a>
              <a href="/cv.pdf" download>
                CV (PDF)
              </a>
              <a href="/cover-letter.pdf" download>
                Cover letter (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* How I work */}
        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">How I work</div>
              <h2>Three things I optimize for.</h2>
            </div>
            <div className="principles">
              {PRINCIPLES.map((p) => (
                <div className="principle" key={p.n}>
                  <div className="pn">{p.n}</div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career highlights */}
        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Career highlights</div>
              <h2>What moved the needle.</h2>
            </div>
            <div className="highlights">
              {HIGHLIGHTS.map((h, i) => (
                <div className="hl-row" key={i}>
                  <div className="hl-metric">{h.metric}</div>
                  <div className="hl-text">{h.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship deep-dive */}
        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Flagship deep-dive · Async ETL Platform</div>
              <h2>Under the hood.</h2>
            </div>
            <p className="dd-lead">
              Nightly ingestion of millions of rows from a third-party API into a Postgres
              warehouse that feeds dashboards and AI agents. It had to be{" "}
              <strong>parallel, idempotent, and observable</strong>. One extractor failing
              couldn&rsquo;t take down the rest, and a re-run had to produce the same result
              every time. Here are the decisions that made that true.
            </p>
            <div className="dd-grid">
              {DECISIONS.map((d) => (
                <div className="dd-card" key={d.t}>
                  <div className="dt">{d.t}</div>
                  <div className="dd">{d.d}</div>
                </div>
              ))}
            </div>
            <div className="dd-foot">
              <a className="link-u" href="/projects/local-pipeline">
                Read the full case study: architecture diagram + code →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© 2026 Jamil Mendez</span>
          <span>
            <a href="/">Home</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
