"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { featureFlags } from "@/shared/config/feature-flags";
import { PublicFooter } from "@/shared/ui/public-footer";
import { PublicHeader } from "@/shared/ui/public-header";
import { LayoutV2Shell } from "@/shared/ui/v2/layout-v2-shell";
import { PublicFooterV2 } from "@/shared/ui/v2/public-footer-v2";
import { PublicHeaderV2 } from "@/shared/ui/v2/public-header-v2";

function getHeaderVisibility() {
  return {
    nav: {
      adoption: featureFlags.routes.adoption && featureFlags.header.adoption,
      shelter: featureFlags.routes.shelter && featureFlags.header.shelter,
      donate: featureFlags.routes.donate && featureFlags.header.donate,
      bazaar: featureFlags.routes.bazaar && featureFlags.header.bazaar,
      about: featureFlags.routes.about && featureFlags.header.about,
      contact: featureFlags.routes.contact && featureFlags.header.contact,
    },
    transparency:
      featureFlags.routes.transparency && featureFlags.header.transparency,
    supportCta: featureFlags.routes.donate && featureFlags.header.supportCta,
  } as const;
}

function isTruthyParam(value: string | null) {
  if (!value) return false;
  return ["1", "true", "v2", "yes"].includes(value.trim().toLowerCase());
}

export function PublicLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const headerVisibility = getHeaderVisibility();

  const useV2Layout =
    pathname === PUBLIC_ROUTES.home &&
    isTruthyParam(searchParams.get("layout"));

  if (useV2Layout) {
    return (
      <LayoutV2Shell
        header={<PublicHeaderV2 visibility={headerVisibility} />}
        footer={<PublicFooterV2 />}
      >
        {children}
      </LayoutV2Shell>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader visibility={headerVisibility} />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      <PublicFooter />
    </div>
  );
}