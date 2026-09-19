import { projects, isLive, PRODUCTION_COUNT } from "@/lib/projects";
import { AVAILABILITY, EXPERIENCE_LINE, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/lib/site-data";

// Real build-status board (replaces the mockup's fabricated nightly run table).
// Every row is a real project from lib/projects.ts.
function SystemsPanel() {
  const inProd = PRODUCTION_COUNT;
  const other = projects.length - inProd;
  const SHORT = { production: "● prod", pilot: "pilot", prototype: "proto", personal: "personal" } as const;

  const rows = (keyPrefix: string) =>
    projects.map((p) => {
      const live = isLive(p);
      return (
        <div className="run-row" key={`${keyPrefix}-${p.slug}`}>
          <span className="r-name">{p.name}</span>
          <span className="r-meta">{p.stack.slice(0, 2).join(" · ")}</span>
          <span className={live ? "r-st" : "r-st coming"}>{SHORT[p.prod]}</span>
        </div>
      );
    });

  return (
    <div className="run" data-screen-label="Build status">
      <div className="run-head">
        <span className="t">Build status</span>
        <span className="ok">
          ● {inProd} in production · {other} pilot / prototype
        </span>
      </div>
      <div className="run-cols">
        <span>system</span>
        <span>stack</span>
        <span>status</span>
      </div>
      <div className="run-body">
        {/* Auto-scrolling live feed; segments duplicated so the loop seam stays
            covered even when the panel is tall. Pauses on hover. */}
        <div className="run-track">
          <div className="run-seg">{rows("a")}</div>
          <div className="run-seg" aria-hidden="true">{rows("b")}</div>
          <div className="run-seg" aria-hidden="true">{rows("c")}</div>
          <div className="run-seg" aria-hidden="true">{rows("d")}</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="hero" data-tab="home" data-screen-label="Hero">
      <div className="wrap hero-grid">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="dot" /> Data &amp; AI Automation Engineer · {EXPERIENCE_LINE}
          </div>
          <h1>
            Turning manual processes
            <br />
            into <em>production pipelines.</em>
          </h1>
          <p className="sub">
            Data pipelines, scheduled reports, internal tools, and LLM agents that ask
            before they act. Built in Python, Postgres, Next.js, and the Claude&nbsp;API.
          </p>
          <p className="avail">{AVAILABILITY}.</p>
          <div className="cta-row">
            <a className="btn" href="#work" data-tablink="work">
              View case studies
            </a>
            <a className="btn ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Resume (PDF)
            </a>
            <a className="link-u" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            {LINKEDIN_URL && (
              <a className="link-u" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            )}
          </div>
          <div className="hero-stackline">
            Python · Postgres · Claude API · Next.js · Supabase
          </div>
        </div>
        <SystemsPanel />
      </div>
    </section>
  );
}
