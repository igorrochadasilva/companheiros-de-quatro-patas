import { CopyIcon, MessageCircleIcon, QrCodeIcon } from "lucide-react";
import Image from "next/image";

import { donateMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import type { DonationConfig } from "@/types";

import type { PixCopySource } from "./donatation.utils";

interface DonatationPixSectionProps {
  donationConfig?: DonationConfig;
  isDonationLoading: boolean;
  isDonationError: boolean;
  copyingPix: boolean;
  whatsappUrl: string | null;
  onRetry: () => void;
  onCopyPixKey: (source: PixCopySource, tierId?: string) => Promise<void>;
}

export function DonatationPixSection({
  donationConfig,
  isDonationLoading,
  isDonationError,
  copyingPix,
  whatsappUrl,
  onRetry,
  onCopyPixKey,
}: DonatationPixSectionProps) {
  return (
    <section id="pix" className="scroll-mt-24 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">
          {donateMessages.pix.title}
        </h2>
        <p className="text-base text-muted-foreground">
          {donateMessages.pix.subtitle}
        </p>
      </div>

      {isDonationLoading ? (
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-9 w-36" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <Skeleton className="size-48 rounded-lg" />
            </CardContent>
          </Card>
        </div>
      ) : isDonationError || !donationConfig ? (
        <Alert variant="destructive">
          <AlertTitle>{donateMessages.pix.errorTitle}</AlertTitle>
          <AlertDescription>
            <p>{donateMessages.pix.errorDescription}</p>
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
              {donateMessages.common.retry}
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>{donateMessages.pix.keyLabel}</CardTitle>
                <CardDescription>
                  {donateMessages.pix.keyDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    readOnly
                    value={donationConfig.pixKey}
                    className="font-mono text-xs"
                    aria-label={donateMessages.pix.pixInputAriaLabel}
                  />
                  <Button
                    type="button"
                    className="sm:w-fit"
                    onClick={() => onCopyPixKey("pix_card")}
                    disabled={copyingPix}
                    aria-label={donateMessages.pix.copyAriaLabel}
                  >
                    <CopyIcon className="size-4" />
                    {donateMessages.pix.copyButton}
                  </Button>
                </div>

                {whatsappUrl ? (
                  <Button asChild variant="outline" className="w-full sm:w-fit">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track("open_whatsapp", { from: "pix" })}
                      aria-label={donateMessages.pix.whatsappAriaLabel}
                    >
                      <MessageCircleIcon className="size-4" />
                      {donateMessages.pix.whatsappButton}
                    </a>
                  </Button>
                ) : null}

                {donationConfig.bankAccount ? (
                  <p className="text-xs text-muted-foreground">
                    {donateMessages.pix.bankAccountPrefix}{" "}
                    <span className="font-medium text-foreground">
                      {donationConfig.bankAccount}
                    </span>
                  </p>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex h-full items-center justify-center p-6">
                <div className="relative size-48 overflow-hidden rounded-lg border bg-muted">
                  {donationConfig.pixQrUrl ? (
                    <Image
                      src={donationConfig.pixQrUrl}
                      alt={donateMessages.pix.qrAlt}
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                      <QrCodeIcon className="size-8" />
                      <span className="text-xs">{donateMessages.pix.noQr}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight">
              {donateMessages.pix.tiersTitle}
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              {donationConfig.tiers.map((tier) => (
                <Card key={tier.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-primary">
                      {tier.label}
                    </CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={async () => {
                        track("donate_tier_click", {
                          tierId: tier.id,
                          amount: tier.amount,
                        });
                        await onCopyPixKey("tier", tier.id);
                      }}
                      disabled={copyingPix}
                    >
                      {donateMessages.pix.tierCta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {whatsappUrl ? (
              <p className="text-sm text-muted-foreground">
                {donateMessages.pix.proofHint}
              </p>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}
