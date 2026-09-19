/**
 * Turns a Mermaid `graph` source into plain-text lines ("A → B (label)") so
 * crawlers and no-JS readers get the flow without running Mermaid. It covers
 * the subset the case studies use; anything it can't parse falls back to the
 * raw source lines.
 */
export function mermaidOutline(source: string): string[] {
  const labels = new Map<string, string>();
  const out: string[] = [];

  const clean = (s: string) =>
    s
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/^[("\s]+|[)"\s]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const NODE = /([A-Za-z0-9_]+)\s*(?:\[([^\]]+)\]|\{([^}]+)\}|\(\(([^)]+)\)\))/g;
  const EDGE =
    /^([A-Za-z0-9_]+)\s*(?:-\.\s*([^.|>]*?)\s*\.->|-\.->|-->|==>|---)\s*(?:\|([^|]*)\|)?\s*([A-Za-z0-9_]+)/;

  const lines = source
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/^(graph|flowchart|subgraph|end|classDef|class|style|%%)\b/.test(l));

  for (const line of lines) {
    for (const m of Array.from(line.matchAll(NODE))) {
      labels.set(m[1], clean(m[2] ?? m[3] ?? m[4] ?? m[1]));
    }
  }

  for (const line of lines) {
    const bare = line.replace(NODE, "$1");
    const m = bare.match(EDGE);
    if (!m) continue;
    const from = labels.get(m[1]) ?? m[1];
    const to = labels.get(m[4]) ?? m[4];
    const edge = clean(m[3] ?? m[2] ?? "");
    out.push(edge ? `${from} → ${to} (${edge})` : `${from} → ${to}`);
  }

  return out.length > 0 ? out : lines;
}
