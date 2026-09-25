import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          backgroundColor: "#00D4FF",
          color: "#0A0A0F",
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        EN
      </div>
    ),
    { ...size },
  );
}
