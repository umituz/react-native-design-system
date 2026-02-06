/**
 * Card Multimedia Flashcard Hook Types
 * Type definitions for card multimedia hooks
 */

import type {
  CardMediaAttachment,
  CardMediaFile,
  CardMediaGenerationRequest,
  CardMediaGenerationResult,
  CardMediaCompressionOptions,
  CardMediaValidation,
  CardMediaUploadProgress,
  CardMultimediaFlashcard,
  CreateCardMultimediaData,
} from "../../domain/entities/CardMultimedia.types";

export interface UseCardMediaUploadResult {
  uploadMedia: (
    file: CardMediaFile,
    options?: CardMediaCompressionOptions,
  ) => Promise<CardMediaAttachment>;
  isUploading: boolean;
  uploadProgress: CardMediaUploadProgress | null;
  error: string | null;
}

export interface UseCardMediaGenerationResult {
  generateMedia: (
    request: CardMediaGenerationRequest,
  ) => Promise<CardMediaGenerationResult>;
  isGenerating: boolean;
  generationResult: CardMediaGenerationResult | null;
  error: string | null;
}

export interface UseCardMediaValidationResult {
  validateMedia: (file: CardMediaFile) => Promise<CardMediaValidation>;
  isValidating: boolean;
  validation: CardMediaValidation | null;
  error: string | null;
}

export interface UseCardMultimediaFlashcardResult {
  createCardMultimedia: (cardData: CreateCardMultimediaData) => Promise<CardMultimediaFlashcard>;
  updateCardMedia: (
    cardId: string,
    media: CardMediaAttachment[],
  ) => Promise<CardMultimediaFlashcard>;
  deleteCardMedia: (attachmentId: string) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
}
