import fs from "node:fs/promises";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { listCaseStudySlugs, loadCaseStudy } from "@/lib/content";

// Commit counts measure activity, not outcomes, and they read as padding next
// to the real metrics. Keep them out of published case studies.
const COMMIT_COUNT = /\b[\d,]+\+?\s+(solo\s+)?commits?\b/i;

describe("case-study content claims", () => {
  it("quotes no commit counts", async () => {
    const slugs = await listCaseStudySlugs();
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      const source = (await loadCaseStudy(slug)) ?? "";
      const offending = source
        .split(/\r?\n/)
        .filter((line) => COMMIT_COUNT.test(line));
      expect(offending, slug).toEqual([]);
    }
  });

  it("checks every mdx file on disk, not just the registered slugs", async () => {
    const dir = path.join(process.cwd(), "content", "projects");
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));
    expect(files.length).toBe((await listCaseStudySlugs()).length);
  });
});
