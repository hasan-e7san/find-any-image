import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(160deg, #2563eb 0%, #1d4ed8 55%, #0f172a 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "760px",
          }}
        >
          <div style={{ fontSize: "72px", fontWeight: 800 }}>{SITE_NAME}</div>
          <div style={{ fontSize: "34px", lineHeight: 1.3 }}>
            Search, discover, and save high-quality images for any project.
          </div>
          <div style={{ color: "#bfdbfe", fontSize: "26px" }}>{SITE_TAGLINE}</div>
        </div>

        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.24)",
            borderRadius: "40px",
            display: "flex",
            fontSize: "88px",
            fontWeight: 800,
            height: "210px",
            justifyContent: "center",
            width: "210px",
          }}
        >
          FI
        </div>
      </div>
    ),
    size,
  );
}
