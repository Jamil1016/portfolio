import GithubSlugger from "github-slugger";

export type Heading = { id: string; text: string };

// Pulls the `## ` headings out of a case-study source so the page can render a
// table of contents. Ids use github-slugger, the same slugger rehype-slug uses
// when it stamps ids on the rendered headings, so the anchors line up.
export function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  let inFence = false;
  for (const raw of source.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (/^(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[1].replace(/[`*_]/g, "").trim();
    out.push({ id: slugger.slug(text), text });
  }
  return out;
}
