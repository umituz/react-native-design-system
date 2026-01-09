/**
 * Card Media Validation Service
 * Handles media file validation before upload
 */

import { formatFileSize } from "../utils/mediaHelpers";
import type { CardMediaValidation } from "../../domain/entities/CardMultimedia.types";
import { getMediaDuration } from "../utils/mediaHelpers";

export class CardMediaValidationService {
  /**
   * Validate media file before upload
   */
  async validateMedia(file: any): Promise<CardMediaValidation> {
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
        // 10MB
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

      // Media-specific validations
      if (file.type.startsWith("image/")) {
        if (file.size > 5 * 1024 * 1024) {
          // 5MB for images
          warnings.push("Very large image may cause performance issues");
          recommendations.push("Consider resizing image to under 5MB");
        }
      }

      if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
        const duration = await getMediaDuration(file);
        if (duration && duration > 300) {
          // 5 minutes
          warnings.push("Long audio/video files may impact app performance");
          recommendations.push("Consider trimming to under 5 minutes");
        }
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
