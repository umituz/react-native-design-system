/**
 * Multimedia Flashcard Hook Types
 * Type definitions for multimedia hooks
 */

import type {
  MediaAttachment,
  MediaFile,
  MediaGenerationRequest,
  MediaGenerationResult,
  MediaCompressionOptions,
  MediaValidation,
  MediaUploadProgress,
  MultimediaFlashcard,
  CreateMultimediaCardData,
} from "../../domain/entities/MediaAttachments";

export interface UseMediaUploadResult {
  uploadMedia: (
    file: MediaFile,
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
  validateMedia: (file: MediaFile) => Promise<MediaValidation>;
  isValidating: boolean;
  validation: MediaValidation | null;
  error: string | null;
}

export interface UseMultimediaFlashcardResult {
  createMultimediaCard: (cardData: CreateMultimediaCardData) => Promise<MultimediaFlashcard>;
  updateMedia: (
    cardId: string,
    media: MediaAttachment[],
  ) => Promise<MultimediaFlashcard>;
  deleteMedia: (attachmentId: string) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
}
