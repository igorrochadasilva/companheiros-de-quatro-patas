"use client";

import { CircleCheckBigIcon, CircleDotIcon, CircleIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { track } from "@/shared/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { H2, Muted } from "@/shared/ui/typography";
import type { ShelterMilestone, ShelterMilestoneStatus } from "@/types";

import { formatCurrency } from "./shelter.utils";

type FilterValue = "all" | "in_progress" | "pending";

interface ShelterMilestonesSectionProps {
  title: string;
  filterAllLabel: string;
  filterInProgressLabel: string;
  filterPendingLabel: string;
  statusDoneLabel: string;
  statusInProgressLabel: string;
  statusPendingLabel: string;
  weightLabelSuffix: string;
  plannedLabel: string;
  spentLabel: string;
  helpCta: string;
  milestones: ShelterMilestone[];
}

function getStatusBadgeVariant(status: ShelterMilestoneStatus) {
  if (status === "done") return "default";
  if (status === "in_progress") return "secondary";
  return "outline";
}

function getStatusLabel(
  status: ShelterMilestoneStatus,
  labels: {
    done: string;
    inProgress: string;
    pending: string;
  },
) {
  if (status === "done") return labels.done;
  if (status === "in_progress") return labels.inProgress;
  return labels.pending;
}

function getStatusIcon(status: ShelterMilestoneStatus) {
  if (status === "done") return CircleCheckBigIcon;
  if (status === "in_progress") return CircleDotIcon;
  return CircleIcon;
}

export function ShelterMilestonesSection({
  title,
  filterAllLabel,
  filterInProgressLabel,
  filterPendingLabel,
  statusDoneLabel,
  statusInProgressLabel,
  statusPendingLabel,
  weightLabelSuffix,
  plannedLabel,
  spentLabel,
  helpCta,
  milestones,
}: ShelterMilestonesSectionProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredMilestones = useMemo(() => {
    if (filter === "all") return milestones;
    return milestones.filter((item) => item.status === filter);
  }, [filter, milestones]);

  return (
    <section id="etapas" className="scroll-mt-24 space-y-4">
      <H2>{title}</H2>

      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as FilterValue)}
      >
        <TabsList>
          <TabsTrigger value="all">{filterAllLabel}</TabsTrigger>
          <TabsTrigger value="in_progress">{filterInProgressLabel}</TabsTrigger>
          <TabsTrigger value="pending">{filterPendingLabel}</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-4">
          <Accordion type="multiple" className="w-full">
            {filteredMilestones.map((milestone) => {
              const Icon = getStatusIcon(milestone.status);
              return (
                <AccordionItem key={milestone.id} value={milestone.id}>
                  <AccordionTrigger
                    onClick={() =>
                      track("expand_milestone", { milestoneId: milestone.id })
                    }
                  >
                    <span className="flex flex-col gap-2 text-left">
                      <span className="flex items-center gap-2">
                        <Icon className="size-4 text-muted-foreground" />
                        <span>{milestone.title}</span>
                      </span>
                      <span className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={getStatusBadgeVariant(milestone.status)}
                          className="font-normal"
                        >
                          {getStatusLabel(milestone.status, {
                            done: statusDoneLabel,
                            inProgress: statusInProgressLabel,
                            pending: statusPendingLabel,
                          })}
                        </Badge>
                        <Muted>
                          {milestone.weight}% {weightLabelSuffix}
                        </Muted>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {milestone.description ? (
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    ) : null}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>
                        {plannedLabel}:{" "}
                        {formatCurrency(milestone.costPlanned ?? 0)}
                      </span>
                      <span>
                        {spentLabel}: {formatCurrency(milestone.costSpent ?? 0)}
                      </span>
                    </div>

                    {milestone.status !== "done" ? (
                      <Button asChild size="sm" variant="outline">
                        <Link
                          href={`${PUBLIC_ROUTES.contact}?assunto=parceria&etapa=${encodeURIComponent(milestone.title)}`}
                        >
                          {helpCta}
                        </Link>
                      </Button>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
