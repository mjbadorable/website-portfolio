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
          background: "#09090b",
          borderLeft: "24px solid #3f3f46",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#a1a1aa" }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#f4f4f5",
          }}
        >
          {profile.identity}
        </div>
      </div>
    ),
    size,
  );
}
