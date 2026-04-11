import type { MetadataRoute } from "next";

import { listPublicPetSlugs } from "@/backend/modules/pets/application/list-public-pet-slugs";
import { PUBLIC_ROUTES, SEO } from "@/constants";
import { featureFlags } from "@/shared/config/feature-flags";

const STATIC_ROUTES: readonly string[] = [
  PUBLIC_ROUTES.home,
  ...(featureFlags.routes.adoption ? [PUBLIC_ROUTES.adoption] : []),
  ...(featureFlags.routes.shelter ? [PUBLIC_ROUTES.shelter] : []),
  ...(featureFlags.routes.donate ? [PUBLIC_ROUTES.donate] : []),
  ...(featureFlags.routes.bazaar ? [PUBLIC_ROUTES.bazaar] : []),
  ...(featureFlags.routes.about ? [PUBLIC_ROUTES.about] : []),
  ...(featureFlags.routes.contact ? [PUBLIC_ROUTES.contact] : []),
  ...(featureFlags.routes.transparency ? [PUBLIC_ROUTES.transparency] : []),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SEO.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === PUBLIC_ROUTES.home ? "daily" : "weekly",
    priority: path === PUBLIC_ROUTES.home ? 1 : 0.8,
  }));

  const petEntries: MetadataRoute.Sitemap = featureFlags.routes.adoption
    ? (await listPublicPetSlugs()).map((pet) => ({
        url: `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}/${pet.slug}`,
        lastModified: pet.updatedAt,
        changeFrequency: "daily",
        priority: 0.7,
      }))
    : [];

  return [...staticEntries, ...petEntries];
}
