/**
 * Card Multimedia Flashcard Hooks
 * Main hook and exports for card multimedia functionality
 */

import React from "react";
import { calculateTotalSize, extractMediaTypes } from "../../infrastructure/utils/media-collection-utils";
import type { UseCardMultimediaFlashcardResult } from "./card-multimedia.types";
import type {
  CardMediaAttachment,
  CardMultimediaFlashcard,
  CreateCardMultimediaData,
} from "../../domain/entities/CardMultimedia.types";

// Export individual hooks
export { useCardMediaUpload } from "./useCardMediaUpload";
export { useCardMediaGeneration } from "./useCardMediaGeneration";
export { useCardMediaValidation } from "./useCardMediaValidation";

// Export types
export type {
  UseCardMediaUploadResult,
  UseCardMediaGenerationResult,
  UseCardMediaValidationResult,
  UseCardMultimediaFlashcardResult,
} from "./card-multimedia.types";

/**
 * Main hook for card multimedia flashcard operations
 */
export const useCardMultimediaFlashcard =
  (): UseCardMultimediaFlashcardResult => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCardMultimedia = useCallback(
      async (cardData: CreateCardMultimediaData): Promise<CardMultimediaFlashcard> => {
        try {
          setIsProcessing(true);
          setError(null);

          // Simulate card creation
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const card: CardMultimediaFlashcard = {
            id: `card_multimedia_${Date.now()}`,
            front: cardData.front || "",
            back: cardData.back || "",
            difficulty: cardData.difficulty || "medium",
            tags: cardData.tags || [],
            media: cardData.media || [],
            hasMedia: (cardData.media || []).length > 0,
            mediaType: extractMediaTypes(cardData.media || []),
            isDownloaded: (cardData.media || []).every(
              (m: CardMediaAttachment) => m.isDownloaded,
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

    const updateCardMedia = useCallback(
      async (
        _cardId: string,
        _media: CardMediaAttachment[],
      ): Promise<CardMultimediaFlashcard> => {
        // Mock implementation
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {} as CardMultimediaFlashcard;
      },
      [],
    );

    const deleteCardMedia = useCallback(
      async (_attachmentId: string): Promise<void> => {
        // Mock implementation
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      [],
    );

    return {
      createCardMultimedia,
      updateCardMedia,
      deleteCardMedia,
      isProcessing,
      error,
    };
  };
