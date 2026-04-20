"use client";

import { aboutMessages } from "@/messages";
import { Typography } from "@/shared/ui/typography";
import type { AboutCmsContent } from "@/types";

export function AboutStoriesV2({ cms }: { cms?: AboutCmsContent }) {
  const stories = aboutMessages.v2.stories.items.map((story, index) => ({
    ...story,
    imageUrl: cms?.storiesImages?.[index] ?? story.imageUrl,
  }));

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <Typography
        as="h2"
        variant="v2H2"
        className="!text-[2.2rem] leading-none md:!text-5xl"
      >
        {aboutMessages.v2.stories.title}
      </Typography>
      <div className="mt-7 grid gap-8 md:mt-8 md:grid-cols-3 md:gap-6">
        {stories.map((story) => (
          <article
            key={story.title}
            className="rounded-3xl border border-[#d5c4af]/10 bg-white p-0 shadow-sm md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none"
          >
            <div className="overflow-hidden rounded-3xl bg-[#ebe1da] shadow-sm md:rounded-xl md:shadow-sm">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="h-56 w-full object-cover md:aspect-square md:h-auto"
              />
            </div>
            <div className="p-6 md:p-0">
              <Typography
                as="h3"
                variant="v2H2"
                className="!text-[1.4rem] leading-tight md:mt-4 md:!text-3xl"
              >
                {story.title}
              </Typography>
              <Typography
                as="p"
                variant="v2Muted"
                className="mt-2 leading-relaxed !text-[#514535] md:leading-6"
              >
                {story.summary}
              </Typography>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
