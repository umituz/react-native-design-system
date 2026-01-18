/**
 * Card Media Validation Hook
 * Hook for validating card media files
 */

import React from "react";
import { formatFileSize } from "../../infrastructure/utils/media-collection-utils";
import type { UseCardMediaValidationResult } from "./card-multimedia.types";
import type { CardMediaValidation } from "../../domain/entities/CardMultimedia.types";

export const useCardMediaValidation = (): UseCardMediaValidationResult => {
  const [isValidating, setIsValidating] = React.useState(false);
  const [validation, setValidation] =
    React.useState<CardMediaValidation | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const validateMedia = React.useCallback(
    async (file: any): Promise<CardMediaValidation> => {
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

        // Media-specific validations
        if (file.type.startsWith("image/")) {
          if (file.size > 5 * 1024 * 1024) {
            // 5MB for images
            warnings.push("Very large image may cause performance issues");
            recommendations.push("Consider resizing image to under 5MB");
          }
        }

        const result: CardMediaValidation = {
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
