import "@/app/home.css";
import type { ProjectMeta } from "@/lib/projects";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TagPills } from "./TagPills";

export function CaseStudyLayout({
  project,
  children,
}: {
  project: ProjectMeta;
  children: React.ReactNode;
}) {
  return (
    <div className="home-shell">
      <SiteHeader />
      <main>
        <section className="cs-head">
          <div className="wrap">
            <div className="eyebrow">
              Case study ·{" "}
              {project.publicRepoStatus === "live" ? "Live" : `OSS · ${project.publicEtaWeek}`}
            </div>
            <h1>{project.name}</h1>
            <p className="tagline">{project.tagline}</p>
            <div className="stack">
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            {project.publicRepoStatus === "coming" && (
              <div className="cs-status">
                Open-source reference implementation coming {project.publicEtaWeek}
              </div>
            )}
            <TagPills tags={project.tags} />
          </div>
        </section>

        <article className="wrap">
          <div className="cs-prose">{children}</div>
        </article>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© 2026 Jamil Mendez · jamilmendez.dev</span>
          <span>
            <a href="/#work">Work</a>
            <a href="/projects">All projects</a>
            <a href="/">Home</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
