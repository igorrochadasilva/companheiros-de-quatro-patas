import { Suspense } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { HomeHeroV2 } from "@/features/home/components/HomeHeroV2";
import { HomeSectionBazaarV2 } from "@/features/home/components/HomeSectionBazaarV2";
import { HomeSectionDonationPixV2 } from "@/features/home/components/HomeSectionDonationPixV2";
import { HomeSectionFaqV2 } from "@/features/home/components/HomeSectionFaqV2";
import { HomeSectionHowAdoptionWorksV2 } from "@/features/home/components/HomeSectionHowAdoptionWorksV2";
import { HomeSectionPetsSkeleton } from "@/features/home/components/HomeSectionPetsSkeleton";
import { HomeSectionPetsV2 } from "@/features/home/components/HomeSectionPetsV2";
import { HomeSectionStoriesV2 } from "@/features/home/components/HomeSectionStoriesV2";
import { HomeSectionTransparencyV2 } from "@/features/home/components/HomeSectionTransparencyV2";
import { featureFlags } from "@/shared/config/feature-flags";

export function HomeV2() {
  const primaryCtaHref = featureFlags.home.pets
    ? "/#animais"
    : featureFlags.routes.adoption
      ? PUBLIC_ROUTES.adoption
      : null;

  const secondaryCtaHref = featureFlags.home.donationPix
    ? "/#doar"
    : featureFlags.routes.donate
      ? PUBLIC_ROUTES.donate
      : null;

  return (
    <>
      <HomeHeroV2
        primaryCtaHref={primaryCtaHref}
        secondaryCtaHref={secondaryCtaHref}
      />
      {featureFlags.home.pets ? (
        <Suspense fallback={<HomeSectionPetsSkeleton />}>
          <HomeSectionPetsV2 />
        </Suspense>
      ) : null}
      {featureFlags.home.adoptionHow ? <HomeSectionHowAdoptionWorksV2 /> : null}
      {featureFlags.home.donationPix ? <HomeSectionDonationPixV2 /> : null}
      {featureFlags.home.transparency ? <HomeSectionTransparencyV2 /> : null}
      {featureFlags.home.bazaar ? <HomeSectionBazaarV2 /> : null}
      {featureFlags.home.stories ? <HomeSectionStoriesV2 /> : null}
      {featureFlags.home.faq ? <HomeSectionFaqV2 /> : null}
    </>
  );
}
