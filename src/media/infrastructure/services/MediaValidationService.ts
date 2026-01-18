/**
 * Media Validation Service
 * Handles media file validation before upload
 */

import { formatFileSize } from "../utils/media-collection-utils";
import type { MediaValidation } from "../../domain/entities/MultimediaFlashcardTypes";

export class MediaValidationService {
  /**
   * Validate media file before upload
   */
  async validateMedia(file: any): Promise<MediaValidation> {
    try {
      const errors: string[] = [];
      const warnings: string[] = [];
      const recommendations: string[] = [];

      // File size validation
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        errors.push(
          `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(maxSize)})`,
        );
      } else if (file.size > 10 * 1024 * 1024) {
        warnings.push(`Large file size may impact performance`);
        recommendations.push("Consider compressing file");
      }

      // File type validation
      const supportedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "audio/mp3",
        "audio/wav",
        "audio/m4a",
        "video/mp4",
        "video/mov",
      ];

      if (!supportedTypes.includes(file.type)) {
        errors.push(`Unsupported file type: ${file.type}`);
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        recommendations,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [error instanceof Error ? error.message : "Validation failed"],
        warnings: [],
        recommendations: [],
      };
    }
  }
}
