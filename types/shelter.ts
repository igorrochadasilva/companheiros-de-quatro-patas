export type ShelterMilestoneStatus = "done" | "in_progress" | "pending";

export type ShelterMilestone = {
  id: string;
  title: string;
  description?: string;
  weight: number;
  status: ShelterMilestoneStatus;
  costPlanned?: number;
  costSpent?: number;
  updatedAt?: string;
};

export type ShelterUpdateImage = {
  url: string;
  alt: string;
};

export type ShelterUpdate = {
  id: string;
  title: string;
  date: string;
  text: string;
  images: ShelterUpdateImage[];
};

export type ShelterProgress = {
  percentComplete: number;
  goalAmount: number;
  raisedAmount: number;
  spentAmount?: number;
  remainingAmount: number;
  lastUpdated: string;
  milestones: ShelterMilestone[];
  updates?: ShelterUpdate[];
  donation: {
    pixKey: string;
    pixQrUrl?: string;
    whatsapp?: string;
  };
};
