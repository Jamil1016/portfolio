import { describe, it, expect } from "vitest";
import { ALL_TAGS, isValidTag } from "@/lib/tags";

describe("ALL_TAGS", () => {
  it("contains exactly 30 tags", () => {
    expect(ALL_TAGS).toHaveLength(30);
  });

  it("has no duplicates", () => {
    expect(new Set(ALL_TAGS).size).toBe(ALL_TAGS.length);
  });

  it("are all lowercase kebab-case", () => {
    const pattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    for (const tag of ALL_TAGS) {
      expect(tag).toMatch(pattern);
    }
  });

  it("includes expected anchor tags from each axis", () => {
    expect(ALL_TAGS).toContain("python");
    expect(ALL_TAGS).toContain("async");
    expect(ALL_TAGS).toContain("rag");
    expect(ALL_TAGS).toContain("automation");
    expect(ALL_TAGS).toContain("security");
    expect(ALL_TAGS).toContain("ai-safety");
  });
});

describe("isValidTag", () => {
  it("accepts known tags", () => {
    expect(isValidTag("python")).toBe(true);
    expect(isValidTag("nl-sql")).toBe(true);
    expect(isValidTag("data-quality")).toBe(true);
  });

  it("rejects unknown tags", () => {
    expect(isValidTag("not-a-real-tag")).toBe(false);
    expect(isValidTag("")).toBe(false);
    expect(isValidTag("PYTHON")).toBe(false);
  });
});
