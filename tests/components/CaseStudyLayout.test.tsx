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
