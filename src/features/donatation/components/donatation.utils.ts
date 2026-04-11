export type PixCopySource = "pix_card" | "tier";

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}

export function toWhatsappUrl(value: string, text: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const phone = value.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
