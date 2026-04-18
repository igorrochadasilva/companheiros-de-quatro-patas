"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { PublicFooter } from "@/shared/ui/public-footer";
import { PublicHeader } from "@/shared/ui/public-header";
import { LayoutV2Shell } from "@/shared/ui/v2/layout-v2-shell";
import { PublicFooterV2 } from "@/shared/ui/v2/public-footer-v2";
import { PublicHeaderV2 } from "@/shared/ui/v2/public-header-v2";

type RouteVisibilitySnapshot = {
  adoption: boolean;
  shelter: boolean;
  donate: boolean;
  bazaar: boolean;
  about: boolean;
  contact: boolean;
  transparency: boolean;
};

type HeaderVisibilitySnapshot = {
  adoption: boolean;
  shelter: boolean;
  donate: boolean;
  bazaar: boolean;
  about: boolean;
  contact: boolean;
  transparency: boolean;
  supportCta: boolean;
};

type PublicLayoutFlagSnapshot = {
  routes: RouteVisibilitySnapshot;
  header: HeaderVisibilitySnapshot;
};

function getHeaderVisibility(flagSnapshot: PublicLayoutFlagSnapshot) {
  return {
    nav: {
      adoption: flagSnapshot.routes.adoption && flagSnapshot.header.adoption,
      shelter: flagSnapshot.routes.shelter && flagSnapshot.header.shelter,
      donate: flagSnapshot.routes.donate && flagSnapshot.header.donate,
      bazaar: flagSnapshot.routes.bazaar && flagSnapshot.header.bazaar,
      about: flagSnapshot.routes.about && flagSnapshot.header.about,
      contact: flagSnapshot.routes.contact && flagSnapshot.header.contact,
    },
    transparency:
      flagSnapshot.routes.transparency && flagSnapshot.header.transparency,
    supportCta: flagSnapshot.routes.donate && flagSnapshot.header.supportCta,
  } as const;
}

export function PublicLayoutClient({
  children,
  flagSnapshot,
}: {
  children: ReactNode;
  flagSnapshot: PublicLayoutFlagSnapshot;
}) {
  const pathname = usePathname();
  const headerVisibility = getHeaderVisibility(flagSnapshot);

  const useV2Layout =
    pathname === PUBLIC_ROUTES.home ||
    pathname.startsWith(PUBLIC_ROUTES.adoption);

  if (useV2Layout) {
    return (
      <LayoutV2Shell
        header={<PublicHeaderV2 visibility={headerVisibility} />}
        footer={<PublicFooterV2 routesVisibility={flagSnapshot.routes} />}
      >
        {children}
      </LayoutV2Shell>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader visibility={headerVisibility} />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      <PublicFooter routesVisibility={flagSnapshot.routes} />
    </div>
  );
}
