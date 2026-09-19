import type { Metadata } from "next";
import "../home.css";
import { projects } from "@/lib/projects";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TagFilter } from "@/components/projects/TagFilter";
import { SiteFooter } from "@/components/home/SiteFooter";

const DESCRIPTION =
  "Case studies of data pipelines, internal tools and LLM agents, each with an architecture diagram, key decisions and honest status.";

export const metadata: Metadata = {
  title: "Projects | Jamil Mendez",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Jamil Mendez", description: DESCRIPTION, url: "/projects" },
};

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
              Data and AI systems I designed and built. Filter by stack, pattern, or
              domain. Every entry links to a case study with an architecture diagram and
              says plainly whether it is in production, a pilot, or a prototype.
            </p>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <TagFilter projects={projects} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
