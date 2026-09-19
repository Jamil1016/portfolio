import { ogCard, OG_SIZE } from "@/lib/og";
import { SITE_NAME, SITE_TITLE, SITE_TAGLINE } from "@/lib/site-data";

export const alt = `${SITE_NAME}, ${SITE_TITLE}`;
export const size = OG_SIZE;
export const contentType = "image/png";
// Edge runtime: next/og on the Node runtime fails on Windows ("Invalid URL").
export const runtime = "edge";

export default function Image() {
  return ogCard({ eyebrow: SITE_TITLE, headline: SITE_NAME, line: SITE_TAGLINE });
}
