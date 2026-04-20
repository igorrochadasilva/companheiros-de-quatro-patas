"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import { contactMessages } from "@/messages";
import { parseContactPrefill } from "@/shared/lib";
import { track } from "@/shared/lib/analytics";

import { ContactFaqV2 } from "./ContactFaqV2";
import { ContactFormV2 } from "./ContactFormV2";
import { ContactHeroV2 } from "./ContactHeroV2";
import { ContactImageBreakV2 } from "./ContactImageBreakV2";
import { ContactQuickChannelsV2 } from "./ContactQuickChannelsV2";

export function ContactContentV2() {
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
    <div className="w-full overflow-x-clip bg-[#faf7f2] text-[#2f2a26]">
      <ContactHeroV2 />
      <ContactQuickChannelsV2 />
      <ContactFormV2 prefillSubject={prefill.subject} prefillPet={prefill.pet} />
      <ContactFaqV2 />
      <ContactImageBreakV2 />
    </div>
  );
}
