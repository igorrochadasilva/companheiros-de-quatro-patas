"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";

export function AboutStoriesV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <h2 className="text-5xl font-bold leading-none [font-family:var(--font-v2-headline)]">
        {aboutMessages.v2.stories.title}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {aboutMessages.v2.stories.items.map((story) => (
          <article key={story.title}>
            <div className="overflow-hidden rounded-xl bg-[#ebe1da] shadow-sm">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="aspect-square w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-3xl font-bold [font-family:var(--font-v2-headline)]">
              {story.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#514535]">
              {story.summary}
            </p>
            <Button
              variant="link"
              className="mt-1 h-auto p-0 text-[#f3af3d]"
              asChild
            >
              <Link href={PUBLIC_ROUTES.adoption}>
                {aboutMessages.v2.stories.readMore}
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
