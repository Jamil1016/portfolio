import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug } from "@/lib/projects";

describe("projects metadata", () => {
  it("exposes exactly six projects", () => {
    expect(projects).toHaveLength(6);
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
});
