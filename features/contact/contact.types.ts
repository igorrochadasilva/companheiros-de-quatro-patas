import { type ContactSubject, ContactSubjectEnum } from "@/shared/lib";

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: ContactSubject;
  message: string;
  pet?: string;
  city?: string;
  acknowledgedAdoptionProcess: boolean;
}

export const CONTACT_SUBJECT_ORDER: ContactSubject[] = [
  ContactSubjectEnum.ADOPTION,
  ContactSubjectEnum.DONATION,
  ContactSubjectEnum.VOLUNTEER,
  ContactSubjectEnum.FOSTER,
  ContactSubjectEnum.PARTNERSHIP,
  ContactSubjectEnum.OTHERS,
];
