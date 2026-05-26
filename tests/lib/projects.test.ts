import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug } from "@/lib/projects";
import { isValidTag } from "@/lib/tags";

describe("projects metadata", () => {
  it("exposes exactly six projects", () => {
    expect(projects).toHaveLength(7);
  });

  it("each project has required fields", () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.publicRepoStatus).toMatch(/^(coming|live)$/);
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
