/**
 * Multimedia Flashcard Service
 * Media attachments for flashcards - Main entry point
 */

import type {
  MediaAttachment,
  MediaGenerationRequest,
  MediaGenerationResult,
  MediaCompressionOptions,
  MediaValidation,
} from "../../domain/entities/MultimediaFlashcardTypes";
import { MediaUploadService } from "./MediaUploadService";
import { MediaGenerationService } from "./MediaGenerationService";
import { MediaValidationService } from "./MediaValidationService";
import { MediaOptimizerService } from "./MediaOptimizerService";

export class MultimediaFlashcardService {
  private static instance: MultimediaFlashcardService;
  private uploadService: MediaUploadService;
  private generationService: MediaGenerationService;
  private validationService: MediaValidationService;
  private optimizerService: MediaOptimizerService;

  private constructor() {
    this.uploadService = new MediaUploadService();
    this.generationService = new MediaGenerationService();
    this.validationService = new MediaValidationService();
    this.optimizerService = new MediaOptimizerService();
  }

  static getInstance(): MultimediaFlashcardService {
    if (!MultimediaFlashcardService.instance) {
      MultimediaFlashcardService.instance = new MultimediaFlashcardService();
    }
    return MultimediaFlashcardService.instance;
  }

  /**
   * Upload media file with optional compression
   */
  async uploadMedia(
    file: any,
    options?: MediaCompressionOptions,
  ): Promise<MediaAttachment> {
    return this.uploadService.uploadMedia(file, options);
  }

  /**
   * Generate media from AI (text-to-image, text-to-audio, etc.)
   */
  async generateMedia(
    request: MediaGenerationRequest,
  ): Promise<MediaGenerationResult> {
    return this.generationService.generateMedia(request);
  }

  /**
   * Validate media file before upload
   */
  async validateMedia(file: any): Promise<MediaValidation> {
    return this.validationService.validateMedia(file);
  }

  /**
   * Optimize media file
   */
  async optimizeMedia(
    attachment: MediaAttachment,
    options: MediaCompressionOptions,
  ): Promise<MediaAttachment> {
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
