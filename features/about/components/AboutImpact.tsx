import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";
import type { Stats } from "@/types";

const aboutMessages = messages.about;

interface AboutImpactProps {
  stats?: Stats;
  isLoading: boolean;
}

export function AboutImpact({ stats, isLoading }: AboutImpactProps) {
  return (
    <section id="impacto" className="scroll-mt-24 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <H2>{aboutMessages.impact.title}</H2>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.transparency}>
            {aboutMessages.impact.transparencyCta}
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div
          className="grid gap-3 sm:grid-cols-3"
          aria-label={aboutMessages.impact.loadingAria}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-2 p-5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-7 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent className="space-y-2 p-5">
              <Muted>{aboutMessages.impact.adopted}</Muted>
              <p className="text-2xl font-bold text-primary">
                {stats?.adoptedCount.toLocaleString("pt-BR") ?? "-"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 p-5">
              <Muted>{aboutMessages.impact.inTreatment}</Muted>
              <p className="text-2xl font-bold text-primary">
                {stats?.inTreatmentCount.toLocaleString("pt-BR") ?? "-"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 p-5">
              <Muted>{aboutMessages.impact.rescued}</Muted>
              <p className="text-2xl font-bold text-primary">
                {stats?.rescuedCount.toLocaleString("pt-BR") ?? "-"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
