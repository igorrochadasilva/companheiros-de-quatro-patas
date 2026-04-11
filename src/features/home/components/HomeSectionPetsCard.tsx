"use client";

import Image from "next/image";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { WHATSAPP_URL } from "@/constants/contact";
import { homeMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Muted } from "@/shared/ui/typography";
import type { Pet } from "@/types";

const petsMessages = homeMessages.pets;

const BADGE_LABELS: Record<string, string> = {
  vaccinated: petsMessages.badges.vaccinated,
  neutered: petsMessages.badges.neutered,
  urgent: petsMessages.badges.urgent,
};

function formatPetAge(ageYears: number) {
  if (!Number.isFinite(ageYears) || ageYears <= 0) {
    return "Idade nao informada";
  }

  if (ageYears < 1) {
    const months = Math.max(1, Math.round(ageYears * 12));
    return `${months} ${months === 1 ? "mes" : "meses"}`;
  }

  const roundedYears = Number.isInteger(ageYears)
    ? ageYears
    : Number(ageYears.toFixed(1));

  return `${roundedYears} ${roundedYears === 1 ? "ano" : "anos"}`;
}

export function HomeSectionPetsCard({ pet }: { pet: Pet }) {
  const petPath = `${PUBLIC_ROUTES.adoption}/${pet.id}`;
  const whatsappMessage = encodeURIComponent(
    petsMessages.card.contactWhatsappMessage
      .replace("{name}", pet.name)
      .replace("{id}", pet.id)
      .replace("{url}", petPath),
  );

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={pet.imageUrl}
          alt={pet.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{pet.name}</CardTitle>
        <Muted className="text-xs">
          {formatPetAge(pet.ageYears)} · {pet.size} · {pet.city}
        </Muted>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1 pb-2">
        {pet.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {BADGE_LABELS[tag] ?? tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link
            href={petPath}
            onClick={() => track("select_pet", { petId: pet.id })}
          >
            {petsMessages.card.seeDetails}
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="flex-1"
              variant="primary"
              onClick={() => track("start_adoption", { petId: pet.id })}
            >
              {petsMessages.card.wantToAdopt}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{pet.name}</DialogTitle>
              <DialogDescription>
                {petsMessages.card.dialogDescription}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                asChild
                size="sm"
                variant="outline"
                onClick={() =>
                  track("adoption_contact_whatsapp", { petId: pet.id })
                }
              >
                <Link
                  href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {petsMessages.card.contactWhatsapp}
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
