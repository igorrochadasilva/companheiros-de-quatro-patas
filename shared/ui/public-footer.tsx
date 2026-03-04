import {
  BarChart3Icon,
  GiftIcon,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PawPrintIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";

import { CONTACT, PUBLIC_ROUTES, WHATSAPP_URL } from "@/constants";
import messages from "@/messages/pt-br.json";

const { app, footer, nav } = messages;

const quickLinks = [
  { href: PUBLIC_ROUTES.adoption, label: nav.adoption, icon: PawPrintIcon },
  { href: PUBLIC_ROUTES.donate, label: nav.donate, icon: GiftIcon },
  { href: PUBLIC_ROUTES.bazaar, label: nav.bazaar, icon: ShoppingBagIcon },
  {
    href: PUBLIC_ROUTES.transparency,
    label: nav.transparency,
    icon: BarChart3Icon,
  },
  { href: PUBLIC_ROUTES.about, label: nav.about, icon: InfoIcon },
  { href: PUBLIC_ROUTES.contact, label: nav.contact, icon: MailIcon },
] as const;

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-card"
      role="contentinfo"
      aria-label="Rodapé"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <Link
              href={PUBLIC_ROUTES.home}
              className="text-base font-semibold text-foreground hover:underline"
            >
              {app.name}
            </Link>
            <p className="text-sm text-muted-foreground">{app.tagline}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              {footer.linksTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              {footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground hover:underline"
                >
                  <MessageCircleIcon className="size-4 shrink-0" aria-hidden />
                  {footer.whatsappLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 hover:text-foreground hover:underline"
                >
                  <MailIcon className="size-4 shrink-0" aria-hidden />
                  {footer.emailLabel}: {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="size-4 shrink-0" aria-hidden />
                {footer.cityLabel}: {CONTACT.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {year} {app.name}. {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
