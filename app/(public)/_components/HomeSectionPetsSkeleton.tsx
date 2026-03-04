"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

const CARD_COUNT = 6;

export function HomeSectionPetsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <CardHeader>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="flex gap-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
