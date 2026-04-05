import { donateMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H1, Lead, Muted } from "@/shared/ui/typography";

import { formatCurrency } from "./donatation.utils";

interface DonatationHeroSectionProps {
  isStatsLoading: boolean;
  inTreatmentCount?: number;
  totalSpent?: number;
  adoptedCount?: number;
}

export function DonatationHeroSection({
  isStatsLoading,
  inTreatmentCount,
  totalSpent,
  adoptedCount,
}: DonatationHeroSectionProps) {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <H1>{donateMessages.hero.title}</H1>
        <Lead>{donateMessages.hero.subtitle}</Lead>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <a
              href="#pix"
              onClick={() => track("donate_click", { location: "hero" })}
            >
              {donateMessages.hero.primaryCta}
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#transparencia">{donateMessages.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {isStatsLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-8 w-16 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {inTreatmentCount?.toLocaleString("pt-BR") ?? "-"}
                </p>
                <Muted>{donateMessages.hero.metrics.inTreatment}</Muted>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {totalSpent ? formatCurrency(totalSpent) : "-"}
                </p>
                <Muted>{donateMessages.hero.metrics.monthlyCosts}</Muted>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {adoptedCount?.toLocaleString("pt-BR") ?? "-"}
                </p>
                <Muted>{donateMessages.hero.metrics.adopted}</Muted>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </section>
  );
}
