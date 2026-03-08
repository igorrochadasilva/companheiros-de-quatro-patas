"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import messages from "@/messages/pt-br.json";
import { parseContactPrefill } from "@/shared/lib";
import { track } from "@/shared/lib/analytics";

import { ContactFaq } from "./ContactFaq";
import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactQuickChannels } from "./ContactQuickChannels";

const contactMessages = messages.contact;

export function ContactContent() {
  const searchParams = useSearchParams();
  const trackedPrefill = useRef(false);

  const prefill = useMemo(
    () => parseContactPrefill(searchParams),
    [searchParams],
  );

  useEffect(() => {
    if (trackedPrefill.current) return;

    const hasAssunto = !!searchParams.get("assunto");
    const hasPet = !!searchParams.get("pet") || !!searchParams.get("petId");

    if (!hasAssunto && !hasPet) return;

    track("prefill_contact", {
      subject: prefill.subject,
      hasPet: Boolean(prefill.pet),
    });
    toast.message(contactMessages.feedback.prefillDetected);
    trackedPrefill.current = true;
  }, [prefill.pet, prefill.subject, searchParams]);

  return (
    <div className="space-y-12">
      <ContactHero />
      <ContactQuickChannels />
      <ContactForm prefillSubject={prefill.subject} prefillPet={prefill.pet} />
      <ContactFaq />
    </div>
  );
}
