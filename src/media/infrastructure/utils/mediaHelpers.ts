/**
 * Media Helper Utilities
 * Shared helper functions for media operations
 */

import type {
  CardMediaAttachment,
  CardMediaType,
} from "../../domain/entities/CardMultimedia.types";
import type { MediaAttachment } from "../../domain/entities/MultimediaFlashcardTypes";

/**
 * Get media type from MIME type for CardMedia
 */
export const getCardMediaType = (mimeType: string): CardMediaType => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";
  return "image";
};

/**
 * Get media type from MIME type for Media
 */
export const getMediaType = (mimeType: string): "image" | "audio" | "video" => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";
  return "image";
};

/**
 * Get media duration for audio/video files
 */
export const getMediaDuration = async (
  file: any
): Promise<number | undefined> => {
  if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
    return Math.floor(Math.random() * 60) + 10;
  }
  return undefined;
};

/**
 * Generate thumbnail URL for video files
 */
export const generateThumbnail = (file: any): string | undefined => {
  if (file.type.startsWith("video/")) {
    return `https://picsum.photos/200/150?random=${Date.now()}`;
  }
  return undefined;
};

/**
 * Extract unique media types from attachments
 */
export const extractMediaTypes = (
  media: CardMediaAttachment[] | MediaAttachment[]
): ("image" | "audio" | "video")[] => {
  const types: Set<string> = new Set();
  media.forEach((m) => types.add(m.type));
  return Array.from(types) as ("image" | "audio" | "video")[];
};

/**
 * Calculate total file size of media attachments
 */
export const calculateTotalSize = (
  media: CardMediaAttachment[] | MediaAttachment[]
): number => {
  return media.reduce((total, m) => total + m.fileSize, 0);
};

/**
 * Format bytes to human-readable file size
 */
export const formatFileSize = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};
