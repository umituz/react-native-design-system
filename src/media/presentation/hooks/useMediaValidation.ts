/**
 * Media Validation Hook
 * Hook for validating media files
 */

import { useState, useCallback } from "react";
import { formatFileSize } from "../../infrastructure/utils/media-collection-utils";
import type { UseMediaValidationResult } from "./multimedia.types";
import type { MediaValidation, MediaFile } from "../../domain/entities/MultimediaFlashcardTypes";

export const useMediaValidation = (): UseMediaValidationResult => {
  const [isValidating, setIsValidating] = useState(false);
  const [validation, setValidation] = useState<MediaValidation | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const validateMedia = useCallback(
    async (file: MediaFile): Promise<MediaValidation> => {
      try {
        setIsValidating(true);
        setError(null);

        // Simulate validation
        await new Promise((resolve) => setTimeout(resolve, 500));

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

        const result: MediaValidation = {
          isValid: errors.length === 0,
          errors,
          warnings,
          recommendations,
        };

        setValidation(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Validation failed";
        setError(errorMessage);
        setIsValidating(false);

        return {
          isValid: false,
          errors: [errorMessage],
          warnings: [],
          recommendations: [],
        };
      } finally {
        setIsValidating(false);
      }
    },
    [],
  );

  return {
    validateMedia,
    isValidating,
    validation,
    error,
  };
};
