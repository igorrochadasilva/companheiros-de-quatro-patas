import type { RefObject } from "react";

import messages from "@/messages/pt-br.json";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, H3, Muted } from "@/shared/ui/typography";
import type { Story } from "@/types";

const donateMessages = messages.donate;

interface DonatationImpactSectionProps {
  impactRef: RefObject<HTMLElement | null>;
  isStoriesLoading: boolean;
  highlightStories: Story[];
}

export function DonatationImpactSection({
  impactRef,
  isStoriesLoading,
  highlightStories,
}: DonatationImpactSectionProps) {
  return (
    <section ref={impactRef} className="space-y-4">
      <H2>{donateMessages.impact.title}</H2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {donateMessages.impact.cards.map((card) => (
          <Card key={card.title}>
            <CardContent className="space-y-2 p-5">
              <p className="font-semibold text-primary">{card.title}</p>
              <Muted>{card.description}</Muted>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <H3>{donateMessages.impact.storiesTitle}</H3>
        {isStoriesLoading ? (
          <div className="grid gap-3 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="space-y-2 p-5">
                  <Skeleton className="h-5 w-44 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : highlightStories.length === 0 ? (
          <Muted>{donateMessages.impact.storiesEmpty}</Muted>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {highlightStories.map((story) => (
              <Card key={story.id}>
                <CardContent className="space-y-2 p-5">
                  <p className="font-semibold">{story.title}</p>
                  <Muted>{story.summary}</Muted>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
