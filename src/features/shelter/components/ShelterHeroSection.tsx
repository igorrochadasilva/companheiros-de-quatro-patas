import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import { H1, Lead, Muted } from "@/shared/ui/typography";

import { formatCurrency } from "./shelter.utils";

interface ShelterHeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  progressHint: string;
  progressAriaLabel: string;
  goalLabel: string;
  raisedLabel: string;
  remainingLabel: string;
  goalAmount: number;
  raisedAmount: number;
  remainingAmount: number;
  percentComplete: number;
}

export function ShelterHeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  progressHint,
  progressAriaLabel,
  goalLabel,
  raisedLabel,
  remainingLabel,
  goalAmount,
  raisedAmount,
  remainingAmount,
  percentComplete,
}: ShelterHeroSectionProps) {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <H1>{title}</H1>
        <Lead>{subtitle}</Lead>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="primary">
            <a
              href="#doar"
              onClick={() =>
                track("donate_click", { location: "shelter_hero" })
              }
            >
              {ctaPrimary}
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#etapas">{ctaSecondary}</a>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-end justify-between gap-4">
            <p className="text-4xl font-extrabold text-primary tabular-nums sm:text-5xl">
              {percentComplete}%
            </p>
            <Muted>{progressHint}</Muted>
          </div>
          <Progress value={percentComplete} aria-label={progressAriaLabel} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="space-y-1 p-4">
            <p className="text-2xl font-bold text-primary tabular-nums">
              {formatCurrency(goalAmount)}
            </p>
            <Muted>{goalLabel}</Muted>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1 p-4">
            <p className="text-2xl font-bold text-primary tabular-nums">
              {formatCurrency(raisedAmount)}
            </p>
            <Muted>{raisedLabel}</Muted>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1 p-4">
            <p className="text-2xl font-bold text-primary tabular-nums">
              {formatCurrency(remainingAmount)}
            </p>
            <Muted>{remainingLabel}</Muted>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
