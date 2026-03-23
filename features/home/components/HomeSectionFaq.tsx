"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2 } from "@/shared/ui/typography";

export function HomeSectionFaq() {
  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const title = cms?.faqTitle?.trim() ?? "";
  const contactLink = cms?.faqContactLink?.trim() ?? "";
  const contactHref = cms?.faqContactHref || PUBLIC_ROUTES.contact;
  const items = cms?.faqItems ?? [];

  if (isCmsPending) {
    return (
      <section className="space-y-6">
        <Skeleton className="h-9 w-56 rounded" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
        <Skeleton className="h-9 w-40 rounded-md" />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {title ? <H2>{title}</H2> : null}

      {items.length > 0 ? (
        <>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {contactLink ? (
            <Button asChild variant="outline" size="sm">
              <Link href={contactHref}>{contactLink}</Link>
            </Button>
          ) : null}
        </>
      ) : (
        contactLink && (
          <Button asChild variant="outline" size="sm">
            <Link href={contactHref}>{contactLink}</Link>
          </Button>
        )
      )}
    </section>
  );
}
