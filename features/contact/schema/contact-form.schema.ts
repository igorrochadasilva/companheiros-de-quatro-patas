import { z } from "zod";

import messages from "@/messages/pt-br.json";
import { ContactSubjectEnum } from "@/shared/lib";

const contactMessages = messages.contact;
const phoneRegex = /^\+?[0-9()\-\s]{10,}$/;

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(1, contactMessages.validation.nameRequired)
      .min(3, contactMessages.validation.nameMin),
    phone: z
      .string()
      .min(1, contactMessages.validation.phoneRequired)
      .regex(phoneRegex, contactMessages.validation.phoneInvalid),
    email: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        contactMessages.validation.emailInvalid,
      ),
    subject: z.nativeEnum(ContactSubjectEnum),
    message: z
      .string()
      .min(1, contactMessages.validation.messageRequired)
      .min(10, contactMessages.validation.messageMin),
    pet: z.string().optional(),
    city: z.string().optional(),
    acknowledgedAdoptionProcess: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (
      value.subject === ContactSubjectEnum.ADOPTION &&
      (!value.city || value.city.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: contactMessages.validation.cityRequiredForAdoption,
      });
    }
  });
