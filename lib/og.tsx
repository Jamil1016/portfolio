import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site-data";

export const OG_SIZE = { width: 1200, height: 630 };

// Cream editorial palette, matching the site's default theme (app/home.css).
const PAPER = "#f4eee1";
const INK = "#1e1a12";
const DIM = "rgba(30,26,18,0.62)";
const GREEN = "#1e7a52";

/** Shared Open Graph card: eyebrow, large headline, one supporting line. */
export function ogCard({
  eyebrow,
  headline,
  line,
}: {
  eyebrow: string;
  headline: string;
  line: string;
}) {
  // The default OG font has no arrow glyph.
  headline = headline.replace(/\s*→\s*/g, " to ");
  line = line.replace(/\s*→\s*/g, " to ");
  const host = SITE_URL.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: DIM,
          }}
        >
          <div
            style={{ width: 14, height: 14, borderRadius: 7, background: GREEN, marginRight: 18 }}
          />
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: headline.length > 28 ? 76 : 104,
              lineHeight: 1.04,
              letterSpacing: -2,
              fontWeight: 700,
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35, color: DIM, marginTop: 28, maxWidth: 980 }}>
            {line}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}`,
            paddingTop: 22,
            fontSize: 24,
            color: DIM,
          }}
        >
          <span>{SITE_NAME}</span>
          <span>{host}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
