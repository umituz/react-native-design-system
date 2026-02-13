/**
 * Media Generation Hook
 * Hook for generating media with AI
 * Now a thin wrapper around useGenericMediaGeneration
 */

import { useGenericMediaGeneration } from "../../infrastructure/hooks/useGenericMediaGeneration";
import type { UseMediaGenerationResult } from "./multimedia.types";
import type {
  MediaAttachment,
  MediaGenerationRequest,
} from "../../domain/entities/MultimediaFlashcardTypes";

export const useMediaGeneration = (): UseMediaGenerationResult => {
  return useGenericMediaGeneration<MediaAttachment, MediaGenerationRequest>(
    (baseAttachment) => baseAttachment as MediaAttachment
  );
};
