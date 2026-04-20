import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { adoptionMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

export function AdocaoPetDetailNotFound() {
  return (
    <section className="v2-section !pt-12">
      <div className="v2-container space-y-4">
        <Typography as="h1" variant="v2H1" className="!text-5xl">
          {adoptionMessages.petDetail.notFoundTitle}
        </Typography>
        <Typography as="p" variant="v2Muted" className="!text-base">
          {adoptionMessages.petDetail.notFoundDescription}
        </Typography>
        <Button asChild variant="outline" className="rounded-full">
          <Link href={PUBLIC_ROUTES.adoption}>
            {adoptionMessages.petDetail.backToList}
          </Link>
        </Button>
      </div>
    </section>
  );
}
