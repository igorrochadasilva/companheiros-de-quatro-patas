import { PetGender, PetSize, PetSpecies, PetStatus } from "@prisma/client";

import type { CreatePetInput } from "@/backend/modules/pets/schemas/pet.schema";

type RowFieldError = {
  field: string;
  message: string;
};

const TRUE_VALUES = new Set(["true", "1", "yes", "y", "sim", "s"]);
const FALSE_VALUES = new Set(["false", "0", "no", "n", "nao", "não"]);

const SPECIES_MAP: Record<string, PetSpecies> = {
  DOG: PetSpecies.DOG,
  CACHORRO: PetSpecies.DOG,
  CAT: PetSpecies.CAT,
  GATO: PetSpecies.CAT,
  OTHER: PetSpecies.OTHER,
  OUTRO: PetSpecies.OTHER,
};

const SIZE_MAP: Record<string, PetSize> = {
  SMALL: PetSize.SMALL,
  PEQUENO: PetSize.SMALL,
  MEDIUM: PetSize.MEDIUM,
  MEDIO: PetSize.MEDIUM,
  MÉDIO: PetSize.MEDIUM,
  LARGE: PetSize.LARGE,
  GRANDE: PetSize.LARGE,
};

const GENDER_MAP: Record<string, PetGender> = {
  MALE: PetGender.MALE,
  MACHO: PetGender.MALE,
  FEMALE: PetGender.FEMALE,
  FEMEA: PetGender.FEMALE,
  FÊMEA: PetGender.FEMALE,
  UNKNOWN: PetGender.UNKNOWN,
  NAO_INFORMADO: PetGender.UNKNOWN,
  NÃO_INFORMADO: PetGender.UNKNOWN,
};

const STATUS_MAP: Record<string, PetStatus> = {
  AVAILABLE: PetStatus.AVAILABLE,
  DISPONIVEL: PetStatus.AVAILABLE,
  DISPONÍVEL: PetStatus.AVAILABLE,
  RESERVED: PetStatus.RESERVED,
  RESERVADO: PetStatus.RESERVED,
  ADOPTED: PetStatus.ADOPTED,
  ADOTADO: PetStatus.ADOPTED,
  TREATMENT: PetStatus.TREATMENT,
  TRATAMENTO: PetStatus.TREATMENT,
};

function valueToString(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replace(/\s+/g, "_");
}

function getRowValue(row: Record<string, unknown>, keys: string[]) {
  for (const [rawKey, value] of Object.entries(row)) {
    const key = normalizeHeader(rawKey);
    if (keys.includes(key)) {
      return value;
    }
  }
  return undefined;
}

function parseEnum<T>(
  label: string,
  raw: unknown,
  map: Record<string, T>,
  errors: RowFieldError[],
) {
  const value = valueToString(raw);
  if (!value) return undefined;

  const normalized = value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");

  const mapped = map[normalized];
  if (!mapped) {
    errors.push({
      field: label,
      message: `Valor invalido para ${label}: "${value}"`,
    });
    return undefined;
  }
  return mapped;
}

function parseBoolean(label: string, raw: unknown, errors: RowFieldError[]) {
  const value = valueToString(raw);
  if (!value) return undefined;

  const normalized = value.toLowerCase();
  if (TRUE_VALUES.has(normalized)) return true;
  if (FALSE_VALUES.has(normalized)) return false;

  errors.push({
    field: label,
    message: `Valor booleano invalido para ${label}: "${value}"`,
  });
  return undefined;
}

function toOptionalString(value: unknown) {
  const text = valueToString(value);
  return text || undefined;
}

export function normalizePetImportRow(row: Record<string, unknown>) {
  const errors: RowFieldError[] = [];

  const name = toOptionalString(getRowValue(row, ["name"]));
  if (!name) {
    errors.push({ field: "name", message: "Campo obrigatorio ausente: name" });
  }

  const species = parseEnum(
    "species",
    getRowValue(row, ["species"]),
    SPECIES_MAP,
    errors,
  );

  const size = parseEnum("size", getRowValue(row, ["size"]), SIZE_MAP, errors);
  const gender = parseEnum(
    "gender",
    getRowValue(row, ["gender"]),
    GENDER_MAP,
    errors,
  );
  const status = parseEnum(
    "status",
    getRowValue(row, ["status"]),
    STATUS_MAP,
    errors,
  );

  const castrated = parseBoolean(
    "castrated",
    getRowValue(row, ["castrated"]),
    errors,
  );
  const vaccinated = parseBoolean(
    "vaccinated",
    getRowValue(row, ["vaccinated"]),
    errors,
  );
  const featured = parseBoolean(
    "featured",
    getRowValue(row, ["featured"]),
    errors,
  );
  const published = parseBoolean(
    "published",
    getRowValue(row, ["published"]),
    errors,
  );

  const normalized: CreatePetInput = {
    externalId: toOptionalString(
      getRowValue(row, ["external_id", "externalid"]),
    ),
    name: name ?? "",
    species: species ?? PetSpecies.DOG,
    breed: toOptionalString(getRowValue(row, ["breed", "raca"])),
    age: toOptionalString(getRowValue(row, ["age", "idade"])),
    size,
    gender,
    color: toOptionalString(getRowValue(row, ["color", "cor"])),
    castrated,
    vaccinated,
    description: toOptionalString(
      getRowValue(row, ["description", "descricao"]),
    ),
    status,
    city: toOptionalString(getRowValue(row, ["city", "cidade"])),
    state: toOptionalString(getRowValue(row, ["state", "uf"])),
    featured,
    published,
  };

  return {
    data: normalized,
    errors,
  };
}

export const PET_IMPORT_TEMPLATE_HEADERS = [
  "external_id",
  "name",
  "species",
  "breed",
  "age",
  "size",
  "gender",
  "color",
  "castrated",
  "vaccinated",
  "description",
  "status",
  "city",
  "state",
  "featured",
  "published",
] as const;
