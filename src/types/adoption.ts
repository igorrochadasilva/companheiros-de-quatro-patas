export type AdoptionCmsContent = {
  adoptionTitle: string | null;
  adoptionSubtitle: string | null;
  entryId: string | null;
};

export function emptyAdoptionCmsContent(): AdoptionCmsContent {
  return {
    adoptionTitle: null,
    adoptionSubtitle: null,
    entryId: null,
  };
}
