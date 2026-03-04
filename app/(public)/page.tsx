import { Suspense } from "react";

import { HomeHero } from "./_components/HomeHero";
import { HomeSectionHowAdoptionWorks } from "./_components/HomeSectionHowAdoptionWorks";
import { HomeSectionPets } from "./_components/HomeSectionPets";
import { HomeSectionPetsSkeleton } from "./_components/HomeSectionPetsSkeleton";

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
      <div id="doar" className="scroll-mt-24" aria-hidden />
    </>
  );
}
