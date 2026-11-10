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
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          borderRadius: 8,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          position: "relative",
        }}
      >
        {/* Subtle circuit dot in top-right */}
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#10b981", // Emerald hardware pulse
          }}
        />

        {/* M monogram styled with technical precision */}
        <span
          style={{
            color: "#f4f4f5",
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "monospace",
            letterSpacing: -1,
            marginTop: -1,
          }}
        >
          M
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
