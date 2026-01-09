/**
 * Multimedia Flashcard Hook Types
 * Type definitions for multimedia hooks
 */

import type {
  MediaAttachment,
  MediaGenerationRequest,
  MediaGenerationResult,
  MediaCompressionOptions,
  MediaValidation,
  MediaUploadProgress,
  MultimediaFlashcard,
} from "../../domain/entities/MultimediaFlashcardTypes";

export interface UseMediaUploadResult {
  uploadMedia: (
    file: any,
    options?: MediaCompressionOptions,
  ) => Promise<MediaAttachment>;
  isUploading: boolean;
  uploadProgress: MediaUploadProgress | null;
  error: string | null;
}

export interface UseMediaGenerationResult {
  generateMedia: (
    request: MediaGenerationRequest,
  ) => Promise<MediaGenerationResult>;
  isGenerating: boolean;
  generationResult: MediaGenerationResult | null;
  error: string | null;
}

export interface UseMediaValidationResult {
  validateMedia: (file: any) => Promise<MediaValidation>;
  isValidating: boolean;
  validation: MediaValidation | null;
  error: string | null;
}

export interface UseMultimediaFlashcardResult {
  createMultimediaCard: (cardData: any) => Promise<MultimediaFlashcard>;
  updateMedia: (
    cardId: string,
    media: MediaAttachment[],
  ) => Promise<MultimediaFlashcard>;
  deleteMedia: (attachmentId: string) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
}
