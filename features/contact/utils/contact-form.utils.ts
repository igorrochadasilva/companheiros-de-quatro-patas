import messages from "@/messages/pt-br.json";
import type { ContactSubject } from "@/shared/lib";

const contactMessages = messages.contact;

export function getContactSubjectLabel(subject: ContactSubject) {
  return contactMessages.subjects[subject];
}
