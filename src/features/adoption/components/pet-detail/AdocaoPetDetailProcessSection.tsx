import type { ReactNode } from "react";
import { HomeIcon, MessageSquareIcon, SearchCheckIcon } from "lucide-react";

import { adoptionMessages } from "@/messages";
import { Typography } from "@/shared/ui/typography";

function ProcessStep({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="flex flex-col items-center gap-5 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--v2-primary)]/15 text-[var(--v2-tertiary)]">
        {icon}
      </div>
      <Typography as="h3" variant="v2H2" className="!text-4xl">
        {title}
      </Typography>
      <Typography
        as="p"
        variant="v2Body"
        className="max-w-xs !text-[var(--v2-on-surface-variant)]"
      >
        {description}
      </Typography>
    </article>
  );
}

export function AdocaoPetDetailProcessSection() {
  const steps = adoptionMessages.petDetail.process.steps;

  return (
    <section className="mt-20 hidden border-t border-[var(--v2-outline-variant)]/40 pt-16 md:block">
      <Typography as="h2" variant="v2H2" align="center" className="mb-14">
        {adoptionMessages.petDetail.process.title}
      </Typography>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <ProcessStep
          icon={<SearchCheckIcon className="size-9" />}
          title={steps[0].title}
          description={steps[0].description}
        />
        <ProcessStep
          icon={<MessageSquareIcon className="size-9" />}
          title={steps[1].title}
          description={steps[1].description}
        />
        <ProcessStep
          icon={<HomeIcon className="size-9" />}
          title={steps[2].title}
          description={steps[2].description}
        />
      </div>
    </section>
  );
}

