import Link from "next/link";
import { projects, isLive, statusLabel, PRODUCTION_COUNT, type ProjectMeta } from "@/lib/projects";

function statusNode(p: ProjectMeta) {
  return isLive(p) ? (
    <span className="live">● {statusLabel(p)}</span>
  ) : (
    <span>{statusLabel(p)}</span>
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

function ledgerRow(p: ProjectMeta) {
  return (
    <Link className="ledger-row" href={`/projects/${p.slug}`} key={p.slug}>
      <span className="name">{p.name}</span>
      <span className="desc">{p.tagline}</span>
      <span className={`st${isLive(p) ? " live" : ""}`}>
        {isLive(p) ? "● " : ""}
        {statusLabel(p)}
      </span>
    </Link>
  );
}

export function Work() {
  const [featured, second, third, ...rest] = projects;
  const moreLive = rest.filter((p) => isLive(p));
  const experiments = rest.filter((p) => !isLive(p));

  return (
    <section className="band" id="work" data-tab="work" data-screen-label="Selected works">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Selected works · {PRODUCTION_COUNT} in production</div>
          <h2>Selected works.</h2>
        </div>

        <div className="work-grid">
          <Link className="card featured" href={`/projects/${featured.slug}`}>
            <div className="status">
              <span>01 · Featured</span>
              {statusNode(featured)}
            </div>
            <h3>{featured.name}</h3>
            <p>{featured.tagline}</p>
            {featured.metric && <div className="metric">{featured.metric}</div>}
            {featured.cover && (
              // Plain img: a static file under /public with unknown dimensions.
              // eslint-disable-next-line @next/next/no-img-element
              <img className="cover" src={featured.cover.src} alt={featured.cover.alt} loading="lazy" />
            )}
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

        <div className="ledger">{moreLive.map(ledgerRow)}</div>

        {/* Prototypes, pilots and personal tools are real but not proof of
            production work, so they sit folded under the credible count. */}
        <details className="ledger-more">
          <summary>
            Experiments, pilots and personal tools · {experiments.length}
          </summary>
          <div className="ledger">{experiments.map(ledgerRow)}</div>
        </details>

        <Link className="link-u all-link" href="/projects">
          All {projects.length} case studies, with architecture diagrams →
        </Link>
      </div>
    </section>
  );
}
