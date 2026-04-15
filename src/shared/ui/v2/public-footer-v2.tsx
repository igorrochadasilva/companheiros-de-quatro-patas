import { CameraIcon, MailIcon, MapPinIcon, MessageCircleIcon, Share2Icon } from "lucide-react";
import Link from "next/link";

import { CONTACT, PUBLIC_ROUTES, WHATSAPP_URL } from "@/constants";
import { appMessages, navMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";
import { Typography } from "@/shared/ui/typography";

const quickLinks = [
  { href: PUBLIC_ROUTES.adoption, label: navMessages.adoption },
  { href: PUBLIC_ROUTES.donate, label: navMessages.donate },
  { href: PUBLIC_ROUTES.shelter, label: navMessages.shelter },
  { href: PUBLIC_ROUTES.about, label: navMessages.about },
] as const;

export function PublicFooterV2() {
  const year = new Date().getFullYear();

  const visibleQuickLinks = quickLinks.filter((item) => {
    if (item.href === PUBLIC_ROUTES.adoption) return featureFlags.routes.adoption;
    if (item.href === PUBLIC_ROUTES.donate) return featureFlags.routes.donate;
    if (item.href === PUBLIC_ROUTES.shelter) return featureFlags.routes.shelter;
    if (item.href === PUBLIC_ROUTES.about) return featureFlags.routes.about;
    return true;
  });

  return (
    <footer
      className="v2-section v2-section-muted w-full !py-12"
      role="contentinfo"
      aria-label="Rodape v2"
    >
      <div className="v2-container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Typography
            as="p"
            variant="v2Body"
            className="v2-font-headline text-lg !font-bold"
          >
            {appMessages.name}
          </Typography>
          <Typography
            as="p"
            variant="v2Muted"
            className="text-[var(--v2-on-surface)]/70"
          >
            Transformando vidas atraves do resgate, cuidado e amor animal desde 2015.
          </Typography>
        </div>

        <div>
          <Typography
            as="h5"
            variant="v2Body"
            className="mb-4 text-sm !font-semibold text-[var(--v2-primary)]"
          >
            Links Rapidos
          </Typography>
          <ul className="space-y-2 text-sm text-[var(--v2-on-surface)]/70">
            {visibleQuickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--v2-primary)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Typography
            as="h5"
            variant="v2Body"
            className="mb-4 text-sm !font-semibold text-[var(--v2-primary)]"
          >
            Contatos
          </Typography>
          <ul className="space-y-2 text-sm text-[var(--v2-on-surface)]/70">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[var(--v2-primary)]"
              >
                <MessageCircleIcon className="size-4" aria-hidden />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--v2-primary)]"
              >
                <MailIcon className="size-4" aria-hidden />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="size-4" aria-hidden />
              {CONTACT.city}
            </li>
          </ul>
        </div>

        <div>
          <Typography
            as="h5"
            variant="v2Body"
            className="mb-4 text-sm !font-semibold text-[var(--v2-primary)]"
          >
            Social
          </Typography>
          <div className="flex gap-3">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--v2-surface-container-high)] text-[var(--v2-on-surface)] transition-colors hover:bg-[var(--v2-primary-container)]"
              aria-label="Instagram"
            >
              <CameraIcon className="size-4" />
            </a>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--v2-surface-container-high)] text-[var(--v2-on-surface)] transition-colors hover:bg-[var(--v2-primary-container)]"
              aria-label="Compartilhar"
            >
              <Share2Icon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="v2-container mt-10 border-t border-[color:var(--v2-outline-variant)]/30 pt-8 text-center text-sm text-[var(--v2-on-surface)]/60">
        <Typography
          as="p"
          variant="v2Muted"
          className="text-sm text-[var(--v2-on-surface)]/60"
        >
          © {year} {appMessages.name}. Todos os direitos reservados.
        </Typography>
      </div>
    </footer>
  );
}
