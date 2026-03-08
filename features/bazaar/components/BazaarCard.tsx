import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";

import { WHATSAPP_URL } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { type BazaarItem, BazaarItemStatusEnum } from "@/types";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const bazaarMessages = messages.bazaar;

function getStatusLabel(status: BazaarItem["status"]) {
  if (status === BazaarItemStatusEnum.AVAILABLE) {
    return bazaarMessages.card.statusAvailable;
  }
  if (status === BazaarItemStatusEnum.RESERVED) {
    return bazaarMessages.card.statusReserved;
  }
  return bazaarMessages.card.statusSold;
}

function getStatusVariant(status: BazaarItem["status"]) {
  if (status === BazaarItemStatusEnum.AVAILABLE) return "default" as const;
  if (status === BazaarItemStatusEnum.RESERVED) return "secondary" as const;
  return "outline" as const;
}

function toWhatsAppUrl(itemName: string) {
  const text = bazaarMessages.card.whatsappMessage.replace(
    "{itemName}",
    itemName,
  );
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

interface BazaarCardProps {
  item: BazaarItem;
}

export function BazaarCard({ item }: BazaarCardProps) {
  const whatsappUrl = toWhatsAppUrl(item.name);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={item.imageUrl ?? "/icon.webp"}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{item.name}</CardTitle>
          <Badge variant={getStatusVariant(item.status)}>
            {getStatusLabel(item.status)}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-lg font-semibold text-primary">
          {formatCurrency(item.price)}
        </p>
      </CardContent>

      <CardFooter className="mt-auto pt-0">
        {item.status === BazaarItemStatusEnum.SOLD ? (
          <Button type="button" className="w-full" disabled>
            {bazaarMessages.card.unavailable}
          </Button>
        ) : (
          <Button asChild className="w-full">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={bazaarMessages.card.contactAriaLabel.replace(
                "{itemName}",
                item.name,
              )}
            >
              <MessageCircleIcon className="size-4" />
              {bazaarMessages.card.contactButton}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
