"use client";

import { useState } from "react";
import { toast } from "sonner";

import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { H2, Muted } from "@/shared/ui/typography";

const donationMessages = messages.home.donation;

// TODO: substituir pela chave oficial da ONG vinda de configuração/ambiente.
const PIX_KEY = "pix@companheiros.org.br";

export function HomeSectionDonationPix() {
  const [copying, setCopying] = useState(false);

  async function handleCopy() {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(PIX_KEY);
      toast.success(donationMessages.pixCopied);
    } catch {
      toast.error("Não foi possível copiar a chave. Tente novamente.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <section
      id="doar"
      className="scroll-mt-24 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] md:items-center"
    >
      <div className="space-y-3">
        <H2>{donationMessages.title}</H2>
        <Muted className="text-base">{donationMessages.impactTitle}</Muted>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {donationMessages.pixLabel}
            </span>
            <div className="flex gap-2">
              <Input value={PIX_KEY} readOnly className="font-mono text-xs" />
              <Button
                type="button"
                size="sm"
                variant="primary"
                onClick={handleCopy}
                disabled={copying}
              >
                {donationMessages.pixCopy}
              </Button>
            </div>
          </label>

          <Button type="button" variant="outline" size="sm">
            {donationMessages.seeMoreWays}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
