/**
 * Card Media Generation Hook
 * Hook for generating card media with AI
 * Now a thin wrapper around useGenericMediaGeneration
 *
 * Note: CardMedia types are aliases of Media types for backward compatibility
 */

import { useGenericMediaGeneration } from "../../infrastructure/hooks/useGenericMediaGeneration";
import type { UseCardMediaGenerationResult } from "./card-multimedia.types";
import type {
  MediaAttachment as CardMediaAttachment,
  MediaGenerationRequest as CardMediaGenerationRequest,
} from "../../domain/entities/MultimediaFlashcardTypes";

export const useCardMediaGeneration = (): UseCardMediaGenerationResult => {
  return useGenericMediaGeneration<CardMediaAttachment, CardMediaGenerationRequest>(
    (baseAttachment) => baseAttachment as CardMediaAttachment
  );
};
