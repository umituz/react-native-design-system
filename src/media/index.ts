/**
 * @umituz/react-native-media - Enhanced Public API
 *
 * Media picking capabilities for React Native apps
 * Includes multimedia flashcard support
 *
 * Usage:
 *   import {
 *     useMedia,
 *     useMultimediaFlashcard,
 *     MultimediaFlashcardService,
 *     type MediaAttachment,
 *     type MultimediaFlashcard,
 *   } from '@umituz/react-native-media';
 */

// Domain Layer - Original Media Entities
export {
  MediaType,
  ImageFormat as MediaImageFormat,
  MediaQuality,
  MediaLibraryPermission,
  MediaValidationError,
  MEDIA_CONSTANTS,
} from "./domain/entities/Media";

export { IMAGE_MIME_TYPES as MEDIA_IMAGE_MIME_TYPES, MediaUtils } from "./domain/utils/MediaUtils";

export type {
  MediaAsset,
  MediaPickerResult,
  MediaPickerOptions,
  CameraOptions,
  ImageDimensions as MediaImageDimensions,
  ImageManipulationActions,
  ImageSaveOptions as MediaImageSaveOptions,
} from "./domain/entities/Media";

// Infrastructure Layer - Original Media Services
export { MediaPickerService } from "./infrastructure/services/MediaPickerService";
export { MediaSaveService } from "./infrastructure/services/MediaSaveService";
export type { SaveResult, SaveOptions } from "./infrastructure/services/MediaSaveService";

// Presentation Layer - Original Media Hooks
export { useMedia } from "./presentation/hooks/useMedia";

// URL Media Detection
export {
  getMediaTypeFromUrl,
  isVideoUrl,
  isImageUrl,
  isAudioUrl,
  type UrlMediaType,
} from "./infrastructure/utils/url-media-detector";

// MIME Type Detection
export {
  getMediaTypeFromMime,
  isVideoMime,
  isImageMime,
  isAudioMime,
  type MimeMediaType,
} from "./infrastructure/utils/mime-type-detector";

// Media URL Extraction
export {
  extractMediaUrl,
  extractVideoUrl,
  extractImageUrl,
  type MediaUrlResult,
} from "./infrastructure/utils/media-url-extractor";

// Media Collection Utilities
export {
  extractMediaTypes,
  calculateTotalSize,
  formatFileSize,
} from "./infrastructure/utils/media-collection-utils";

// File Media Utilities
export {
  getMediaDuration,
  generateThumbnail,
  isBase64DataUrl,
  isRawBase64,
  toDataUrl,
  saveBase64ToFile,
  downloadMediaToFile,
  saveImageToGallery,
  saveVideoToGallery,
  type SaveToGalleryResult,
} from "./infrastructure/utils/file-media-utils";

// Media Attachment Types (Clean, no aliases)
export type {
  MediaAttachmentType,
  MediaPosition,
  MediaAttachment,
  MultimediaFlashcard,
  MediaGenerationRequest,
  MediaGenerationResult,
  MediaUploadProgress,
  MediaCompressionOptions,
  MediaValidation,
  MediaFile,
  CreateMultimediaCardData,
} from "./domain/entities/MediaAttachments";

// Media Attachment Hooks
export { useMediaUpload } from "./presentation/hooks/useMediaUpload";
export { useMediaGeneration } from "./presentation/hooks/useMediaGeneration";
export { useMediaValidation } from "./presentation/hooks/useMediaValidation";
export { useMultimediaFlashcard } from "./presentation/hooks/useMultimediaFlashcard";
export type {
  UseMediaUploadResult,
  UseMediaGenerationResult,
  UseMediaValidationResult,
  UseMultimediaFlashcardResult,
} from "./presentation/hooks/multimedia.types";

// Media Attachment Services
export { MultimediaFlashcardService } from "./infrastructure/services/MultimediaFlashcardService";
