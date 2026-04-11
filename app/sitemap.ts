import type { MetadataRoute } from "next";

import { listPublicPetSlugs } from "@/backend/modules/pets/application/list-public-pet-slugs";
import { PUBLIC_ROUTES, SEO } from "@/constants";

const STATIC_ROUTES = [
  PUBLIC_ROUTES.home,
  PUBLIC_ROUTES.adoption,
  PUBLIC_ROUTES.shelter,
  PUBLIC_ROUTES.donate,
  PUBLIC_ROUTES.bazaar,
  PUBLIC_ROUTES.about,
  PUBLIC_ROUTES.contact,
  PUBLIC_ROUTES.transparency,
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SEO.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === PUBLIC_ROUTES.home ? "daily" : "weekly",
    priority: path === PUBLIC_ROUTES.home ? 1 : 0.8,
  }));

  const petSlugs = await listPublicPetSlugs();
  const petEntries: MetadataRoute.Sitemap = petSlugs.map((pet) => ({
    url: `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}/${pet.slug}`,
    lastModified: pet.updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticEntries, ...petEntries];
}
