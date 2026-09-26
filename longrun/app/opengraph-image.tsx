import { ImageResponse } from "next/og";
import { site } from "./site";

export const alt = "Train agents for work that unfolds over time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(ellipse 90% 60% at 80% 110%, #6fd8ff 0%, #2f63ff 35%, #0b1f8a 60%, #05070d 85%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>{site.name}</div>
        <div style={{ fontSize: 76, fontWeight: 500, lineHeight: 1.05, letterSpacing: -3, maxWidth: 900 }}>
          Train agents for work that unfolds over time.
        </div>
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.25)", paddingTop: 24, fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
          Dynamic environments / long-horizon RL / agent evaluation
        </div>
      </div>
    ),
    size,
  );
}
