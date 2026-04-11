export type PetSpeciesValue = "DOG" | "CAT" | "OTHER";
export type PetSizeValue = "SMALL" | "MEDIUM" | "LARGE";
export type PetGenderValue = "MALE" | "FEMALE" | "UNKNOWN";
export type PetStatusValue = "AVAILABLE" | "RESERVED" | "ADOPTED" | "TREATMENT";
export type PetMediaTypeValue = "IMAGE" | "VIDEO";

export type PetFormValues = {
  externalId?: string;
  name: string;
  species: PetSpeciesValue;
  breed?: string;
  age?: string;
  size?: PetSizeValue;
  gender?: PetGenderValue;
  color?: string;
  castrated: boolean;
  vaccinated: boolean;
  description?: string;
  status: PetStatusValue;
  city?: string;
  state?: string;
  featured: boolean;
  published: boolean;
};

export type PetAdminRecord = {
  id: string;
  externalId: string | null;
  name: string;
  species: PetSpeciesValue;
  breed: string | null;
  age: string | null;
  size: PetSizeValue | null;
  gender: PetGenderValue | null;
  color: string | null;
  castrated: boolean;
  vaccinated: boolean;
  description: string | null;
  status: PetStatusValue;
  city: string | null;
  state: string | null;
  featured: boolean;
  published: boolean;
  media?: PetMediaAdminRecord[];
};

export type PetMediaAdminRecord = {
  id: string;
  petId: string;
  type: PetMediaTypeValue;
  url: string;
  publicId: string | null;
  isMain: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type UpsertPetResponse = {
  id: string;
};

export type DeletePetResponse = {
  ok: boolean;
};

export type CloudinarySignResponse = {
  apiKey: string;
  cloudName: string;
  folder: string;
  resourceType: "auto";
  signature: string;
  timestamp: number;
};
