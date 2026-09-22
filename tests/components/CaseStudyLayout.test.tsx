import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import type { ProjectMeta } from "@/lib/projects";

const base: ProjectMeta = {
  slug: "local-pipeline",
  name: "Async ETL Platform",
  tagline: "Async multi-pipeline ETL into Postgres",
  stack: ["Python", "asyncpg"],
  publicRepoUrl: "https://github.com/Jamil1016/local-pipeline",
  prod: "production",
  code: "public",
  tags: ["python", "etl"],
};

describe("CaseStudyLayout", () => {
  it("links to the public repo when code is public", () => {
    render(<CaseStudyLayout project={base}>body</CaseStudyLayout>);
    const repo = screen.getByRole("link", { name: /view repository/i });
    expect(repo).toHaveAttribute("href", base.publicRepoUrl);
    expect(repo).toHaveAttribute("target", "_blank");
  });

  it("shows the private-code note and no repo link when the code is private", () => {
    render(
      <CaseStudyLayout project={{ ...base, code: "private", publicRepoUrl: undefined }}>
        body
      </CaseStudyLayout>,
    );
    expect(screen.queryByRole("link", { name: /repository/i })).toBeNull();
    expect(screen.getByText(/code is private \(employer system\)/i)).toBeInTheDocument();
  });

  it("uses a custom repo label when one is set", () => {
    render(
      <CaseStudyLayout project={{ ...base, repoLabel: "Public reference build" }}>body</CaseStudyLayout>,
    );
    expect(screen.getByRole("link", { name: /public reference build/i })).toHaveAttribute(
      "href",
      base.publicRepoUrl,
    );
  });

  it("renders screenshots only when the project lists them", () => {
    const { rerender } = render(<CaseStudyLayout project={base}>body</CaseStudyLayout>);
    expect(screen.queryByRole("img")).toBeNull();
    rerender(
      <CaseStudyLayout
        project={{ ...base, screenshots: [{ src: "/projects/x/a.png", alt: "Queue page" }] }}
      >
        body
      </CaseStudyLayout>,
    );
    expect(screen.getByRole("img", { name: "Queue page" })).toHaveAttribute("src", "/projects/x/a.png");
  });
});

describe("CaseStudyLayout: summary, contents and neighbours", () => {
  const summary = {
    problem: "One script took six hours.",
    built: "Fourteen parallel pipelines.",
    result: "12.2M rows nightly.",
    role: "Sole engineer",
  };

  it("renders the 30-second summary when the project has one", () => {
    render(
      <CaseStudyLayout project={{ ...base, summary }}>body</CaseStudyLayout>,
    );
    const box = screen.getByRole("region", { name: /30-second version/i });
    expect(box).toHaveTextContent("One script took six hours.");
    expect(box).toHaveTextContent("12.2M rows nightly.");
    expect(box).toHaveTextContent("Sole engineer");
  });

  it("omits the summary box when the project has none", () => {
    render(<CaseStudyLayout project={base}>body</CaseStudyLayout>);
    expect(screen.queryByRole("region", { name: /30-second version/i })).toBeNull();
  });

  it("renders a table of contents linking to heading ids", () => {
    render(
      <CaseStudyLayout
        project={base}
        headings={[
          { id: "the-problem", text: "The Problem" },
          { id: "metrics", text: "Metrics" },
        ]}
      >
        body
      </CaseStudyLayout>,
    );
    const nav = screen.getByRole("navigation", { name: /on this page/i });
    expect(nav.querySelector('a[href="#metrics"]')).toHaveTextContent("Metrics");
  });

  it("renders previous and next case-study links", () => {
    render(
      <CaseStudyLayout
        project={base}
        neighbours={{
          prev: { slug: "event-driven-sync", name: "Event-Driven Sync" },
          next: { slug: "pipeline-guardian", name: "Pipeline Guardian" },
        }}
      >
        body
      </CaseStudyLayout>,
    );
    expect(screen.getByRole("link", { name: /previous.*event-driven sync/i })).toHaveAttribute(
      "href",
      "/projects/event-driven-sync",
    );
    expect(screen.getByRole("link", { name: /next.*pipeline guardian/i })).toHaveAttribute(
      "href",
      "/projects/pipeline-guardian",
    );
  });

  it("keeps the tag links, after the article", () => {
    render(<CaseStudyLayout project={base}>body</CaseStudyLayout>);
    const tag = screen.getByRole("link", { name: "etl" });
    expect(tag).toHaveAttribute("href", "/projects#tag=etl");
    const article = screen.getByRole("article");
    expect(article.compareDocumentPosition(tag) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
