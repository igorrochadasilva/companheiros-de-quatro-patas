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
  title: string | null;
  subtitle: string | null;
  primaryCtaLabel: string | null;
  secondaryCtaLabel: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  entryId: string | null;
  petsTitle: string | null;
  petsSeeAll: string | null;
  petsSeeAllHref: string | null;
  adoptionHowTitle: string | null;
  adoptionHowSubtitle: string | null;
  adoptionHowCta: string | null;
  adoptionHowCtaHref: string | null;
  adoptionHowSteps: HomeCmsAdoptionStep[] | null;
  donationTitle: string | null;
  donationImpactTitle: string | null;
  donationPixLabel: string | null;
  donationPixCopy: string | null;
  donationPixKey: string | null;
  donationSeeMoreWays: string | null;
  donationSeeMoreWaysHref: string | null;
  transparencyTitle: string | null;
  transparencySubtitle: string | null;
  transparencyCta: string | null;
  transparencyCtaHref: string | null;
  bazaarTitle: string | null;
  bazaarSubtitle: string | null;
  bazaarCta: string | null;
  bazaarCtaHref: string | null;
  storiesTitle: string | null;
  storiesSubtitle: string | null;
  storiesCta: string | null;
  storiesCtaHref: string | null;
  impactStories: HomeCmsImpactStory[] | null;
  faqTitle: string | null;
  faqContactLink: string | null;
  faqContactHref: string | null;
  faqItems: HomeCmsFaqItem[] | null;
};

export function emptyHomeCmsContent(): HomeCmsContent {
  return {
    title: null,
    subtitle: null,
    primaryCtaLabel: null,
    secondaryCtaLabel: null,
    heroImageUrl: null,
    heroImageAlt: null,
    entryId: null,
    petsTitle: null,
    petsSeeAll: null,
    petsSeeAllHref: null,
    adoptionHowTitle: null,
    adoptionHowSubtitle: null,
    adoptionHowCta: null,
    adoptionHowCtaHref: null,
    adoptionHowSteps: null,
    donationTitle: null,
    donationImpactTitle: null,
    donationPixLabel: null,
    donationPixCopy: null,
    donationPixKey: null,
    donationSeeMoreWays: null,
    donationSeeMoreWaysHref: null,
    transparencyTitle: null,
    transparencySubtitle: null,
    transparencyCta: null,
    transparencyCtaHref: null,
    bazaarTitle: null,
    bazaarSubtitle: null,
    bazaarCta: null,
    bazaarCtaHref: null,
    storiesTitle: null,
    storiesSubtitle: null,
    storiesCta: null,
    storiesCtaHref: null,
    impactStories: null,
    faqTitle: null,
    faqContactLink: null,
    faqContactHref: null,
    faqItems: null,
  };
}
