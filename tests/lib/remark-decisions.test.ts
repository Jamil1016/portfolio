import { describe, it, expect } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkDecisions from "@/lib/remark-decisions";

async function classes(md: string): Promise<string[]> {
  const proc = unified().use(remarkParse).use(remarkDecisions);
  const tree = await proc.run(proc.parse(md));
  const out: string[] = [];
  const walk = (n: { type: string; data?: { hProperties?: { className?: string } }; children?: unknown[] }) => {
    if (n.type === "list") out.push(n.data?.hProperties?.className ?? "");
    (n.children as typeof n[] | undefined)?.forEach(walk);
  };
  walk(tree as Parameters<typeof walk>[0]);
  return out;
}

describe("remarkDecisions", () => {
  it("tags the list that directly follows a Key Decisions heading", async () => {
    const md = "## Key Decisions\n\n- **A.** one\n- **B.** two\n\n## Metrics\n\n- 1\n";
    expect(await classes(md)).toEqual(["cs-decisions", ""]);
  });

  it("does nothing when the heading is followed by a paragraph", async () => {
    const md = "## Key Decisions\n\nIntro paragraph.\n\n1. first\n";
    expect(await classes(md)).toEqual([""]);
  });

  it("matches the heading case-insensitively", async () => {
    const md = "## Key decisions\n\n- x\n";
    expect(await classes(md)).toEqual(["cs-decisions"]);
  });
});
