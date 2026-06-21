import { projects } from "@/lib/projects";

const BASE = "https://jamilmendez.dev"; // update after domain is wired

export default function sitemap() {
  const now = new Date();
  return [
    { url: BASE,                lastModified: now },
    { url: `${BASE}/projects`,  lastModified: now },
    { url: `${BASE}/about`,     lastModified: now },
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: now,
    })),
  ];
}
