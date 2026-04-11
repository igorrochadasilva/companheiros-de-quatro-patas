"use client";

import { CopyIcon, MessageCircleIcon, QrCodeIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { track } from "@/shared/lib/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

interface ShelterDonateSectionProps {
  title: string;
  subtitle: string;
  pixLabel: string;
  unavailableTitle: string;
  unavailableDescription: string;
  qrAlt: string;
  qrUnavailable: string;
  pixKey?: string;
  pixQrUrl?: string;
  whatsappUrl: string | null;
  whatsappCta: string;
  copyCta: string;
  copyAriaLabel: string;
  copySuccess: string;
  copyError: string;
  pixInputAriaLabel: string;
}

export function ShelterDonateSection({
  title,
  subtitle,
  pixLabel,
  unavailableTitle,
  unavailableDescription,
  qrAlt,
  qrUnavailable,
  pixKey,
  pixQrUrl,
  whatsappUrl,
  whatsappCta,
  copyCta,
  copyAriaLabel,
  copySuccess,
  copyError,
  pixInputAriaLabel,
}: ShelterDonateSectionProps) {
  async function onCopyPix() {
    if (!pixKey) return;

    try {
      await navigator.clipboard.writeText(pixKey);
      toast.success(copySuccess);
      track("pix_copy", { source: "shelter_page" });
    } catch {
      toast.error(copyError);
    }
  }

  if (!pixKey) {
    return (
      <section id="doar" className="scroll-mt-24">
        <Alert variant="destructive">
          <AlertTitle>{unavailableTitle}</AlertTitle>
          <AlertDescription>{unavailableDescription}</AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section id="doar" className="scroll-mt-24 space-y-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="text-base text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{pixLabel}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                readOnly
                value={pixKey}
                aria-label={pixInputAriaLabel}
                className="font-mono text-xs"
              />
              <Button onClick={onCopyPix} aria-label={copyAriaLabel}>
                <CopyIcon className="size-4" />
                {copyCta}
              </Button>
            </div>

            {whatsappUrl ? (
              <Button asChild variant="outline">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    track("open_whatsapp", { from: "shelter_page" })
                  }
                >
                  <MessageCircleIcon className="size-4" />
                  {whatsappCta}
                </a>
              </Button>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full items-center justify-center p-6">
            <div className="relative size-48 overflow-hidden rounded-lg border bg-muted">
              {pixQrUrl ? (
                <Image
                  src={pixQrUrl}
                  alt={qrAlt}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <QrCodeIcon className="size-8" />
                  <span className="text-xs">{qrUnavailable}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
