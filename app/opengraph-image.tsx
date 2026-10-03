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
          backgroundColor: "#F6F3EE",
          padding: "80px",
          color: "#12151C",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#5C6370" }}>
          MANILA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 650, letterSpacing: -2, lineHeight: 1 }}>
            Errell Niño
          </div>
          <div style={{ fontSize: 36, marginTop: 18, fontWeight: 600 }}>
            UX Design Manager
          </div>
          <div style={{ fontSize: 28, color: "#5C6370", marginTop: 12 }}>
            Banking and fintech
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, fontSize: 26, color: "#12151C" }}>
          <span>₱2.1B AUM</span>
          <span>71% fewer errors</span>
          <span>58% less drop-off</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
