import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "Dandere — Track every voice event in your Discord server";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoData = fs.readFileSync(
    path.join(process.cwd(), "public/logo_square.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.2) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
            padding: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              width={100}
              height={100}
              style={{ borderRadius: "22px" }}
              alt=""
            />
            <div
              style={{
                fontSize: "88px",
                fontWeight: "800",
                color: "#f4f4f5",
                letterSpacing: "-4px",
                lineHeight: 1,
              }}
            >
              Dandere
            </div>
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: "720px",
              lineHeight: 1.4,
            }}
          >
            Track every voice event in your Discord server
          </div>
          <div
            style={{
              marginTop: "12px",
              background: "#4f46e5",
              color: "#ffffff",
              padding: "16px 44px",
              borderRadius: "10px",
              fontSize: "22px",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Add to Discord
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
