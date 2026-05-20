import { describe, it, expect } from "vitest";
import { loadCaseStudy } from "@/lib/content";

describe("loadCaseStudy", () => {
  it("returns null for an unknown slug", async () => {
    expect(await loadCaseStudy("does-not-exist")).toBeNull();
  });
});
