import Link from "next/link";

import { ADMIN_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H3, Muted } from "@/shared/ui/typography";

const dashboardMessages = messages.dashboard;

const quickActions = [
  {
    title: dashboardMessages.home.quickActions.managePets.title,
    description: dashboardMessages.home.quickActions.managePets.description,
    href: ADMIN_ROUTES.pets,
    cta: dashboardMessages.home.quickActions.managePets.cta,
  },
  {
    title: dashboardMessages.home.quickActions.importPets.title,
    description: dashboardMessages.home.quickActions.importPets.description,
    href: ADMIN_ROUTES.petsImport,
    cta: dashboardMessages.home.quickActions.importPets.cta,
  },
] as const;

export function DashboardHomeContent() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <H3 className="text-2xl">{dashboardMessages.home.title}</H3>
        <Muted>{dashboardMessages.home.subtitle}</Muted>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {quickActions.map((action) => (
          <Card key={action.href}>
            <CardHeader className="space-y-2">
              <CardTitle>{action.title}</CardTitle>
              <Muted>{action.description}</Muted>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={action.href}>{action.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
