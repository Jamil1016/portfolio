import { ogCard, OG_SIZE } from "@/lib/og";
import { getProjectBySlug } from "@/lib/projects";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-data";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return ogCard({ eyebrow: "Case study", headline: SITE_NAME, line: SITE_TAGLINE });
  }
  return ogCard({
    eyebrow: `Case study · ${SITE_NAME}`,
    headline: project.name,
    line: project.tagline,
  });
}
