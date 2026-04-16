"use client";

import Image from "next/image";

import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { useStories } from "@/features/home/hooks/useStories";
import { homeMessages } from "@/messages";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Typography } from "@/shared/ui/typography";

type StoryDisplayItem = {
  imageUrl: string;
  title: string;
  text: string;
  family: string;
};

export function HomeSectionStoriesV2() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data: cms, isLoading: isCmsLoading, isError: isCmsError } = useHomeCmsContent();
  const cmsItems = cms?.impactStories ?? [];
  const shouldLoadApiStories = isVisible && cmsItems.length === 0;
  const { data: storiesData, isLoading: isStoriesLoading, isError: isStoriesError } = useStories({
    enabled: shouldLoadApiStories,
  });

  const apiItems: StoryDisplayItem[] = (storiesData?.items ?? []).map((story, index) => ({
    imageUrl: story.imageUrl,
    title: story.title,
    text: story.summary,
    family: homeMessages.stories.v2.bylines[index] ?? "Companheiros",
  }));

  const items: StoryDisplayItem[] = isVisible ? (cmsItems.length > 0 ? cmsItems : apiItems) : [];
  const isLoading = isCmsLoading || isStoriesLoading;
  const isError = isCmsError && isStoriesError;
  const featuredStory = items[0];

  return (
    <section ref={sectionRef} className="v2-section">
      <div className="v2-container">
        <div className="hidden md:block">
          <div className="mb-16 text-center">
            <Typography as="h2" variant="v2H2" align="center" className="mb-4">
              {homeMessages.stories.v2.title}
            </Typography>
            <Typography as="p" variant="v2Muted" align="center">
              {homeMessages.stories.v2.subtitle}
            </Typography>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="space-y-6">
                  <div className="aspect-[3/4] animate-pulse rounded-3xl bg-[var(--v2-surface-container-high)]" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-[var(--v2-surface-container-high)]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[var(--v2-surface-container-high)]" />
                </div>
              ))}
            </div>
          ) : isError || items.length === 0 ? (
            <div className="rounded-2xl bg-[var(--v2-surface-container-lowest)] p-6">
              <Typography as="p" variant="v2Muted">
                {homeMessages.stories.v2.empty}
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {items.slice(0, 3).map((story, index) => (
                <article
                  key={`${story.title}-${story.family}-${index}`}
                  className={[
                    "group relative",
                    index === 1 ? "md:mt-16" : "",
                  ].join(" ")}
                >
                  <div className="mb-6 aspect-[3/4] overflow-hidden rounded-3xl">
                    <Image
                      src={story.imageUrl}
                      alt={story.title}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <Typography
                    as="h3"
                    variant="v2Body"
                    className="v2-font-headline mb-2 text-xl !font-bold"
                  >
                    {story.title}
                  </Typography>
                  <Typography as="p" variant="v2Muted" className="italic">
                    "{story.text}"
                  </Typography>
                  <Typography
                    as="p"
                    variant="v2Body"
                    className="mt-4 text-xs !font-bold text-[var(--v2-secondary)]"
                  >
                    {homeMessages.stories.v2.bylinePrefix} {story.family}
                  </Typography>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <div className="mb-10 text-center">
            <Typography as="h2" variant="v2H2" className="mb-3 text-4xl">
              {homeMessages.stories.v2.title}
            </Typography>
            <Typography as="p" variant="v2Muted" className="text-sm">
              {homeMessages.stories.v2.subtitle}
            </Typography>
          </div>

          {isLoading ? (
            <div className="space-y-5">
              <div className="aspect-[3/4] animate-pulse rounded-3xl bg-[var(--v2-surface-container-high)]" />
              <div className="h-7 w-2/3 animate-pulse rounded bg-[var(--v2-surface-container-high)]" />
              <div className="h-4 w-full animate-pulse rounded bg-[var(--v2-surface-container-high)]" />
            </div>
          ) : isError || !featuredStory ? (
            <div className="rounded-2xl bg-[var(--v2-surface-container-lowest)] p-6">
              <Typography as="p" variant="v2Muted">
                {homeMessages.stories.v2.empty}
              </Typography>
            </div>
          ) : (
            <article>
              <div className="mb-6 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src={featuredStory.imageUrl}
                  alt={featuredStory.title}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
              <Typography
                as="h3"
                variant="v2Body"
                className="v2-font-headline mb-2 text-3xl !font-bold"
              >
                {featuredStory.title}
              </Typography>
              <Typography as="p" variant="v2Muted" className="italic">
                "{featuredStory.text}"
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="mt-4 text-xs !font-bold uppercase tracking-[0.08em] text-[var(--v2-secondary)]"
              >
                {homeMessages.stories.v2.bylinePrefix} {featuredStory.family}
              </Typography>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
