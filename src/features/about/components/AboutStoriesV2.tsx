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
      <h2 className="text-[2.2rem] font-bold leading-none md:text-5xl [font-family:var(--font-v2-headline)]">
        {aboutMessages.v2.stories.title}
      </h2>
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
              <h3 className="text-[1.4rem] font-bold leading-tight md:mt-4 md:text-3xl [font-family:var(--font-v2-headline)]">
                {story.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#514535] md:leading-6">
                {story.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
