export type PetImportErrorItem = {
  row: number;
  field?: string;
  message: string;
};

export type PetImportDuplicateItem = {
  row: number;
  reason: string;
  externalId?: string;
  name?: string;
};

export type PetImportResponse = {
  inserted: number;
  ignored: number;
  duplicates: PetImportDuplicateItem[];
  errors: PetImportErrorItem[];
};

export type PetImportRequest = {
  items: Record<string, unknown>[];
};

export type PetImportPreviewRow = {
  row: number;
  data: Record<string, unknown>;
  valid: boolean;
  errors: string[];
};
