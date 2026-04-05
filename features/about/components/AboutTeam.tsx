import Link from "next/link";

import { CONTACT_SUBJECT_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";

export function AboutTeam() {
  return (
    <section id="time" className="scroll-mt-24 space-y-4">
      <H2>{aboutMessages.team.title}</H2>
      <Muted className="text-base">{aboutMessages.team.subtitle}</Muted>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {aboutMessages.team.roles.map((role) => (
          <Card key={role.title}>
            <CardHeader>
              <CardTitle className="text-lg">{role.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Muted>{role.description}</Muted>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={CONTACT_SUBJECT_ROUTES.volunteer}>
            {aboutMessages.team.cta}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={CONTACT_SUBJECT_ROUTES.foster}>
            {aboutMessages.team.fosterCta}
          </Link>
        </Button>
      </div>
    </section>
  );
}
