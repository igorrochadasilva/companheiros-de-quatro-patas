import { ImageResponse } from "next/og";

export const alt = "Companheiros de Quatro Patas";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(120deg, #46c2c1 0%, #74d6d5 35%, #f6ece5 100%)",
        padding: "56px 72px",
        color: "#2f2a26",
        fontFamily: "Arial, sans-serif",
        gap: 20,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#0b6f6e",
        }}
      >
        Companheiros de Quatro Patas
      </div>
      <div
        style={{
          fontSize: 64,
          lineHeight: 1.08,
          fontWeight: 800,
          letterSpacing: -1.4,
          maxWidth: 980,
        }}
      >
        Encontre seu novo amigo
        <br />e mude duas vidas hoje.
      </div>
      <div style={{ fontSize: 30, color: "#514535", maxWidth: 920 }}>
        Adocao, transparencia e apoio continuo ao abrigo.
      </div>
    </div>,
    size,
  );
}
