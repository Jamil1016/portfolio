import { projects } from "@/lib/projects";
import { GITHUB_URL } from "@/lib/site-data";

// Real build-status board (replaces the mockup's fabricated nightly run table).
// Every row is a real project from lib/projects.ts.
function SystemsPanel() {
  const inProd = projects.filter((p) => p.prod === "production").length;
  const proto = projects.length - inProd;

  const rows = (keyPrefix: string) =>
    projects.map((p) => {
      const live = p.prod === "production";
      return (
        <div className="run-row" key={`${keyPrefix}-${p.slug}`}>
          <span className="r-name">{p.name}</span>
          <span className="r-meta">{p.stack.slice(0, 2).join(" · ")}</span>
          <span className={live ? "r-st" : "r-st coming"}>{live ? "● prod" : "proto"}</span>
        </div>
      );
    });

  return (
    <div className="run" data-screen-label="Build status">
      <div className="run-head">
        <span className="t">Build status</span>
        <span className="ok">
          ● {inProd} in production · {proto} prototype
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
            <span className="dot" /> Data &amp; AI Automation Engineer · available for hire
          </div>
          <h1>
            Turning manual processes
            <br />
            into <em>production pipelines.</em>
          </h1>
          <p className="sub">
            Automated data processing, self-writing reports, and LLM agents that keep
            the pipelines healthy. Built in Python, Postgres, and the Claude&nbsp;API.
          </p>
          <div className="cta-row">
            <a className="btn" href="#work" data-tablink="work">
              View case studies
            </a>
            <a className="link-u" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
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
