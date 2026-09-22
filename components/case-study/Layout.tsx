import "@/app/home.css";
import Link from "next/link";
import { PRIVATE_CODE_NOTE, isLive, statusLabel, type ProjectMeta } from "@/lib/projects";
import type { Heading } from "@/lib/toc";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TagPills } from "./TagPills";

type Neighbour = Pick<ProjectMeta, "slug" | "name">;

export function CaseStudyLayout({
  project,
  headings = [],
  neighbours,
  children,
}: {
  project: ProjectMeta;
  headings?: Heading[];
  neighbours?: { prev: Neighbour; next: Neighbour };
  children: React.ReactNode;
}) {
  const hasRepo = project.code === "public" && Boolean(project.publicRepoUrl);
  const shots = project.screenshots ?? [];
  const summary = project.summary;

  return (
    <div className="home-shell">
      <SiteHeader />
      <main>
        <section className="cs-head">
          <div className="cs-wrap cs-head-grid">
            <div className="cs-head-main">
              <div className="eyebrow">
                {isLive(project) && <span className="dot" />}
                Case study · {statusLabel(project)} · {hasRepo ? "public code" : "private code"}
              </div>
              <h1>{project.name}</h1>
              <p className="tagline">{project.tagline}</p>
              <div className="stack">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              {hasRepo ? (
                <div className="cs-repo">
                  <a
                    className="link-u"
                    href={project.publicRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.repoLabel ?? "View repository"} ↗
                  </a>
                </div>
              ) : (
                <div className="cs-status">{project.privateNote ?? PRIVATE_CODE_NOTE}</div>
              )}
            </div>

            {summary && (
              <section className="cs-summary" aria-labelledby="cs-summary-title">
                <div className="cs-summary-title" id="cs-summary-title">
                  30-second version
                </div>
                <dl>
                  <dt>Problem</dt>
                  <dd>{summary.problem}</dd>
                  <dt>Built</dt>
                  <dd>{summary.built}</dd>
                  <dt>Result</dt>
                  <dd className="cs-summary-result">{summary.result}</dd>
                  <dt>Role</dt>
                  <dd>{summary.role}</dd>
                </dl>
              </section>
            )}
          </div>
        </section>

        {shots.length > 0 && (
          <section className="cs-wrap cs-shots" aria-label="Screenshots">
            {shots.map((shot) => (
              <figure key={shot.src}>
                {/* Plain img: screenshots are static files with unknown dimensions. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} loading="lazy" />
                {shot.caption && <figcaption>{shot.caption}</figcaption>}
              </figure>
            ))}
          </section>
        )}

        <div className="cs-wrap cs-body">
          {headings.length > 0 && (
            <nav className="cs-toc" aria-label="On this page">
              <div className="cs-toc-title">On this page</div>
              <ol>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article className="cs-article">
            <div className="cs-prose">{children}</div>
            <div className="cs-tags">
              <span className="cs-tags-label">Tagged</span>
              <TagPills tags={project.tags} />
            </div>
            {neighbours && (
              <nav className="cs-neighbours" aria-label="More case studies">
                <Link href={`/projects/${neighbours.prev.slug}`} className="cs-neighbour">
                  <span className="cs-neighbour-label">← Previous</span>
                  <span className="cs-neighbour-name">{neighbours.prev.name}</span>
                </Link>
                <Link href={`/projects/${neighbours.next.slug}`} className="cs-neighbour cs-neighbour--next">
                  <span className="cs-neighbour-label">Next →</span>
                  <span className="cs-neighbour-name">{neighbours.next.name}</span>
                </Link>
              </nav>
            )}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
