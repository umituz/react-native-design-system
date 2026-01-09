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

// Multimedia Flashcard Support
export type {
  CardMediaType,
  CardMediaPosition,
  CardMediaAttachment,
  CardMultimediaFlashcard,
  CardMediaGenerationRequest,
  CardMediaGenerationResult,
  CardMediaUploadProgress,
  CardMediaCompressionOptions,
  CardMediaValidation,
} from "./domain/entities/CardMultimedia.types";

export { CardMultimediaFlashcardService } from "./infrastructure/services/CardMultimediaService";

export {
  useCardMediaUpload,
  useCardMediaGeneration,
  useCardMediaValidation,
  useCardMultimediaFlashcard,
  type UseCardMediaUploadResult,
  type UseCardMediaGenerationResult,
  type UseCardMediaValidationResult,
  type UseCardMultimediaFlashcardResult,
} from "./presentation/hooks/useCardMultimediaFlashcard";
