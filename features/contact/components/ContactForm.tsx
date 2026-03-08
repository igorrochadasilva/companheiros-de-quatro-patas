"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  CONTACT_SUBJECT_ORDER,
  type ContactFormData,
} from "@/features/contact/contact.types";
import { useSubmitContact } from "@/features/contact/hooks/useSubmitContact";
import { contactFormSchema } from "@/features/contact/schema/contact-form.schema";
import { getContactSubjectLabel } from "@/features/contact/utils/contact-form.utils";
import messages from "@/messages/pt-br.json";
import { type ContactSubject, ContactSubjectEnum } from "@/shared/lib";
import { track } from "@/shared/lib/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { H2, Muted } from "@/shared/ui/typography";

const contactMessages = messages.contact;

interface ContactFormProps {
  prefillSubject: ContactSubject;
  prefillPet: string;
}

export function ContactForm({ prefillSubject, prefillPet }: ContactFormProps) {
  const mutation = useSubmitContact();

  const defaultValues = useMemo<ContactFormData>(
    () => ({
      name: "",
      phone: "",
      email: "",
      subject: prefillSubject,
      message: "",
      pet: prefillPet,
      city: "",
      acknowledgedAdoptionProcess: false,
    }),
    [prefillPet, prefillSubject],
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  useEffect(() => {
    setValue("subject", prefillSubject);
    if (prefillPet) {
      setValue("pet", prefillPet);
    }
  }, [prefillPet, prefillSubject, setValue]);

  const subject = useWatch({
    control,
    name: "subject",
  });
  const isAdoption = subject === ContactSubjectEnum.ADOPTION;

  async function onSubmit(values: ContactFormData) {
    track("submit_contact", { subject: values.subject });

    try {
      await mutation.mutateAsync(values);
      toast.success(contactMessages.feedback.success);
      track("contact_success", { subject: values.subject });
    } catch (error) {
      toast.error(contactMessages.feedback.error);
      track("contact_error", {
        subject: values.subject,
        message: error instanceof Error ? error.message : "unknown",
      });
    }
  }

  return (
    <section className="space-y-4">
      <H2>{contactMessages.form.title}</H2>
      <Muted className="text-base">{contactMessages.form.description}</Muted>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{contactMessages.form.nameLabel}</Label>
            <Input
              id="name"
              placeholder={contactMessages.form.namePlaceholder}
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{contactMessages.form.phoneLabel}</Label>
            <Input
              id="phone"
              placeholder={contactMessages.form.phonePlaceholder}
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone ? (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{contactMessages.form.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder={contactMessages.form.emailPlaceholder}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{contactMessages.form.subjectLabel}</Label>
            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as ContactSubject)
                  }
                >
                  <SelectTrigger id="subject" aria-invalid={!!errors.subject}>
                    <SelectValue
                      placeholder={contactMessages.form.subjectPlaceholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_SUBJECT_ORDER.map((option) => (
                      <SelectItem key={option} value={option}>
                        {getContactSubjectLabel(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subject ? (
              <p className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{contactMessages.form.messageLabel}</Label>
          <Textarea
            id="message"
            placeholder={contactMessages.form.messagePlaceholder}
            rows={5}
            {...register("message")}
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          ) : null}
        </div>

        {isAdoption ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pet">{contactMessages.form.petLabel}</Label>
              <Input
                id="pet"
                placeholder={contactMessages.form.petPlaceholder}
                {...register("pet")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{contactMessages.form.cityLabel}</Label>
              <Input
                id="city"
                placeholder={contactMessages.form.cityPlaceholder}
                {...register("city")}
                aria-invalid={!!errors.city}
              />
              {errors.city ? (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <Controller
                control={control}
                name="acknowledgedAdoptionProcess"
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      {contactMessages.form.adoptionAwareLabel}
                    </span>
                  </label>
                )}
              />
            </div>
          </div>
        ) : null}

        {mutation.isError ? (
          <Alert variant="destructive">
            <AlertTitle>{contactMessages.feedback.error}</AlertTitle>
            <AlertDescription>{mutation.error.message}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? contactMessages.form.submitting
            : contactMessages.form.submit}
        </Button>
      </form>
    </section>
  );
}
