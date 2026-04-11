import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";
import type { ShelterMilestone } from "@/types";

import { formatCurrency } from "./shelter.utils";

interface ShelterBudgetSectionProps {
  title: string;
  transparencyCta: string;
  plannedLabel: string;
  spentLabel: string;
  milestones: ShelterMilestone[];
}

export function ShelterBudgetSection({
  title,
  transparencyCta,
  plannedLabel,
  spentLabel,
  milestones,
}: ShelterBudgetSectionProps) {
  const items = milestones.slice(0, 5);

  return (
    <section id="resumo" className="scroll-mt-24 space-y-4">
      <H2>{title}</H2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((milestone) => (
          <Card key={milestone.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{milestone.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Muted>
                {plannedLabel}: {formatCurrency(milestone.costPlanned ?? 0)}
              </Muted>
              <Muted>
                {spentLabel}: {formatCurrency(milestone.costSpent ?? 0)}
              </Muted>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link
        className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        href={PUBLIC_ROUTES.transparency}
      >
        {transparencyCta}
      </Link>
    </section>
  );
}
