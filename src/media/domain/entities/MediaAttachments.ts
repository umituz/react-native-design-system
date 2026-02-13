/**
 * Media Attachments Types
 * Types for media attachments in flashcards and content
 */

export type MediaAttachmentType = "image" | "audio" | "video";
export type MediaPosition = "front" | "back" | "both";

export interface MediaAttachment {
  id: string;
  type: MediaAttachmentType;
  position: MediaPosition;
  url: string;
  localPath?: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  duration?: number;
  thumbnailUrl?: string;
  caption?: string;
  isDownloaded: boolean;
  createdAt: string;
}

export interface MultimediaFlashcard {
  id: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  media: MediaAttachment[];
  hasMedia: boolean;
  mediaType: MediaAttachmentType[];
  isDownloaded: boolean;
  estimatedSize: number;
}

export interface MediaGenerationRequest {
  type: "text_to_image" | "text_to_audio" | "image_search";
  input: {
    text?: string;
    prompt?: string;
    language?: string;
    voice?: "male" | "female" | "neutral";
    style?: "realistic" | "cartoon" | "artistic";
  };
  options: {
    maxResults?: number;
    quality?: "low" | "medium" | "high";
    format?: "jpeg" | "png" | "mp3" | "wav";
  };
}

export interface MediaGenerationResult {
  success: boolean;
  attachments: MediaAttachment[];
  creditsUsed: number;
  processingTime: number;
  error?: string;
  requestId: string;
}

export interface MediaUploadProgress {
  fileId: string;
  progress: number;
  status: "uploading" | "processing" | "completed" | "error";
  error?: string;
  url?: string;
}

export interface MediaCompressionOptions {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  maxFileSize?: number;
  format?: "jpeg" | "png" | "webp";
}

export interface MediaFile {
  name: string;
  type: string;
  size: number;
  uri?: string;
}

export interface CreateMultimediaCardData {
  front: string;
  back: string;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
  media?: MediaAttachment[];
}

export interface MediaValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}
