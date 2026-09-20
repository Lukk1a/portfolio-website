import { ImageResponse } from "next/og";
import { portfolioConfig } from "@/config/portfolio";

export const alt = "Luka Pajkanovic | Systems & Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const displayHost = portfolioConfig.siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "80px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            letterSpacing: "0.2em",
            color: "#a1a1aa",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              backgroundColor: "#38bdf8",
            }}
          />
          <span>SYSTEMS &amp; WEB ARCHITECTURE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "900",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            Luka Pajkanovic
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "300",
              color: "#a1a1aa",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Low-level memory models, deterministic simulation, and resilient web platforms.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
            fontSize: "18px",
            color: "#71717a",
            fontFamily: "monospace",
          }}
        >
          <div>C++20 • PYTHON • TYPESCRIPT • LUAU • DOCKER</div>
          <div>{displayHost}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
