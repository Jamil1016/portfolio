import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// "JM" monogram in the site's ink-on-cream colours.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e1a12",
          color: "#f4eee1",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 12,
        }}
      >
        JM
      </div>
    ),
    size,
  );
}
