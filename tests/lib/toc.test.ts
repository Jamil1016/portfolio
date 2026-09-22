import { describe, it, expect } from "vitest";
import { extractHeadings } from "@/lib/toc";

describe("extractHeadings", () => {
  it("returns h2 headings with github-style ids, in order", () => {
    const src = `## The Problem\n\ntext\n\n## Architecture\n\n## Key Decisions\n`;
    expect(extractHeadings(src)).toEqual([
      { id: "the-problem", text: "The Problem" },
      { id: "architecture", text: "Architecture" },
      { id: "key-decisions", text: "Key Decisions" },
    ]);
  });

  it("ignores headings inside fenced code blocks and deeper levels", () => {
    const src = [
      "## Real",
      "```python",
      "## not a heading",
      "# neither",
      "```",
      "### Sub-heading",
      "## Also real",
    ].join("\n");
    expect(extractHeadings(src).map((h) => h.text)).toEqual(["Real", "Also real"]);
  });

  it("strips inline markdown and keeps ids unique", () => {
    const src = "## What I `Learned`\n\n## What I Learned\n";
    expect(extractHeadings(src)).toEqual([
      { id: "what-i-learned", text: "What I Learned" },
      { id: "what-i-learned-1", text: "What I Learned" },
    ]);
  });
});
