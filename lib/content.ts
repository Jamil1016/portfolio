import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function loadCaseStudy(slug: string): Promise<string | null> {
  const safe = slug.replace(/[^a-z0-9-]/gi, "");
  if (!safe || safe !== slug) return null;
  try {
    const file = path.join(CONTENT_DIR, `${safe}.mdx`);
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function listCaseStudySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}
