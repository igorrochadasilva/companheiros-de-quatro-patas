"use client";

import {
  Building2Icon,
  GiftIcon,
  HouseIcon,
  InfoIcon,
  MailIcon,
  MenuIcon,
  PawPrintIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { appMessages, navMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

const navItems = [
  {
    key: "adoption",
    href: PUBLIC_ROUTES.adoption,
    label: navMessages.adoption,
    icon: PawPrintIcon,
  },
  {
    key: "shelter",
    href: PUBLIC_ROUTES.shelter,
    label: navMessages.shelter,
    icon: Building2Icon,
  },
  {
    key: "donate",
    href: PUBLIC_ROUTES.donate,
    label: navMessages.donate,
    icon: GiftIcon,
  },
  {
    key: "bazaar",
    href: PUBLIC_ROUTES.bazaar,
    label: navMessages.bazaar,
    icon: ShoppingBagIcon,
  },
  {
    key: "about",
    href: PUBLIC_ROUTES.about,
    label: navMessages.about,
    icon: InfoIcon,
  },
  {
    key: "contact",
    href: PUBLIC_ROUTES.contact,
    label: navMessages.contact,
    icon: MailIcon,
  },
] as const;

type HeaderNavKey = (typeof navItems)[number]["key"];

export type PublicHeaderV2Visibility = {
  nav: Record<HeaderNavKey, boolean>;
  supportCta: boolean;
};

export function PublicHeaderV2({
  visibility,
}: {
  visibility: PublicHeaderV2Visibility;
}) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const visibleNavItems = navItems.filter((item) => visibility.nav[item.key]);

  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const isHomeActive =
    normalizedPathname === PUBLIC_ROUTES.home || normalizedPathname === "/home";

  function isItemActive(href: string) {
    if (href === PUBLIC_ROUTES.home) return isHomeActive;
    return normalizedPathname.startsWith(href);
  }

  return (
    <header
      className={[
        "fixed top-0 w-full border-b border-[color:var(--v2-outline-variant)]/20 shadow-sm shadow-[color:var(--v2-on-surface)]/5",
        sheetOpen
          ? "z-50 bg-[#faf7f2] backdrop-blur-none"
          : "v2-glass-nav z-50",
      ].join(" ")}
    >
      <nav
        className="v2-container flex h-20 items-center justify-between px-6"
        aria-label={navMessages.ariaLabel}
      >
        <Link
          href={PUBLIC_ROUTES.home}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--v2-outline-variant)]/30 bg-white shadow-sm">
            <Image
              src="/iconV2.webp"
              alt={appMessages.name}
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="v2-font-headline text-xl font-bold tracking-tight text-[var(--v2-on-surface)] md:text-2xl">
            {appMessages.name}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="v2-font-headline hidden items-center gap-8 text-base font-medium md:flex">
            <Link
              href={PUBLIC_ROUTES.home}
              className={[
                "pb-1 transition-transform hover:scale-105",
                isItemActive(PUBLIC_ROUTES.home)
                  ? "border-b-2 border-[var(--v2-primary)] text-[var(--v2-primary)]"
                  : "text-[var(--v2-on-surface)]/80 hover:text-[var(--v2-primary)]",
              ].join(" ")}
            >
              Home
            </Link>

            {visibleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "pb-1 transition-transform hover:scale-105",
                  isItemActive(item.href)
                    ? "border-b-2 border-[var(--v2-primary)] text-[var(--v2-primary)]"
                    : "text-[var(--v2-on-surface)]/80 hover:text-[var(--v2-primary)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {visibility.supportCta ? (
            <Button
              asChild
              size="sm"
              className="hidden rounded-full bg-[var(--v2-primary)] px-6 py-2.5 font-semibold text-[var(--v2-on-primary)] shadow-md transition-transform hover:scale-105 active:scale-95 md:inline-flex"
            >
              <Link href={PUBLIC_ROUTES.donate}>{navMessages.supportCta}</Link>
            </Button>
          ) : null}

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-[var(--v2-primary)] hover:bg-[var(--v2-primary)]/10 md:hidden"
                aria-label={navMessages.openMenuLabel}
              >
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col border-l-[color:var(--v2-outline-variant)]/25 bg-white opacity-100 backdrop-blur-none"
            >
              <SheetHeader>
                <SheetTitle asChild>
                  <Link href={PUBLIC_ROUTES.home} className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--v2-outline-variant)]/30 bg-white shadow-sm">
                      <Image
                        src="/iconV2.webp"
                        alt={appMessages.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <span className="v2-font-headline text-left text-xl">
                      {appMessages.name}
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-1 py-4">
                <Link
                  href={PUBLIC_ROUTES.home}
                  className={[
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isItemActive(PUBLIC_ROUTES.home)
                      ? "bg-[var(--v2-primary)]/10 text-[var(--v2-primary)]"
                      : "text-[var(--v2-on-surface)] hover:bg-[var(--v2-surface-container-low)]",
                  ].join(" ")}
                  onClick={() => setSheetOpen(false)}
                >
                  <HouseIcon
                    className={[
                      "size-5 shrink-0",
                      isItemActive(PUBLIC_ROUTES.home)
                        ? "text-[var(--v2-primary)]"
                        : "text-[var(--v2-on-surface-variant)]",
                    ].join(" ")}
                  />
                  Home
                </Link>

                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isItemActive(item.href)
                          ? "bg-[var(--v2-primary)]/10 text-[var(--v2-primary)]"
                          : "text-[var(--v2-on-surface)] hover:bg-[var(--v2-surface-container-low)]",
                      ].join(" ")}
                      onClick={() => setSheetOpen(false)}
                    >
                      <Icon
                        className={[
                          "size-5 shrink-0",
                          isItemActive(item.href)
                            ? "text-[var(--v2-primary)]"
                            : "text-[var(--v2-on-surface-variant)]",
                        ].join(" ")}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {visibility.supportCta ? (
                <div className="border-t border-[color:var(--v2-outline-variant)]/20 bg-[#f3af3d]/12 px-4 pb-4 pt-4">
                  <Button
                    asChild
                    size="sm"
                    className="w-full rounded-full bg-[#f3af3d] text-white hover:bg-[#f3af3d]/90"
                  >
                    <Link
                      href={PUBLIC_ROUTES.donate}
                      onClick={() => setSheetOpen(false)}
                    >
                      {navMessages.supportCta}
                    </Link>
                  </Button>
                </div>
              ) : null}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
