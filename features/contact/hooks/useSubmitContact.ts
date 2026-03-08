"use client";

import { useMutation } from "@tanstack/react-query";

import type { ContactFormData } from "@/features/contact/contact.types";
import {
  submitContact,
  type SubmitContactResponse,
} from "@/features/contact/services/submitContact";

export function useSubmitContact() {
  return useMutation<SubmitContactResponse, Error, ContactFormData>({
    mutationFn: submitContact,
  });
}
