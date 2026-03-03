import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight md:text-4xl",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-lg text-muted-foreground",
      body: "text-base text-foreground",
      muted: "text-sm text-muted-foreground",
      small: "text-xs font-medium text-muted-foreground",
      overline:
        "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

type TypographyVariant = VariantProps<typeof typographyVariants>["variant"];

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
  };

function Typography({
  as,
  variant = "body",
  align,
  className,
  ...props
}: TypographyProps) {
  const Component =
    as ??
    (variant === "h1"
      ? "h1"
      : variant === "h2"
        ? "h2"
        : variant === "h3"
          ? "h3"
          : variant === "h4"
            ? "h4"
            : "p");

  return (
    <Component
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant, align }), className)}
      {...props}
    />
  );
}

function createHeading(
  variant: Extract<TypographyVariant, "h1" | "h2" | "h3" | "h4">,
) {
  const Heading = ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      as={variant}
      variant={variant}
      className={className}
      {...props}
    />
  );

  Heading.displayName = variant.toUpperCase();

  return Heading;
}

const H1 = createHeading("h1");
const H2 = createHeading("h2");
const H3 = createHeading("h3");
const H4 = createHeading("h4");

function Lead(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Typography as="p" variant="lead" {...props} />;
}

function Muted(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Typography as="p" variant="muted" {...props} />;
}

function Small(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <Typography as="span" variant="small" {...props} />;
}

function Overline(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <Typography as="span" variant="overline" {...props} />;
}

export {
  H1,
  H2,
  H3,
  H4,
  Lead,
  Muted,
  Overline,
  Small,
  Typography,
  typographyVariants,
};
