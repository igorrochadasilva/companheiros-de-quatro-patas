export type PetSpecies = "dog" | "cat" | "other";

export type PetSize = "small" | "medium" | "large";

export type PetAgeGroup = "puppy" | "adult" | "senior";

export type PetTag = "vaccinated" | "neutered" | "urgent";

export type Pet = {
  id: string;
  name: string;
  species: PetSpecies;
  size: PetSize;
  ageYears: number;
  ageGroup: PetAgeGroup;
  city: string;
  state: string;
  imageUrl: string;
  descriptionShort: string;
  tags: PetTag[];
};

export type PetFilters = {
  species?: PetSpecies;
  size?: PetSize;
  ageGroup?: PetAgeGroup;
  city?: string;
  urgentOnly?: boolean;
};

export const PET_SORT_VALUES = [
  "recent",
  "urgent",
  "age_asc",
  "age_desc",
  "name_asc",
] as const;
export type PetSort = (typeof PET_SORT_VALUES)[number];

export type Stats = {
  adoptedCount: number;
  inTreatmentCount: number;
  rescuedCount: number;
  lastUpdatedAt: string;
};

export type DonationTier = {
  id: string;
  amount: number;
  label: string;
  description: string;
};

export type DonationConfig = {
  pixKey: string;
  pixQrUrl?: string;
  tiers: DonationTier[];
  whatsapp?: string;
  recurringUrl?: string;
  bankAccount?: string;
};

export type TransparencyExpense = {
  id: string;
  label: string;
  amount: number;
  date: string;
};

export type TransparencySummary = {
  monthLabel: string;
  totalRaised: number;
  totalSpent: number;
  balance: number;
  lastUpdatedAt: string;
  lastExpenses: TransparencyExpense[];
};

export enum BazaarItemStatusEnum {
  AVAILABLE = "available",
  RESERVED = "reserved",
  SOLD = "sold",
}

export type BazaarItemStatus = `${BazaarItemStatusEnum}`;

export type BazaarItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  status: BazaarItemStatus;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export type Story = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
};

export type HomeCmsAdoptionStep = {
  title: string;
  description: string;
};

export type HomeCmsFaqItem = {
  question: string;
  answer: string;
};

export type HomeCmsImpactStory = {
  imageUrl: string;
  title: string;
  text: string;
  family: string;
};

export type HomeCmsContent = {
  entryId: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  adoptionHowSteps: HomeCmsAdoptionStep[] | null;
  donationPixKey: string | null;
  impactStories: HomeCmsImpactStory[] | null;
  faqItems: HomeCmsFaqItem[] | null;
};

export function emptyHomeCmsContent(): HomeCmsContent {
  return {
    entryId: null,
    heroImageUrl: null,
    heroImageAlt: null,
    adoptionHowSteps: null,
    donationPixKey: null,
    impactStories: null,
    faqItems: null,
  };
}
