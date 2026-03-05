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

export function Home() {
  return (
    <>
      <HomeHero />
      <Suspense fallback={<HomeSectionPetsSkeleton />}>
        <HomeSectionPets />
      </Suspense>
      <div className="mt-16">
        <HomeSectionHowAdoptionWorks />
      </div>
      <div className="mt-16">
        <HomeSectionDonationPix />
      </div>
      <div className="mt-16">
        <HomeSectionTransparency />
      </div>
      <div className="mt-16">
        <HomeSectionBazaar />
      </div>
      <div className="mt-16">
        <HomeSectionStories />
      </div>
      <div className="mt-16">
        <HomeSectionFaq />
      </div>
    </>
  );
}
