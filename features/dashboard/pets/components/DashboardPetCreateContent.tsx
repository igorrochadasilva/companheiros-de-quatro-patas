import Link from "next/link";

import { ADMIN_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { H3, Muted } from "@/shared/ui/typography";

import { DashboardPetUpsertForm } from "./DashboardPetUpsertForm";

const dashboardMessages = messages.dashboard;

export function DashboardPetCreateContent() {
  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <H3 className="text-2xl">{dashboardMessages.petEdit.createTitle}</H3>
        <Muted>{dashboardMessages.petEdit.createSubtitle}</Muted>
      </header>

      <DashboardPetUpsertForm mode="create" />

      <Button variant="outline" asChild>
        <Link href={ADMIN_ROUTES.pets}>
          {dashboardMessages.petEdit.backToPets}
        </Link>
      </Button>
    </section>
  );
}
