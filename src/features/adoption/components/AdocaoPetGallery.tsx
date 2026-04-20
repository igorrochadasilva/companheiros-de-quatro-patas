"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { HeartIcon } from "lucide-react";

type AdocaoPetGalleryProps = {
  petName: string;
  imageUrls: string[];
  favoriteAriaLabel: string;
  selectImageAriaTemplate: string;
};

export function AdocaoPetGallery({
  petName,
  imageUrls,
  favoriteAriaLabel,
  selectImageAriaTemplate,
}: AdocaoPetGalleryProps) {
  const galleryImages = useMemo(
    () => imageUrls.filter((url) => typeof url === "string" && url.length > 0),
    [imageUrls],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!galleryImages.length) {
    return null;
  }

  const selectedImage = galleryImages[selectedIndex] ?? galleryImages[0];
  const mobileImages = galleryImages.slice(0, 5);
  const desktopImages = galleryImages.slice(0, 4);

  function getSelectImageAriaLabel(index: number) {
    return selectImageAriaTemplate
      .replace("{index}", String(index + 1))
      .replace("{name}", petName);
  }

  return (
    <div className="space-y-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--v2-surface-container-low)]">
        <Image
          src={selectedImage}
          alt={petName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
        <button
          type="button"
          aria-label={favoriteAriaLabel}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--v2-surface)]/90 text-[var(--v2-tertiary)] shadow-lg md:hidden"
        >
          <HeartIcon className="size-5 fill-current" />
        </button>
      </div>

      {galleryImages.length > 1 ? (
        <>
          <div className="flex gap-3 overflow-x-auto pb-1 md:hidden">
            {mobileImages.map((url, index) => (
              <button
                key={`${url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={[
                  "relative h-20 w-20 flex-none overflow-hidden rounded-lg border-2 bg-[var(--v2-surface-container-low)]",
                  selectedIndex === index
                    ? "border-[var(--v2-primary)]"
                    : "border-transparent",
                ].join(" ")}
                aria-label={getSelectImageAriaLabel(index)}
              >
                <Image
                  src={url}
                  alt={`${petName} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          <div className="hidden grid-cols-4 gap-4 md:grid">
            {desktopImages.map((url, index) => (
              <button
                key={`${url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={[
                  "relative aspect-square overflow-hidden rounded-lg border-2 bg-[var(--v2-surface-container-low)]",
                  selectedIndex === index
                    ? "border-[var(--v2-primary)]"
                    : "border-transparent",
                ].join(" ")}
                aria-label={getSelectImageAriaLabel(index)}
              >
                <Image
                  src={url}
                  alt={`${petName} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
