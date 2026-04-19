export type AboutCmsContent = {
  entryId: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  storiesImages: string[] | null;
};

export function emptyAboutCmsContent(): AboutCmsContent {
  return {
    entryId: null,
    heroImageUrl: null,
    heroImageAlt: null,
    storiesImages: null,
  };
}
