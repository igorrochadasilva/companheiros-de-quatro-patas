export type ContactCmsContent = {
  entryId: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
};

export function emptyContactCmsContent(): ContactCmsContent {
  return {
    entryId: null,
    heroImageUrl: null,
    heroImageAlt: null,
  };
}

