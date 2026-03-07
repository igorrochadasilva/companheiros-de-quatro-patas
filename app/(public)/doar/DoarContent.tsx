"use client";

import {
  CopyIcon,
  ExternalLinkIcon,
  MessageCircleIcon,
  QrCodeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PUBLIC_ROUTES } from "@/constants";
import { useDonationConfig } from "@/features/home/hooks/useDonationConfig";
import { useStats } from "@/features/home/hooks/useStats";
import { useStories } from "@/features/home/hooks/useStories";
import { useTransparencySummary } from "@/features/home/hooks/useTransparencySummary";
import messages from "@/messages/pt-br.json";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { track } from "@/shared/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
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
import { H1, H2, H3, Lead, Muted } from "@/shared/ui/typography";

const donateMessages = messages.donate;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}

function toWhatsappUrl(value: string, text: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const phone = value.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function DoarContent() {
  const [trackedTransparencyView, setTrackedTransparencyView] = useState(false);
  const [copyingPix, setCopyingPix] = useState(false);

  const {
    data: donationConfig,
    isLoading: isDonationLoading,
    isError: isDonationError,
    refetch: refetchDonationConfig,
  } = useDonationConfig();
  const { data: stats, isLoading: isStatsLoading } = useStats();

  const [impactRef, isImpactVisible] = useWhenVisible({ rootMargin: "120px" });
  const { data: storiesData, isLoading: isStoriesLoading } = useStories({
    enabled: isImpactVisible,
  });

  const [transparencyRef, isTransparencyVisible] = useWhenVisible({
    rootMargin: "120px",
  });
  const {
    data: transparencySummary,
    isLoading: isTransparencyLoading,
    isError: isTransparencyError,
  } = useTransparencySummary({ enabled: isTransparencyVisible });

  useEffect(() => {
    if (!isTransparencyVisible || trackedTransparencyView) {
      return;
    }

    track("view_transparency", { from: "donate_page" });
    setTrackedTransparencyView(true);
  }, [isTransparencyVisible, trackedTransparencyView]);

  async function copyPixKey(source: "pix_card" | "tier", tierId?: string) {
    if (!donationConfig?.pixKey) {
      return;
    }

    try {
      setCopyingPix(true);
      await navigator.clipboard.writeText(donationConfig.pixKey);
      toast.success(donateMessages.pix.copySuccess);
      track("pix_copy", {
        source,
        tierId,
      });
    } catch {
      toast.error(donateMessages.pix.copyError);
    } finally {
      setCopyingPix(false);
    }
  }

  const whatsappUrl =
    donationConfig?.whatsapp && donationConfig.pixKey
      ? toWhatsappUrl(
          donationConfig.whatsapp,
          donateMessages.pix.whatsappPrefilledMessage.replace(
            "{pixKey}",
            donationConfig.pixKey,
          ),
        )
      : null;

  const highlightStories = storiesData?.items.slice(0, 2) ?? [];

  return (
    <div className="space-y-16">
      <section className="space-y-8">
        <div className="space-y-4">
          <H1>{donateMessages.hero.title}</H1>
          <Lead>{donateMessages.hero.subtitle}</Lead>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <a
                href="#pix"
                onClick={() => track("donate_click", { location: "hero" })}
              >
                {donateMessages.hero.primaryCta}
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#transparencia">{donateMessages.hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {isStatsLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="space-y-2 p-4">
                  <Skeleton className="h-8 w-16 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {stats?.inTreatmentCount.toLocaleString("pt-BR") ?? "-"}
                  </p>
                  <Muted>{donateMessages.hero.metrics.inTreatment}</Muted>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {transparencySummary
                      ? formatCurrency(transparencySummary.totalSpent)
                      : "-"}
                  </p>
                  <Muted>{donateMessages.hero.metrics.monthlyCosts}</Muted>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {stats?.adoptedCount.toLocaleString("pt-BR") ?? "-"}
                  </p>
                  <Muted>{donateMessages.hero.metrics.adopted}</Muted>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      <section id="pix" className="scroll-mt-24 space-y-6">
        <div className="space-y-2">
          <H2>{donateMessages.pix.title}</H2>
          <Muted className="text-base">{donateMessages.pix.subtitle}</Muted>
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => refetchDonationConfig()}
              >
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
                      onClick={() => copyPixKey("pix_card")}
                      disabled={copyingPix}
                      aria-label={donateMessages.pix.copyAriaLabel}
                    >
                      <CopyIcon className="size-4" />
                      {donateMessages.pix.copyButton}
                    </Button>
                  </div>

                  {whatsappUrl ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-fit"
                    >
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
                    <Muted className="text-xs">
                      {donateMessages.pix.bankAccountPrefix}{" "}
                      <span className="font-medium text-foreground">
                        {donationConfig.bankAccount}
                      </span>
                    </Muted>
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
                        <span className="text-xs">
                          {donateMessages.pix.noQr}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <H3>{donateMessages.pix.tiersTitle}</H3>
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
                          await copyPixKey("tier", tier.id);
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
                <Muted className="text-sm">
                  {donateMessages.pix.proofHint}
                </Muted>
              ) : null}
            </div>
          </>
        )}
      </section>

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
              <p className="font-medium">
                {donateMessages.recurring.comingSoon}
              </p>
              <Button asChild variant="outline">
                <Link href="/contato?assunto=doacao-recorrente">
                  {donateMessages.recurring.notifyCta}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section id="itens" className="scroll-mt-24 space-y-4">
        <H2>{donateMessages.items.title}</H2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>{donateMessages.items.cards.items.title}</CardTitle>
              <CardDescription>
                {donateMessages.items.cards.items.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {donateMessages.items.cards.items.acceptedList.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {donateMessages.items.cards.volunteer.title}
              </CardTitle>
              <CardDescription>
                {donateMessages.items.cards.volunteer.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contato?assunto=voluntariado">
                  {donateMessages.items.cards.volunteer.cta}
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{donateMessages.items.cards.foster.title}</CardTitle>
              <CardDescription>
                {donateMessages.items.cards.foster.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contato?assunto=lar-temporario">
                  {donateMessages.items.cards.foster.cta}
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{donateMessages.items.cards.bazaar.title}</CardTitle>
              <CardDescription>
                {donateMessages.items.cards.bazaar.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={PUBLIC_ROUTES.bazaar}>
                  {donateMessages.items.cards.bazaar.cta}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section ref={impactRef} className="space-y-4">
        <H2>{donateMessages.impact.title}</H2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {donateMessages.impact.cards.map((card) => (
            <Card key={card.title}>
              <CardContent className="space-y-2 p-5">
                <p className="font-semibold text-primary">{card.title}</p>
                <Muted>{card.description}</Muted>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <H3>{donateMessages.impact.storiesTitle}</H3>
          {isStoriesLoading ? (
            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="space-y-2 p-5">
                    <Skeleton className="h-5 w-44 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : highlightStories.length === 0 ? (
            <Muted>{donateMessages.impact.storiesEmpty}</Muted>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {highlightStories.map((story) => (
                <Card key={story.id}>
                  <CardContent className="space-y-2 p-5">
                    <p className="font-semibold">{story.title}</p>
                    <Muted>{story.summary}</Muted>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="transparencia"
        ref={transparencyRef}
        className="scroll-mt-24 space-y-4"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <H2>{donateMessages.transparency.title}</H2>
            <Muted className="text-base">
              {donateMessages.transparency.subtitle}
            </Muted>
          </div>
          <Button asChild variant="outline">
            <Link href={PUBLIC_ROUTES.transparency}>
              {donateMessages.transparency.cta}
            </Link>
          </Button>
        </div>

        {isTransparencyLoading ? (
          <div className="grid gap-3 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="space-y-2 p-5">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-7 w-28 rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isTransparencyError || !transparencySummary ? (
          <Alert variant="destructive">
            <AlertTitle>{donateMessages.transparency.errorTitle}</AlertTitle>
            <AlertDescription>
              {donateMessages.transparency.errorDescription}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <Muted>{donateMessages.transparency.raisedLabel}</Muted>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(transparencySummary.totalRaised)}
                  </p>
                  <Muted>
                    {donateMessages.transparency.monthLabelPrefix}{" "}
                    {transparencySummary.monthLabel}
                  </Muted>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-2 p-5">
                  <Muted>{donateMessages.transparency.spentLabel}</Muted>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(transparencySummary.totalSpent)}
                  </p>
                  <Muted>{donateMessages.transparency.destinationHint}</Muted>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-2 p-5">
                  <Muted>{donateMessages.transparency.balanceLabel}</Muted>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(transparencySummary.balance)}
                  </p>
                  <Muted>
                    {donateMessages.transparency.updatedAtPrefix}{" "}
                    {formatDate(transparencySummary.lastUpdatedAt)}
                  </Muted>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {donateMessages.transparency.lastExpensesTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {transparencySummary.lastExpenses.slice(0, 3).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between gap-4 rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">{expense.label}</p>
                      <Muted>{formatDate(expense.date)}</Muted>
                    </div>
                    <p className="font-semibold text-primary">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </section>

      <section id="faq" className="space-y-4">
        <H2>{donateMessages.faq.title}</H2>
        <Accordion type="single" collapsible className="rounded-lg border px-4">
          {donateMessages.faq.items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.contact}>
            {donateMessages.faq.contactCta}
          </Link>
        </Button>
      </section>
    </div>
  );
}
