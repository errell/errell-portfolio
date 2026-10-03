import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Errell Niño — UX Design Manager | Banking & Fintech | Manila";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0F",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(0,212,255,0.14), transparent 55%)",
          padding: "80px",
          color: "#F0F0F0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "rgba(0,212,255,0.15)",
              color: "#00D4FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            EN
          </div>
          <div style={{ fontSize: 28, color: "#00D4FF", letterSpacing: 2 }}>
            UX DESIGN MANAGER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            Designing Banking Experiences Filipinos Actually Trust
          </div>
          <div style={{ fontSize: 30, color: "#9a9aae", marginTop: 28 }}>
            Errell Niño · 15 Years · Banking &amp; Fintech · Manila
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "#FFB347" }}>
          <span>₱2.1B AUM</span>
          <span>71% fewer errors</span>
          <span>58% less drop-off</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
