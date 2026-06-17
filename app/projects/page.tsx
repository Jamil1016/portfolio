import "../home.css";
import { projects } from "@/lib/projects";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TagFilter } from "@/components/projects/TagFilter";
import { GITHUB_URL, CONTACT_EMAIL } from "@/lib/site-data";

export const metadata = { title: "Projects | Jamil Mendez" };

export default function ProjectsIndex() {
  return (
    <div className="home-shell">
      <SiteHeader />
      <main>
        <section className="page-intro">
          <div className="wrap">
            <div className="eyebrow">Projects · {projects.length} systems</div>
            <h1>Systems that operate themselves.</h1>
            <p className="sub">
              Production data + AI systems, not toy demos. Filter by stack, pattern, or
              domain. Every entry links to a case study with architecture diagrams.
            </p>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <TagFilter projects={projects} />
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
