import { headers } from "next/headers";
import Link from "next/link";

import { getPublicPetById } from "@/backend/modules/pets/application/get-public-pet-by-id";
import { PUBLIC_ROUTES } from "@/constants";
import { adoptionMessages } from "@/messages";

import { AdocaoPetGallery } from "./AdocaoPetGallery";
import { AdocaoPetDetailDesktopSidebar } from "./pet-detail/AdocaoPetDetailDesktopSidebar";
import { AdocaoPetDetailMobileContent } from "./pet-detail/AdocaoPetDetailMobileContent";
import { AdocaoPetDetailMobileHeader } from "./pet-detail/AdocaoPetDetailMobileHeader";
import { AdocaoPetDetailNotFound } from "./pet-detail/AdocaoPetDetailNotFound";
import { AdocaoPetDetailProcessSection } from "./pet-detail/AdocaoPetDetailProcessSection";
import {
  buildPetWhatsappUrl,
  formatSize,
  formatSpecies,
} from "./pet-detail/pet-detail.utils";

type AdocaoPetDetailContentProps = {
  slug: string;
};

export async function AdocaoPetDetailContent({
  slug,
}: AdocaoPetDetailContentProps) {
  const pet = await getPublicPetById(slug);

  if (!pet) {
    return <AdocaoPetDetailNotFound />;
  }

  const images = pet.media.filter((item) => item.type === "IMAGE");
  const fallback = `https://placehold.co/1200x800.png?text=${encodeURIComponent(
    pet.name,
  )}`;
  const galleryImages =
    images.length > 0 ? images.map((item) => item.url) : [fallback];
  const petPath = `${PUBLIC_ROUTES.adoption}/${pet.externalId ?? pet.id}`;
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const petUrl = host ? `${protocol}://${host}${petPath}` : petPath;
  const whatsappUrl = buildPetWhatsappUrl({
    petId: pet.id,
    petName: pet.name,
    petUrl,
  });

  const sizeLabel = formatSize(pet.size);
  const speciesLabel = formatSpecies(pet.species);
  const description =
    pet.description?.trim() || adoptionMessages.petDetail.noDescription;

  return (
    <section className="v2-section !pt-8 md:!pt-10">
      <div className="v2-container">
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[var(--v2-on-surface-variant)] md:mb-8 md:text-sm md:normal-case md:tracking-normal">
          <Link
            href={PUBLIC_ROUTES.home}
            className="transition-colors hover:text-[var(--v2-primary)]"
          >
            {adoptionMessages.petDetail.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link
            href={PUBLIC_ROUTES.adoption}
            className="transition-colors hover:text-[var(--v2-primary)]"
          >
            {adoptionMessages.petDetail.breadcrumbAdoption}
          </Link>
          <span>/</span>
          <span className="font-bold text-[var(--v2-on-surface)]">{pet.name}</span>
        </nav>

        <AdocaoPetDetailMobileHeader
          name={pet.name}
          breed={pet.breed}
          age={pet.age}
          sizeLabel={sizeLabel}
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <AdocaoPetGallery
              petName={pet.name}
              imageUrls={galleryImages}
              favoriteAriaLabel={adoptionMessages.petDetail.aria.favoritePet}
              selectImageAriaTemplate={adoptionMessages.petDetail.aria.selectImage}
            />

            <AdocaoPetDetailMobileContent
              description={description}
              vaccinated={pet.vaccinated}
              castrated={pet.castrated}
              whatsappUrl={whatsappUrl}
            />
          </div>

          <AdocaoPetDetailDesktopSidebar
            name={pet.name}
            speciesLabel={speciesLabel}
            sizeLabel={sizeLabel}
            city={pet.city}
            ageTag={pet.age?.trim() || null}
            vaccinated={pet.vaccinated}
            castrated={pet.castrated}
            description={description}
            whatsappUrl={whatsappUrl}
          />
        </div>

        <AdocaoPetDetailProcessSection />
      </div>
    </section>
  );
}
