"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock3, MapPin, PawPrint } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, type Resolver, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  CONTACT_SUBJECT_ORDER,
  type ContactFormData,
} from "@/features/contact/contact.types";
import { useSubmitContact } from "@/features/contact/hooks/useSubmitContact";
import { contactFormSchema } from "@/features/contact/schema/contact-form.schema";
import { getContactSubjectLabel } from "@/features/contact/utils/contact-form.utils";
import { contactMessages } from "@/messages";
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
import { Typography } from "@/shared/ui/typography";

const contactFormResolver = zodResolver(
  contactFormSchema as never,
) as Resolver<ContactFormData>;

interface ContactFormV2Props {
  prefillSubject: ContactSubject;
  prefillPet: string;
}

export function ContactFormV2({
  prefillSubject,
  prefillPet,
}: ContactFormV2Props) {
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
    resolver: contactFormResolver,
    defaultValues,
  });

  useEffect(() => {
    setValue("subject", prefillSubject);
    if (prefillPet) {
      setValue("pet", prefillPet);
    }
  }, [prefillPet, prefillSubject, setValue]);

  const subject = useWatch({ control, name: "subject" });
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
    <section className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-10 md:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-4 lg:block">
          <Typography as="h2" variant="v2H2" className="!text-6xl md:!text-7xl">
            {contactMessages.form.title}
          </Typography>
          <Typography
            as="p"
            variant="v2Muted"
            className="mt-5 max-w-sm !text-base leading-relaxed !text-[#514535]"
          >
            {contactMessages.form.description}
          </Typography>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#f5f1ea]">
                <Clock3 className="size-4 text-[#f3af3d]" />
              </div>
              <div>
                <Typography as="p" variant="v2Label" className="!text-[10px]">
                  ATENDIMENTO
                </Typography>
                <Typography as="p" variant="v2Body" className="!text-sm">
                  Seg à Sex, 09h às 18h
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#f5f1ea]">
                <MapPin className="size-4 text-[#f3af3d]" />
              </div>
              <div>
                <Typography as="p" variant="v2Label" className="!text-[10px]">
                  SEDE
                </Typography>
                <Typography as="p" variant="v2Body" className="!text-sm">
                  São Paulo, SP
                </Typography>
              </div>
            </div>
          </div>
        </aside>

        <div className="rounded-[1.25rem] border border-[#d6cfc8] bg-white p-5 shadow-sm md:rounded-[2rem] md:p-8 lg:col-span-8">
          <div className="mb-5 lg:hidden">
            <Typography as="h2" variant="v2H2" className="!text-4xl">
              Mande uma Mensagem
            </Typography>
            <Typography
              as="p"
              variant="v2Muted"
              className="mt-2 !text-sm !text-[#514535]"
            >
              Preencha o formulário e nossa equipe entrará em contato em breve.
            </Typography>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{contactMessages.form.nameLabel}</Label>
                <Input
                  id="name"
                  placeholder={contactMessages.form.namePlaceholder}
                  className="rounded-2xl border-0 bg-[#faf7f2] px-4 py-3"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name ? (
                  <Typography as="p" variant="muted" className="!text-destructive">
                    {errors.name.message}
                  </Typography>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{contactMessages.form.phoneLabel}</Label>
                <Input
                  id="phone"
                  placeholder={contactMessages.form.phonePlaceholder}
                  className="rounded-2xl border-0 bg-[#faf7f2] px-4 py-3"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone ? (
                  <Typography as="p" variant="muted" className="!text-destructive">
                    {errors.phone.message}
                  </Typography>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{contactMessages.form.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={contactMessages.form.emailPlaceholder}
                  className="rounded-2xl border-0 bg-[#faf7f2] px-4 py-3"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email ? (
                  <Typography as="p" variant="muted" className="!text-destructive">
                    {errors.email.message}
                  </Typography>
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
                      onValueChange={(value) => field.onChange(value as ContactSubject)}
                    >
                      <SelectTrigger
                        id="subject"
                        className="rounded-2xl border-0 bg-[#faf7f2] px-4 py-3"
                        aria-invalid={!!errors.subject}
                      >
                        <SelectValue placeholder={contactMessages.form.subjectPlaceholder} />
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
                  <Typography as="p" variant="muted" className="!text-destructive">
                    {errors.subject.message}
                  </Typography>
                ) : null}
              </div>
            </div>

            {isAdoption ? (
              <div className="hidden space-y-4 rounded-2xl border border-[#46c2c1]/20 bg-[#46c2c1]/5 p-5 md:block">
                <div className="flex items-center gap-2 text-[#46c2c1]">
                  <PawPrint className="size-4" />
                  <Typography as="p" variant="v2Body" className="!font-bold">
                    Informações para Adoção
                  </Typography>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pet">{contactMessages.form.petLabel}</Label>
                    <Input
                      id="pet"
                      placeholder={contactMessages.form.petPlaceholder}
                      className="rounded-2xl border border-[#46c2c1]/20 bg-white px-4 py-3"
                      {...register("pet")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">{contactMessages.form.cityLabel}</Label>
                    <Input
                      id="city"
                      placeholder={contactMessages.form.cityPlaceholder}
                      className="rounded-2xl border border-[#46c2c1]/20 bg-white px-4 py-3"
                      {...register("city")}
                      aria-invalid={!!errors.city}
                    />
                    {errors.city ? (
                      <Typography as="p" variant="muted" className="!text-destructive">
                        {errors.city.message}
                      </Typography>
                    ) : null}
                  </div>
                </div>

                <Controller
                  control={control}
                  name="acknowledgedAdoptionProcess"
                  render={({ field }) => (
                    <label className="flex items-start gap-2">
                      <Checkbox
                        className="mt-0.5"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                      />
                      <Typography as="span" variant="v2Muted" className="!text-xs">
                        {contactMessages.form.adoptionAwareLabel}
                      </Typography>
                    </label>
                  )}
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="message">{contactMessages.form.messageLabel}</Label>
              <Textarea
                id="message"
                placeholder={contactMessages.form.messagePlaceholder}
                rows={5}
                className="rounded-2xl border-0 bg-[#faf7f2] px-4 py-3"
                {...register("message")}
                aria-invalid={!!errors.message}
              />
              {errors.message ? (
                <Typography as="p" variant="muted" className="!text-destructive">
                  {errors.message.message}
                </Typography>
              ) : null}
            </div>

            {mutation.isError ? (
              <Alert variant="destructive">
                <AlertTitle>{contactMessages.feedback.error}</AlertTitle>
                <AlertDescription>{mutation.error.message}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="h-12 w-full rounded-full bg-[#f3af3d] px-10 text-base font-bold text-white hover:bg-[#e6a63a] md:w-auto"
            >
              {mutation.isPending
                ? contactMessages.form.submitting
                : contactMessages.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
