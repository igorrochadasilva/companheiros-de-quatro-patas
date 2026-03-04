import { Suspense } from "react";

import { HomeHero } from "./_components/HomeHero";
import { HomeSectionPets } from "./_components/HomeSectionPets";
import { HomeSectionPetsSkeleton } from "./_components/HomeSectionPetsSkeleton";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Suspense fallback={<HomeSectionPetsSkeleton />}>
        <HomeSectionPets />
      </Suspense>
      <div id="doar" className="scroll-mt-24" aria-hidden />
    </>
  );
}
