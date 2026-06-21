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

  it("shows no repo link when the code is private", () => {
    render(<CaseStudyLayout project={{ ...base, code: "private" }}>body</CaseStudyLayout>);
    expect(screen.queryByRole("link", { name: /view repository/i })).toBeNull();
  });
});
