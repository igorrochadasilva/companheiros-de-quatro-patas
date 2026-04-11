import { Suspense } from "react";

import { HomeHero } from "@/features/home/components/HomeHero";
import { HomeSectionBazaar } from "@/features/home/components/HomeSectionBazaar";
import { HomeSectionDonationPix } from "@/features/home/components/HomeSectionDonationPix";
import { HomeSectionFaq } from "@/features/home/components/HomeSectionFaq";
import { HomeSectionHowAdoptionWorks } from "@/features/home/components/HomeSectionHowAdoptionWorks";
import { HomeSectionPets } from "@/features/home/components/HomeSectionPets";
import { HomeSectionPetsSkeleton } from "@/features/home/components/HomeSectionPetsSkeleton";
import { HomeSectionStories } from "@/features/home/components/HomeSectionStories";
import { HomeSectionTransparency } from "@/features/home/components/HomeSectionTransparency";
import { featureFlags } from "@/shared/config/feature-flags";

export function Home() {
  return (
    <>
      {featureFlags.home.hero ? <HomeHero /> : null}
      {featureFlags.home.pets ? (
        <Suspense fallback={<HomeSectionPetsSkeleton />}>
          <HomeSectionPets />
        </Suspense>
      ) : null}
      {featureFlags.home.adoptionHow ? (
        <div className="mt-16">
          <HomeSectionHowAdoptionWorks />
        </div>
      ) : null}
      {featureFlags.home.donationPix ? (
        <div className="mt-16">
          <HomeSectionDonationPix />
        </div>
      ) : null}
      {featureFlags.home.transparency ? (
        <div className="mt-16">
          <HomeSectionTransparency />
        </div>
      ) : null}
      {featureFlags.home.bazaar ? (
        <div className="mt-16">
          <HomeSectionBazaar />
        </div>
      ) : null}
      {featureFlags.home.stories ? (
        <div className="mt-16">
          <HomeSectionStories />
        </div>
      ) : null}
      {featureFlags.home.faq ? (
        <div className="mt-16">
          <HomeSectionFaq />
        </div>
      ) : null}
    </>
  );
}
