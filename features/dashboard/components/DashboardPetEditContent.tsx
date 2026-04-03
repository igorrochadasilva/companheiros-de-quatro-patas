import Link from "next/link";

import { getPetById } from "@/backend/modules/pets/application/get-pet-by-id";
import { ADMIN_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { H3, Muted } from "@/shared/ui/typography";

import { DashboardPetEditForm } from "./DashboardPetEditForm";

const dashboardMessages = messages.dashboard;

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

      <DashboardPetEditForm
        pet={{
          id: pet.id,
          name: pet.name,
          status: pet.status,
          description: pet.description,
          published: pet.published,
          featured: pet.featured,
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
