import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "monospace",
          fontWeight: 900,
          borderRadius: "6px",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          position: "relative",
        }}
      >
        <span style={{ letterSpacing: "-1px" }}>LP</span>
        <div
          style={{
            position: "absolute",
            bottom: "3px",
            right: "3px",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#38bdf8",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

