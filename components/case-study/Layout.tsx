import "@/app/home.css";
import { PRIVATE_CODE_NOTE, isLive, statusLabel, type ProjectMeta } from "@/lib/projects";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TagPills } from "./TagPills";

export function CaseStudyLayout({
  project,
  children,
}: {
  project: ProjectMeta;
  children: React.ReactNode;
}) {
  const hasRepo = project.code === "public" && Boolean(project.publicRepoUrl);
  const shots = project.screenshots ?? [];

  return (
    <div className="home-shell">
      <SiteHeader />
      <main>
        <section className="cs-head">
          <div className="cs-wrap">
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
            <TagPills tags={project.tags} />
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

        <article className="cs-wrap">
          <div className="cs-prose">{children}</div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
