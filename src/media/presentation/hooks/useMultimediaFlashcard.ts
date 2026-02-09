/**
 * Multimedia Flashcard Hooks
 * Main hook and exports for multimedia functionality
 */

import { useState, useCallback } from "react";
import { calculateTotalSize, extractMediaTypes } from "../../infrastructure/utils/media-collection-utils";
import type { UseMultimediaFlashcardResult } from "./multimedia.types";
import type {
  MediaAttachment,
  MultimediaFlashcard,
  CreateMultimediaCardData,
} from "../../domain/entities/MultimediaFlashcardTypes";

// Export individual hooks
export { useMediaUpload } from "./useMediaUpload";
export { useMediaGeneration } from "./useMediaGeneration";
export { useMediaValidation } from "./useMediaValidation";

// Export types
export type {
  UseMediaUploadResult,
  UseMediaGenerationResult,
  UseMediaValidationResult,
  UseMultimediaFlashcardResult,
} from "./multimedia.types";

/**
 * Main hook for multimedia flashcard operations
 */
export const useMultimediaFlashcard = (): UseMultimediaFlashcardResult => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMultimediaCard = useCallback(
    async (cardData: CreateMultimediaCardData): Promise<MultimediaFlashcard> => {
      try {
        setIsProcessing(true);
        setError(null);

        // Simulate card creation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const card: MultimediaFlashcard = {
          id: `card_${Date.now()}`,
          front: cardData.front || "",
          back: cardData.back || "",
          difficulty: cardData.difficulty || "medium",
          tags: cardData.tags || [],
          media: cardData.media || [],
          hasMedia: (cardData.media || []).length > 0,
          mediaType: extractMediaTypes(cardData.media || []),
          isDownloaded: (cardData.media || []).every(
            (m: MediaAttachment) => m.isDownloaded,
          ),
          estimatedSize: calculateTotalSize(cardData.media || []),
          createdAt: new Date().toISOString(),
        };

        return card;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Card creation failed";
        setError(errorMessage);
        setIsProcessing(false);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  const updateMedia = useCallback(
    async (
      _cardId: string,
      _media: MediaAttachment[],
    ): Promise<MultimediaFlashcard> => {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {} as MultimediaFlashcard;
    },
    [],
  );

  const deleteMedia = useCallback(
    async (_attachmentId: string): Promise<void> => {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    [],
  );

  return {
    createMultimediaCard,
    updateMedia,
    deleteMedia,
    isProcessing,
    error,
  };
};
