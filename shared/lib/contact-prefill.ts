export enum ContactSubjectEnum {
  ADOPTION = "adocao",
  DONATION = "doacao",
  VOLUNTEER = "voluntariado",
  FOSTER = "lar-temporario",
  PARTNERSHIP = "parceria",
  OTHERS = "outros",
}

export type ContactSubject = ContactSubjectEnum;

export interface ContactPrefill {
  subject: ContactSubject;
  pet: string;
}

interface SearchParamsLike {
  get(name: string): string | null;
}

const CONTACT_SUBJECT_VALUES = new Set<string>(
  Object.values(ContactSubjectEnum),
);

function isContactSubject(value: string): value is ContactSubjectEnum {
  return CONTACT_SUBJECT_VALUES.has(value);
}

export function parseContactPrefill(source: SearchParamsLike): ContactPrefill {
  const subjectRaw = (source.get("assunto") ?? "").trim().toLowerCase();
  const petRaw = (source.get("pet") ?? source.get("petId") ?? "").trim();

  return {
    subject: isContactSubject(subjectRaw)
      ? (subjectRaw as ContactSubjectEnum)
      : ContactSubjectEnum.OTHERS,
    pet: petRaw,
  };
}
