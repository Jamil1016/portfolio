import { projects } from "@/lib/projects";
import { GITHUB_URL } from "@/lib/site-data";

// Real build-status board (replaces the mockup's fabricated nightly run table).
// Every row is a real project from lib/projects.ts.
function SystemsPanel() {
  const live = projects.filter((p) => p.publicRepoStatus === "live").length;
  const shipping = projects.length - live;

  return (
    <div className="run" data-screen-label="Build status">
      <div className="run-head">
        <span className="t">Build status</span>
        <span className="ok">
          ● {live} live · {shipping} shipping
        </span>
      </div>
      <div className="run-cols">
        <span>system</span>
        <span>stack</span>
        <span>status</span>
      </div>
      <div className="run-body">
        {projects.map((p) => {
          const isLive = p.publicRepoStatus === "live";
          return (
            <div className="run-row" key={p.slug}>
              <span className="r-name">{p.name}</span>
              <span className="r-meta">{p.stack.slice(0, 2).join(" · ")}</span>
              <span className={isLive ? "r-st" : "r-st coming"}>
                {isLive ? "● live" : `OSS · ${p.publicEtaWeek}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="hero" data-screen-label="Hero">
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
            <a className="btn" href="#work">
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
