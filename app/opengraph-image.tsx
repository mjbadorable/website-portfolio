import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — AI Systems Builder & Full-Stack Automation Engineer`;
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
          justifyContent: "center",
          padding: "80px",
          background: "#f8fafc",
          borderLeft: "24px solid #2c469a",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#475569" }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#0f172a",
          }}
        >
          {profile.identity}
        </div>
      </div>
    ),
    size,
  );
}
