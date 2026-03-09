import type { ShelterMilestone, ShelterMilestoneStatus } from "@/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function getMilestoneStatusWeight(
  status: ShelterMilestoneStatus,
): number {
  if (status === "done") return 1;
  if (status === "in_progress") return 0.5;
  return 0;
}

export function computeMilestonesPercent(
  milestones: ShelterMilestone[],
): number {
  if (!milestones.length) return 0;

  const total = milestones.reduce((acc, current) => {
    return acc + current.weight * getMilestoneStatusWeight(current.status);
  }, 0);

  return Math.max(0, Math.min(100, Math.round(total)));
}

export function resolvePercentComplete(
  percentComplete: number,
  milestones: ShelterMilestone[],
) {
  if (Number.isFinite(percentComplete) && percentComplete >= 0) {
    return Math.max(0, Math.min(100, Math.round(percentComplete)));
  }
  return computeMilestonesPercent(milestones);
}

export function toWhatsappUrl(phone: string, text: string) {
  const normalized = phone.replace(/\D/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}
