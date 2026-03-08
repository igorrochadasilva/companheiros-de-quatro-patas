import messages from "@/messages/pt-br.json";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";
import type { Story } from "@/types";

const aboutMessages = messages.about;

interface AboutStoriesProps {
  stories: Story[];
  isLoading: boolean;
}

export function AboutStories({ stories, isLoading }: AboutStoriesProps) {
  return (
    <section id="historias" className="scroll-mt-24 space-y-4">
      <H2>{aboutMessages.stories.title}</H2>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-2 p-5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stories.length === 0 ? (
        <Muted>{aboutMessages.stories.empty}</Muted>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardContent className="space-y-2 p-5">
                <p className="font-semibold">{story.title}</p>
                <Muted>{story.summary}</Muted>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
