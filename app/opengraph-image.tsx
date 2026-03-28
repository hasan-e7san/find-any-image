import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 48%, #2563eb 100%)",
          color: "#0f172a",
          display: "flex",
          height: "100%",
          width: "100%",
          padding: "64px",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: "32px",
            boxShadow: "0 30px 80px rgba(37,99,235,0.18)",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            justifyContent: "space-between",
            padding: "48px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "18px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#2563eb",
                borderRadius: "24px",
                color: "white",
                display: "flex",
                fontSize: "44px",
                fontWeight: 700,
                height: "86px",
                justifyContent: "center",
                width: "86px",
              }}
            >
              FI
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ fontSize: "58px", fontWeight: 800 }}>{SITE_NAME}</div>
              <div style={{ color: "#475569", fontSize: "28px" }}>
                Search millions of high-quality images
              </div>
            </div>
          </div>

          <div
            style={{
              color: "#1e293b",
              display: "flex",
              flexDirection: "column",
              fontSize: "34px",
              gap: "14px",
              lineHeight: 1.25,
              maxWidth: "900px",
            }}
          >
            <div>Find royalty-free visuals, explore fast results, and save favorites for later.</div>
            <div style={{ color: "#2563eb", fontWeight: 700 }}>{SITE_TAGLINE}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
