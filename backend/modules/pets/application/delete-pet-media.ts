import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import { getCloudinaryClient } from "@/shared/lib/cloudinary/server";

export async function deletePetMedia(id: string) {
  const media = await prisma.petMedia.findUnique({
    where: { id },
  });

  if (!media) {
    return prisma.petMedia.delete({
      where: { id },
    });
  }

  if (media.publicId) {
    const cloudinary = getCloudinaryClient();
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === "VIDEO" ? "video" : "image",
      invalidate: true,
    });
  }

  return prisma.petMedia.delete({
    where: { id },
  });
}
