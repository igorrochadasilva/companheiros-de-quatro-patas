import { ImageResponse } from "next/og";

export const alt = "Companheiros de Quatro Patas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #f8efe6 0%, #fff5dc 45%, #e6f7f7 100%)",
        padding: "64px 72px",
        color: "#2f2a26",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          fontWeight: 700,
          color: "#0b6f6e",
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "999px",
            backgroundColor: "#f3af3d",
            display: "inline-flex",
          }}
        />
        Companheiros de Quatro Patas
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.04,
            fontWeight: 800,
            letterSpacing: -1.5,
            maxWidth: 960,
          }}
        >
          Adocao responsavel,
          <br />
          cuidado que transforma vidas.
        </div>
        <div style={{ fontSize: 32, color: "#514535", maxWidth: 900 }}>
          Conheca pets para adocao, acompanhe o abrigo e apoie a ONG.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#514535",
        }}
      >
        <span>companheirosdequatropatas.org</span>
        <span style={{ color: "#f3af3d", fontWeight: 700 }}>
          #AdocaoResponsavel
        </span>
      </div>
    </div>,
    size,
  );
}
