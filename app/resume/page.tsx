import "../home.css";
import { ThemeToggle } from "@/components/home/ThemeToggle";
import { projects } from "@/lib/projects";
import { EXPERIENCE, STACK, GITHUB_URL, CONTACT_EMAIL } from "@/lib/site-data";

export const metadata = { title: "Resume — Jamil Mendez" };

export default function Resume() {
  return (
    <div className="home-shell">
      <header>
        <div className="wrap nav">
          <a className="wordmark" href="/">
            Jamil <em>Mendez.</em>
          </a>
          <nav className="nav-links">
            <a href="/#work">Work</a>
            <a href="/#stack">Stack</a>
            <a href="/#training">Training</a>
            <a href="/#experience">About</a>
            <ThemeToggle />
            <a className="btn" href="/resume.pdf" download>
              Download PDF
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-intro">
          <div className="wrap">
            <div className="eyebrow">Resume · Data + AI Engineer</div>
            <h1>Jamil Mendez</h1>
            <p className="sub">
              Data + AI Engineer building and operating production data platforms and
              LLM agents at telecom-operations scale — 6.2M+ rows a night across 25
              tables, with agents that keep the pipelines healthy.
            </p>
            <div className="contact-line">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                github.com/Jamil1016
              </a>
              <span>jamilmendez.dev</span>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Experience</div>
              <h2>Where I&rsquo;ve run things.</h2>
            </div>
            <div className="xp">
              {EXPERIENCE.map((e) => (
                <div className="xp-row" key={e.when}>
                  <div className="when">
                    {e.current && <span className="mini-dot dot" />}
                    {e.when}
                  </div>
                  <div>
                    <div className="role">{e.role}</div>
                    <p className="what">{e.what}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Selected work · {projects.length} systems</div>
              <h2>What I&rsquo;ve shipped.</h2>
            </div>
            <div className="ledger">
              {projects.map((p) => (
                <a className="ledger-row" href={`/projects/${p.slug}`} key={p.slug}>
                  <span className="name">{p.name}</span>
                  <span className="desc">
                    {p.tagline} · {p.stack.join(", ")}
                  </span>
                  <span className={`st${p.publicRepoStatus === "live" ? " live" : ""}`}>
                    {p.publicRepoStatus === "live" ? "● Live" : `OSS · ${p.publicEtaWeek}`}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Technical stack</div>
              <h2>What I build with.</h2>
            </div>
            <div className="stack-grid">
              {STACK.map((col) => (
                <div className="stack-col" key={col.title}>
                  <h3>{col.title}</h3>
                  {col.skills.map((s) => (
                    <div className="skill" key={s.name}>
                      <span className="nm">{s.name}</span>
                      <span className="pc">{s.pct}</span>
                      <span className="bar">
                        {/* static fill — no scroll animation on this page */}
                        <i style={{ width: `${s.pct}%` }} />
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© 2026 Jamil Mendez · jamilmendez.dev</span>
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
