import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";
import type { ShelterUpdate } from "@/types";

import { formatDate } from "./shelter.utils";

interface ShelterUpdatesSectionProps {
  title: string;
  cta: string;
  updates: ShelterUpdate[];
}

export function ShelterUpdatesSection({
  title,
  cta,
  updates,
}: ShelterUpdatesSectionProps) {
  const highlightUpdates = updates.slice(0, 3);

  if (!highlightUpdates.length) return null;

  return (
    <section id="updates" className="scroll-mt-24 space-y-4">
      <H2>{title}</H2>
      <div className="grid gap-4 lg:grid-cols-3">
        {highlightUpdates.map((update) => (
          <Card key={update.id}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg">{update.title}</CardTitle>
              <Muted>{formatDate(update.date)}</Muted>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{update.text}</p>
              <div className="grid grid-cols-2 gap-2">
                {update.images.slice(0, 2).map((image) => (
                  <div
                    key={image.url}
                    className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link
        href="#updates"
        className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {cta}
      </Link>
    </section>
  );
}
