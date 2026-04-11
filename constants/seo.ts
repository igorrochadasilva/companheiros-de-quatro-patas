const DEFAULT_SITE_URL = "https://companheirosdequatropatas.org";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value?.trim()) return DEFAULT_SITE_URL;

  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/+$/, "");
  }

  return `https://${trimmed.replace(/\/+$/, "")}`;
}

export const SEO = {
  siteName: "Companheiros de Quatro Patas",
  siteDescription:
    "ONG de proteção animal com adoção responsável, apoio ao abrigo e transparência nas ações.",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  siteLocale: "pt_BR",
  siteType: "website" as const,
};
