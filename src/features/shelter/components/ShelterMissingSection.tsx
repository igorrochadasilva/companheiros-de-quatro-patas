import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";
import type { ShelterMilestone } from "@/types";

import { formatCurrency } from "./shelter.utils";

interface ShelterMissingSectionProps {
  title: string;
  cta: string;
  missingStepsLabel: string;
  remainingEstimateLabel: string;
  milestones: ShelterMilestone[];
}

export function ShelterMissingSection({
  title,
  cta,
  missingStepsLabel,
  remainingEstimateLabel,
  milestones,
}: ShelterMissingSectionProps) {
  const missingMilestones = milestones.filter(
    (item) => item.status === "pending" || item.status === "in_progress",
  );

  const missingEstimate = missingMilestones.reduce((acc, current) => {
    return (
      acc + Math.max(0, (current.costPlanned ?? 0) - (current.costSpent ?? 0))
    );
  }, 0);

  return (
    <section id="falta" className="scroll-mt-24 space-y-4">
      <H2>{title}</H2>
      <Card>
        <CardHeader>
          <CardTitle>
            {missingStepsLabel.replace(
              "{count}",
              String(missingMilestones.length),
            )}
          </CardTitle>
          <Muted>
            {remainingEstimateLabel}: {formatCurrency(missingEstimate)}
          </Muted>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {missingMilestones.map((milestone) => (
              <li key={milestone.id}>- {milestone.title}</li>
            ))}
          </ul>
          <Button asChild variant="secondary">
            <Link href={`${PUBLIC_ROUTES.contact}?assunto=parceria`}>
              {cta}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
