import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import messages from "@/messages/pt-br.json";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";
import type { DonationConfig } from "@/types";

const donateMessages = messages.donate;

interface DonatationRecurringSectionProps {
  donationConfig?: DonationConfig;
}

export function DonatationRecurringSection({
  donationConfig,
}: DonatationRecurringSectionProps) {
  return (
    <section id="recorrente" className="scroll-mt-24 space-y-4">
      <H2>{donateMessages.recurring.title}</H2>
      <Muted className="text-base">
        {donateMessages.recurring.description}
      </Muted>

      {donationConfig?.recurringUrl ? (
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={donationConfig.recurringUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("donate_click", { location: "recurring" })}
            >
              <ExternalLinkIcon className="size-4" />
              {donateMessages.recurring.monthlyCta}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#faq">{donateMessages.recurring.scheduledPixCta}</a>
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="space-y-3 p-5">
            <p className="font-medium">{donateMessages.recurring.comingSoon}</p>
            <Button asChild variant="outline">
              <Link href="/contato?assunto=doacao-recorrente">
                {donateMessages.recurring.notifyCta}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
