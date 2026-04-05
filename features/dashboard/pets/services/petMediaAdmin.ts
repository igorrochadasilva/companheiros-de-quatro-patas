import { API_ROUTES } from "@/constants";
import { apiDelete, apiPatch, apiPost } from "@/shared/lib/api";
import type { CloudinarySignResponse, PetMediaAdminRecord } from "@/types";

type SignCloudinaryPayload = {
  petId: string;
  fileName: string;
  contentType: string;
};

type CreatePetMediaPayload = {
  petId: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  publicId?: string;
  isMain?: boolean;
  sortOrder?: number;
};

type UploadToCloudinaryResult = {
  secureUrl: string;
  publicId: string;
  resourceType: "image" | "video" | "raw";
};

export async function signCloudinaryUpload(
  payload: SignCloudinaryPayload,
): Promise<CloudinarySignResponse> {
  return apiPost<CloudinarySignResponse>(API_ROUTES.cloudinarySign, payload);
}

export async function uploadFileToCloudinary(
  file: File,
  signature: CloudinarySignResponse,
): Promise<UploadToCloudinaryResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/${signature.resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    secure_url: string;
    public_id: string;
    resource_type: "image" | "video" | "raw";
  };

  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
  };
}

export async function createPetMediaAdmin(
  payload: CreatePetMediaPayload,
): Promise<PetMediaAdminRecord> {
  return apiPost<PetMediaAdminRecord>(API_ROUTES.petMedia, payload);
}

export async function setPetMediaAsMain(
  mediaId: string,
): Promise<PetMediaAdminRecord> {
  return apiPatch<PetMediaAdminRecord>(`${API_ROUTES.petMedia}/${mediaId}`, {
    isMain: true,
  });
}

export async function deletePetMediaAdmin(
  mediaId: string,
): Promise<{ ok: boolean }> {
  return apiDelete<{ ok: boolean }>(`${API_ROUTES.petMedia}/${mediaId}`);
}

export async function uploadPetMedia(
  petId: string,
  file: File,
  sortOrder = 0,
  isMain = false,
): Promise<PetMediaAdminRecord> {
  const signature = await signCloudinaryUpload({
    petId,
    fileName: file.name,
    contentType: file.type,
  });

  const uploaded = await uploadFileToCloudinary(file, signature);

  return createPetMediaAdmin({
    petId,
    type: uploaded.resourceType === "video" ? "VIDEO" : "IMAGE",
    url: uploaded.secureUrl,
    publicId: uploaded.publicId,
    isMain,
    sortOrder,
  });
}
