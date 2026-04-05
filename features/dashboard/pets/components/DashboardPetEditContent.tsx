import Link from "next/link";

import { getPetById } from "@/backend/modules/pets/application/get-pet-by-id";
import { ADMIN_ROUTES } from "@/constants";
import { dashboardMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { H3, Muted } from "@/shared/ui/typography";

import { DashboardPetUpsertForm } from "./DashboardPetUpsertForm";

type DashboardPetEditContentProps = {
  id: string;
};

export async function DashboardPetEditContent({
  id,
}: DashboardPetEditContentProps) {
  const pet = await getPetById(id);

  if (!pet) {
    return (
      <section className="space-y-4">
        <header className="space-y-2">
          <H3 className="text-2xl">{dashboardMessages.petEdit.title}</H3>
          <Muted>{dashboardMessages.petEdit.notFound}</Muted>
        </header>
        <Button variant="outline" asChild>
          <Link href={ADMIN_ROUTES.pets}>
            {dashboardMessages.petEdit.backToPets}
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <H3 className="text-2xl">{dashboardMessages.petEdit.title}</H3>
        <Muted>{dashboardMessages.petEdit.subtitle}</Muted>
      </header>

      <DashboardPetUpsertForm
        mode="edit"
        pet={{
          id: pet.id,
          externalId: pet.externalId,
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          age: pet.age,
          size: pet.size,
          gender: pet.gender,
          color: pet.color,
          castrated: pet.castrated,
          vaccinated: pet.vaccinated,
          status: pet.status,
          description: pet.description,
          city: pet.city,
          state: pet.state,
          published: pet.published,
          featured: pet.featured,
          media: pet.media.map((item) => ({
            id: item.id,
            petId: item.petId,
            type: item.type,
            url: item.url,
            publicId: item.publicId,
            isMain: item.isMain,
            sortOrder: item.sortOrder,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
          })),
        }}
      />

      <Button variant="outline" asChild>
        <Link href={ADMIN_ROUTES.pets}>
          {dashboardMessages.petEdit.backToPets}
        </Link>
      </Button>
    </section>
  );
}
