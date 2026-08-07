import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { EVENT } from "@/lib/constants";

/**
 * Shared social preview for WhatsApp, Facebook, X, LinkedIn, etc.
 * Next.js injects the og:image / twitter:image tags (with type, width and
 * height) automatically — that's what link unfurlers read. 1200x630 is the
 * standard Open Graph ratio.
 */
export const alt = `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read the logo once at module scope (no request data) and inline as base64.
const logoData = await readFile(
  join(process.cwd(), "public", "keslogo.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#070718",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(247,148,29,0.28), transparent 46%), radial-gradient(circle at 8% 92%, rgba(58,73,201,0.30), transparent 44%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo + date pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} height={72} alt={EVENT.name} />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#fdb551",
              border: "1px solid rgba(253,181,81,0.4)",
              borderRadius: 999,
              padding: "12px 28px",
            }}
          >
            {EVENT.dates.label}
          </div>
        </div>

        {/* Middle: theme headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#adb3cb",
              marginBottom: 22,
            }}
          >
            {EVENT.name} · {EVENT.year}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f4f5fa",
            }}
          >
            {EVENT.theme}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#f7941d",
              marginTop: 26,
            }}
          >
            {EVENT.tagline}
          </div>
        </div>

        {/* Bottom: venue + admission */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#adb3cb",
          }}
        >
          <div style={{ display: "flex" }}>
            {EVENT.venue.name}, {EVENT.venue.cityShort}
          </div>
          <div style={{ display: "flex", fontWeight: 600, color: "#f4f5fa" }}>
            {EVENT.admission}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );

  // Buffer the generated image into a plain Response. Returning the streaming
  // ImageResponse directly can trip a "failed to pipe response" error under
  // the Turbopack dev server; buffering sidesteps that while staying within
  // the opengraph-image file convention (which just needs a Response).
  const body = await image.arrayBuffer();
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, immutable, no-transform, max-age=31536000",
    },
  });
}
