import { contactMessages } from "@/messages";
import type { ContactSubject } from "@/shared/lib";

export function getContactSubjectLabel(subject: ContactSubject) {
  return contactMessages.subjects[subject];
}
