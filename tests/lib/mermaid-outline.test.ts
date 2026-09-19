import { describe, it, expect } from "vitest";
import { mermaidOutline } from "@/lib/mermaid-outline";

describe("mermaidOutline", () => {
  it("turns edges into readable lines using node labels", () => {
    const lines = mermaidOutline(`
graph LR
  A[Apps Script<br/>time trigger] --> B[(Warehouse)]
  B -->|server-side SQL| C{delta?}
  C -.->|rolling append| D[Sheet]
  P[Presence] -.live roster.-> A
`);
    expect(lines).toEqual([
      "Apps Script time trigger → Warehouse",
      "Warehouse → delta? (server-side SQL)",
      "delta? → Sheet (rolling append)",
      "Presence → Apps Script time trigger (live roster)",
    ]);
  });

  it("falls back to the raw lines when nothing parses", () => {
    const src = ["sequenceDiagram", "  A->>B: hi"].join(String.fromCharCode(10));
    expect(mermaidOutline(src)).toEqual(["sequenceDiagram", "A->>B: hi"]);
  });
});
