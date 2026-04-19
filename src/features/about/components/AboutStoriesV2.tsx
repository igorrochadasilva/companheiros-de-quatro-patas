"use client";

import { aboutMessages } from "@/messages";
import type { AboutCmsContent } from "@/types";

export function AboutStoriesV2({ cms }: { cms?: AboutCmsContent }) {
  const stories = aboutMessages.v2.stories.items.map((story, index) => ({
    ...story,
    imageUrl: cms?.storiesImages?.[index] ?? story.imageUrl,
  }));

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <h2 className="text-5xl font-bold leading-none [font-family:var(--font-v2-headline)]">
        {aboutMessages.v2.stories.title}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {stories.map((story) => (
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
          </article>
        ))}
      </div>
    </section>
  );
}
