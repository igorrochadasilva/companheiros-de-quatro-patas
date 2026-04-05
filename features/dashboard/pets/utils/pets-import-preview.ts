import type { PetImportPreviewRow } from "@/types";

const REQUIRED_FIELDS = ["name", "species"] as const;
const BOOLEAN_FIELDS = [
  "castrated",
  "vaccinated",
  "featured",
  "published",
] as const;

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

function readField(row: Record<string, unknown>, field: string) {
  for (const [key, value] of Object.entries(row)) {
    if (normalizeHeader(key) === field) return value;
  }
  return undefined;
}

function valueToString(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function isBooleanLike(value: string) {
  if (!value) return true;
  const normalized = value.toLowerCase();
  return ["true", "false", "1", "0", "yes", "no", "sim", "nao", "não"].includes(
    normalized,
  );
}

export function buildPetsImportPreview(
  rows: Record<string, unknown>[],
): PetImportPreviewRow[] {
  return rows.map((row, index) => {
    const errors: string[] = [];

    for (const field of REQUIRED_FIELDS) {
      const value = valueToString(readField(row, field));
      if (!value) {
        errors.push(`Campo obrigatorio ausente: ${field}`);
      }
    }

    for (const field of BOOLEAN_FIELDS) {
      const value = valueToString(readField(row, field));
      if (!isBooleanLike(value)) {
        errors.push(`Valor invalido para ${field}: "${value}"`);
      }
    }

    return {
      row: index + 2,
      data: row,
      valid: errors.length === 0,
      errors,
    };
  });
}
