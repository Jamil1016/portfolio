import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { projects, getProjectBySlug, PRODUCTION_COUNT, getNeighbours } from "@/lib/projects";
import { STATS } from "@/lib/site-data";
import { isValidTag } from "@/lib/tags";

describe("projects metadata", () => {
  it("exposes the full project catalog", () => {
    expect(projects).toHaveLength(16);
  });

  it("has a case-study file for every project", () => {
    for (const p of projects) {
      expect(existsSync(path.join(process.cwd(), "content", "projects", `${p.slug}.mdx`))).toBe(true);
    }
  });

  it("only links a repo when the code is public, and never a work-account repo", () => {
    for (const p of projects) {
      if (p.code === "public") {
        expect(p.publicRepoUrl).toMatch(/^https:\/\/github\.com\/Jamil1016\//);
      } else {
        expect(p.publicRepoUrl).toBeUndefined();
      }
    }
  });

  it("derives the production count from the catalog", () => {
    expect(PRODUCTION_COUNT).toBe(projects.filter((p) => p.prod === "production").length);
    expect(STATS.find((s) => s.label === "systems in production")?.value).toBe(PRODUCTION_COUNT);
  });

  it("features the strongest proof first", () => {
    expect(projects.slice(0, 6).map((p) => p.slug)).toEqual([
      "local-pipeline",
      "workforce-compliance-platform",
      "quote-automation",
      "pipeline-guardian",
      "data-analyst-reporting-agent",
      "event-driven-sync",
    ]);
  });

  it("each project has required fields", () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.prod).toMatch(/^(production|pilot|prototype|personal)$/);
      expect(p.code).toMatch(/^(public|private)$/);
    }
  });

  it("getProjectBySlug returns the matching project", () => {
    const p = getProjectBySlug("pipeline-guardian");
    expect(p?.name).toBe("Pipeline Guardian");
  });

  it("getProjectBySlug returns null for unknown slug", () => {
    expect(getProjectBySlug("not-real")).toBeNull();
  });

  it("every project has a tags array with 4-10 valid tags", () => {
    for (const p of projects) {
      expect(p.tags).toBeDefined();
      expect(Array.isArray(p.tags)).toBe(true);
      expect(p.tags.length).toBeGreaterThanOrEqual(4);
      expect(p.tags.length).toBeLessThanOrEqual(10);
      for (const tag of p.tags) {
        expect(isValidTag(tag)).toBe(true);
      }
    }
  });

  it("no project has duplicate tags", () => {
    for (const p of projects) {
      expect(new Set(p.tags).size).toBe(p.tags.length);
    }
  });
});

describe("case-study summaries", () => {
  it("every project has a four-line summary with no commit counts", () => {
    for (const p of projects) {
      expect(p.summary, p.slug).toBeDefined();
      const s = p.summary!;
      for (const line of [s.problem, s.built, s.result, s.role]) {
        expect(line.trim().length, p.slug).toBeGreaterThan(0);
        expect(line, p.slug).not.toMatch(/\d[\d,+]*\s+(solo\s+)?commits?\b/i);
      }
    }
  });

  it("wraps neighbours at both ends of the catalog", () => {
    const first = projects[0].slug;
    const last = projects[projects.length - 1].slug;
    expect(getNeighbours(first)?.prev.slug).toBe(last);
    expect(getNeighbours(last)?.next.slug).toBe(first);
    expect(getNeighbours("nope")).toBeNull();
  });
});
