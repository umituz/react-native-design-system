/**
 * Media Domain - Media Picker Service
 *
 * Service for picking images/videos using expo-image-picker.
 * Handles camera, gallery, and media library permissions.
 */

import * as ImagePicker from "expo-image-picker";
import type {
  MediaPickerOptions,
  MediaPickerResult,
  CameraOptions,
} from "../../domain/entities/Media";
import {
  MediaLibraryPermission,
  MediaType,
  MediaValidationError,
  MEDIA_CONSTANTS,
} from "../../domain/entities/Media";
import {
  mapMediaType,
  mapPermissionStatus,
  mapPickerResult,
} from "../utils/mediaPickerMappers";

/**
 * Media picker service for selecting images/videos
 */
export class MediaPickerService {
  static async requestCameraPermission(): Promise<MediaLibraryPermission> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return mapPermissionStatus(status);
    } catch {
      return MediaLibraryPermission.DENIED;
    }
  }

  static async requestMediaLibraryPermission(): Promise<MediaLibraryPermission> {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return mapPermissionStatus(status);
    } catch {
      return MediaLibraryPermission.DENIED;
    }
  }

  static async getCameraPermissionStatus(): Promise<MediaLibraryPermission> {
    try {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      return mapPermissionStatus(status);
    } catch {
      return MediaLibraryPermission.DENIED;
    }
  }

  static async getMediaLibraryPermissionStatus(): Promise<MediaLibraryPermission> {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      return mapPermissionStatus(status);
    } catch {
      return MediaLibraryPermission.DENIED;
    }
  }

  static async launchCamera(
    options?: CameraOptions
  ): Promise<MediaPickerResult> {
    try {
      const permission = await MediaPickerService.requestCameraPermission();
      if (permission === MediaLibraryPermission.DENIED) {
        return { canceled: true };
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: options?.allowsEditing ?? false,
        aspect: options?.aspect,
        quality: options?.quality ?? MEDIA_CONSTANTS.DEFAULT_QUALITY,
        base64: options?.base64 ?? false,
      });

      return mapPickerResult(result);
    } catch {
      return { canceled: true };
    }
  }

  static async launchCameraForVideo(
    options?: CameraOptions
  ): Promise<MediaPickerResult> {
    try {
      const permission = await MediaPickerService.requestCameraPermission();
      if (permission === MediaLibraryPermission.DENIED) {
        return { canceled: true };
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["videos"],
        allowsEditing: options?.allowsEditing ?? false,
        quality: options?.quality ?? MEDIA_CONSTANTS.DEFAULT_QUALITY,
        videoMaxDuration: options?.videoMaxDuration,
      });

      return mapPickerResult(result);
    } catch {
      return { canceled: true };
    }
  }

  static async pickImage(
    options?: MediaPickerOptions
  ): Promise<MediaPickerResult> {
    try {
      const permission =
        await MediaPickerService.requestMediaLibraryPermission();
      if (permission === MediaLibraryPermission.DENIED) {
        return {
          canceled: true,
          error: MediaValidationError.PERMISSION_DENIED,
          errorMessage: "Permission to access media library was denied",
        };
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mapMediaType(options?.mediaTypes),
        allowsEditing: options?.allowsEditing ?? false,
        allowsMultipleSelection: options?.allowsMultipleSelection ?? false,
        aspect: options?.aspect,
        quality: options?.quality ?? MEDIA_CONSTANTS.DEFAULT_QUALITY,
        selectionLimit:
          options?.selectionLimit ?? MEDIA_CONSTANTS.DEFAULT_SELECTION_LIMIT,
        base64: options?.base64 ?? false,
      });

      const mappedResult = mapPickerResult(result);

      // Validate file size if not canceled and has assets
      if (!mappedResult.canceled && mappedResult.assets && mappedResult.assets.length > 0) {
        const maxSizeMB = options?.maxFileSizeMB ?? MEDIA_CONSTANTS.MAX_IMAGE_SIZE_MB;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        for (const asset of mappedResult.assets) {
          if (asset.fileSize && asset.fileSize > maxSizeBytes) {
            return {
              canceled: true,
              error: MediaValidationError.FILE_TOO_LARGE,
              errorMessage: `File size exceeds ${maxSizeMB}MB limit`,
            };
          }
        }
      }

      return mappedResult;
    } catch {
      return { canceled: true };
    }
  }

  static async pickSingleImage(
    options?: Omit<MediaPickerOptions, "allowsMultipleSelection">
  ): Promise<MediaPickerResult> {
    return MediaPickerService.pickImage({
      ...options,
      allowsMultipleSelection: false,
    });
  }

  static async pickMultipleImages(
    options?: Omit<MediaPickerOptions, "allowsMultipleSelection">
  ): Promise<MediaPickerResult> {
    return MediaPickerService.pickImage({
      ...options,
      allowsMultipleSelection: true,
    });
  }

  static async pickVideo(
    options?: Omit<MediaPickerOptions, "mediaTypes">
  ): Promise<MediaPickerResult> {
    return MediaPickerService.pickImage({
      ...options,
      mediaTypes: MediaType.VIDEO,
    });
  }

  static async pickMedia(
    options?: MediaPickerOptions
  ): Promise<MediaPickerResult> {
    return MediaPickerService.pickImage({
      ...options,
      mediaTypes: MediaType.ALL,
    });
  }
}
