/**
 * Card Multimedia Flashcard Service
 * Media attachments for flashcards - Main entry point
 */

import type {
  CardMediaAttachment,
  CardMediaGenerationRequest,
  CardMediaGenerationResult,
  CardMediaCompressionOptions,
  CardMediaValidation,
  CardMultimediaFlashcardService as ICardMultimediaFlashcardService,
} from "../../domain/entities/CardMultimedia.types";
import { CardMediaUploadService } from "./CardMediaUploadService";
import { CardMediaGenerationService } from "./CardMediaGenerationService";
import { CardMediaValidationService } from "./CardMediaValidationService";
import { CardMediaOptimizerService } from "./CardMediaOptimizerService";

export class CardMultimediaFlashcardService implements ICardMultimediaFlashcardService {
  private static instance: CardMultimediaFlashcardService;
  private uploadService: CardMediaUploadService;
  private generationService: CardMediaGenerationService;
  private validationService: CardMediaValidationService;
  private optimizerService: CardMediaOptimizerService;

  private constructor() {
    this.uploadService = new CardMediaUploadService();
    this.generationService = new CardMediaGenerationService();
    this.validationService = new CardMediaValidationService();
    this.optimizerService = new CardMediaOptimizerService();
  }

  static getInstance(): CardMultimediaFlashcardService {
    if (!CardMultimediaFlashcardService.instance) {
      CardMultimediaFlashcardService.instance =
        new CardMultimediaFlashcardService();
    }
    return CardMultimediaFlashcardService.instance;
  }

  /**
   * Upload media file with optional compression
   */
  async uploadMedia(
    file: any,
    options?: CardMediaCompressionOptions,
  ): Promise<CardMediaAttachment> {
    return this.uploadService.uploadMedia(file, options);
  }

  /**
   * Generate media from AI (text-to-image, text-to-audio, etc.)
   */
  async generateMedia(
    request: CardMediaGenerationRequest,
  ): Promise<CardMediaGenerationResult> {
    return this.generationService.generateMedia(request);
  }

  /**
   * Validate media file before upload
   */
  async validateMedia(file: any): Promise<CardMediaValidation> {
    return this.validationService.validateMedia(file);
  }

  /**
   * Optimize media file
   */
  async optimizeMedia(
    attachment: CardMediaAttachment,
    options: CardMediaCompressionOptions,
  ): Promise<CardMediaAttachment> {
    return this.optimizerService.optimizeMedia(attachment, options);
  }

  /**
   * Delete media attachment
   */
  async deleteMedia(attachmentId: string): Promise<void> {
    return this.optimizerService.deleteMedia(attachmentId);
  }

  /**
   * Get media URL
   */
  async getMediaUrl(attachmentId: string): Promise<string> {
    return this.uploadService.getMediaUrl(attachmentId);
  }

  /**
   * Download media to local storage
   */
  async downloadMedia(attachmentId: string): Promise<string> {
    return this.uploadService.downloadMedia(attachmentId);
  }
}
