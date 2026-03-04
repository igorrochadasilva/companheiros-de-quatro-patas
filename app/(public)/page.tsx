import { Suspense } from "react";

import { HomeHero } from "./_components/HomeHero";
import { HomeSectionDonationPix } from "./_components/HomeSectionDonationPix";
import { HomeSectionHowAdoptionWorks } from "./_components/HomeSectionHowAdoptionWorks";
import { HomeSectionPets } from "./_components/HomeSectionPets";
import { HomeSectionPetsSkeleton } from "./_components/HomeSectionPetsSkeleton";
import { HomeSectionTransparency } from "./_components/HomeSectionTransparency";

export default function HomePage() {
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
    </>
  );
}
