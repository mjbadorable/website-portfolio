import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

const HEADLINE =
  "Computer Engineer building software, intelligent systems, and meaningful digital experiences.";

export const alt = `${profile.name}: ${HEADLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PILLS = [
  "[ MS CpE Candidate · Mapúa ]",
  "[ Full-Stack & AI Automations ]",
  "[ Iloilo, Philippines ]",
];

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
          background: "#09090b",
          borderLeft: "16px solid #3f3f46",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#a1a1aa",
          }}
        >
          MARVIN JHAY ADORABLE
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#fafafa",
            maxWidth: 1040,
          }}
        >
          {HEADLINE}
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {PILLS.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                height: 52,
                padding: "0 22px",
                border: "2px solid #3f3f46",
                borderRadius: 10,
                fontSize: 22,
                whiteSpace: "nowrap",
                color: "#d4d4d8",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
