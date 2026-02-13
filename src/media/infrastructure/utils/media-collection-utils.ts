/**
 * Media Collection Utilities
 * Generic utilities for working with media collections
 */

type MediaType = "image" | "audio" | "video";

const FILE_SIZE_UNITS = ["Bytes", "KB", "MB", "GB"] as const;

/**
 * Interface for media items with type property
 */
interface MediaWithType {
  type: MediaType;
}

/**
 * Interface for media items with file size
 */
interface MediaWithSize {
  fileSize: number;
}

export function extractMediaTypes(
  media: readonly MediaWithType[]
): MediaType[] {
  const types = new Set<MediaType>();
  media.forEach((m) => types.add(m.type));
  return Array.from(types);
}

export function calculateTotalSize(
  media: readonly MediaWithSize[]
): number {
  return media.reduce((total, m) => total + m.fileSize, 0);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = Math.round((bytes / Math.pow(1024, i)) * 100) / 100;
  return `${size} ${FILE_SIZE_UNITS[i]}`;
}
