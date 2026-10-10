import { ImageResponse } from "next/og";
import { contact } from "@/data";

export const alt = `${contact.fullName} — ${contact.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card in the portfolio's palette.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050816",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ width: 20, height: 20, borderRadius: 9999, background: "#915eff" }} />
          <div style={{ display: "flex", fontSize: 28, color: "#aaa6c3", letterSpacing: 2, textTransform: "uppercase" }}>
            Portfolio
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 32 }}>
          Hi, I&apos;m&nbsp;<span style={{ color: "#915eff" }}>Shereif</span>
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 16, color: "#dfd9ff" }}>
          {`${contact.fullName} · ${contact.title}`}
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 24, color: "#aaa6c3" }}>{contact.headline}</div>
      </div>
    ),
    size
  );
}
