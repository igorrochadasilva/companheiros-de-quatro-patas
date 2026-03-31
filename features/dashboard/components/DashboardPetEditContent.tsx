import Link from "next/link";

import { ADMIN_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { H3, Muted } from "@/shared/ui/typography";

const dashboardMessages = messages.dashboard;

type DashboardPetEditContentProps = {
  id: string;
};

export function DashboardPetEditContent({ id }: DashboardPetEditContentProps) {
  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <H3 className="text-2xl">{dashboardMessages.petEdit.title}</H3>
        <Muted>
          {dashboardMessages.petEdit.subtitle}{" "}
          <span className="font-medium">{id}</span>.
        </Muted>
      </header>

      <Button variant="outline" asChild>
        <Link href={ADMIN_ROUTES.pets}>
          {dashboardMessages.petEdit.backToPets}
        </Link>
      </Button>
    </section>
  );
}
