import Link from "next/link";
import { projects, type ProjectMeta } from "@/lib/projects";

function statusNode(p: ProjectMeta) {
  return p.publicRepoStatus === "live" ? (
    <span className="live">● Live</span>
  ) : (
    <span>OSS · {p.publicEtaWeek}</span>
  );
}

function Chips({ tags }: { tags: string[] }) {
  return (
    <div className="chips">
      {tags.slice(0, 5).map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}

export function Work() {
  const [featured, second, third, ...rest] = projects;

  return (
    <section className="band" id="work" data-tab="work" data-screen-label="Selected works">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Selected works · {projects.length} systems</div>
          <h2>Selected works.</h2>
        </div>

        <div className="work-grid">
          <Link className="card featured" href={`/projects/${featured.slug}`}>
            <div className="status">
              <span>01 · Flagship</span>
              {statusNode(featured)}
            </div>
            <h3>{featured.name}</h3>
            <p>{featured.tagline}</p>
            <div className="metric">6.2M rows / night · 25 tables · 99%+ uptime</div>
            <Chips tags={featured.tags} />
          </Link>

          <div className="col2">
            {[second, third].map((p, i) => (
              <Link className="card" href={`/projects/${p.slug}`} key={p.slug}>
                <div className="status">
                  <span>{String(i + 2).padStart(2, "0")}</span>
                  {statusNode(p)}
                </div>
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <Chips tags={p.tags} />
              </Link>
            ))}
          </div>
        </div>

        <div className="ledger">
          {rest.map((p) => (
            <Link className="ledger-row" href={`/projects/${p.slug}`} key={p.slug}>
              <span className="name">{p.name}</span>
              <span className="desc">{p.tagline}</span>
              <span className={`st${p.publicRepoStatus === "live" ? " live" : ""}`}>
                {p.publicRepoStatus === "live" ? "● Live" : `OSS · ${p.publicEtaWeek}`}
              </span>
            </Link>
          ))}
        </div>

        <Link className="link-u all-link" href="/projects">
          All {projects.length} case studies, with architecture diagrams →
        </Link>
      </div>
    </section>
  );
}
