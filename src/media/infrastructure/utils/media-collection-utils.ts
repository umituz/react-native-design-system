import type { CardMediaAttachment } from "../../domain/entities/CardMultimedia.types";
import type { MediaAttachment } from "../../domain/entities/MultimediaFlashcardTypes";

type MediaType = "image" | "audio" | "video";

const FILE_SIZE_UNITS = ["Bytes", "KB", "MB", "GB"] as const;

export function extractMediaTypes(
  media: readonly (CardMediaAttachment | MediaAttachment)[]
): MediaType[] {
  const types = new Set<MediaType>();
  media.forEach((m) => types.add(m.type));
  return Array.from(types);
}

export function calculateTotalSize(
  media: readonly (CardMediaAttachment | MediaAttachment)[]
): number {
  return media.reduce((total, m) => total + m.fileSize, 0);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = Math.round((bytes / Math.pow(1024, i)) * 100) / 100;
  return `${size} ${FILE_SIZE_UNITS[i]}`;
}
