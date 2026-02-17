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
  MediaType,
  MediaValidationError,
  MEDIA_CONSTANTS,
} from "../../domain/entities/Media";
import {
  mapMediaType,
  mapPickerResult,
} from "../utils/mediaPickerMappers";
import { PermissionManager } from "../utils/PermissionManager";
import { FileValidator } from "../../domain/utils/FileValidator";
import { ErrorHandler } from "../../../utils/errors";

/**
 * Media picker service for selecting images/videos
 */
export class MediaPickerService {
  static async launchCamera(
    options?: CameraOptions
  ): Promise<MediaPickerResult> {
    try {
      const permission = await PermissionManager.requestCameraPermission();
      if (!PermissionManager.isPermissionGranted(permission)) {
        return {
          canceled: true,
          error: MediaValidationError.PERMISSION_DENIED,
          errorMessage: "Camera permission was denied",
        };
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: options?.allowsEditing ?? false,
        aspect: options?.aspect,
        quality: options?.quality ?? MEDIA_CONSTANTS.DEFAULT_QUALITY,
        base64: options?.base64 ?? false,
      });

      return mapPickerResult(result);
    } catch (error) {
      ErrorHandler.handleAndLog(error, 'launchCamera', { options });
      return {
        canceled: true,
        error: MediaValidationError.PICKER_ERROR,
        errorMessage: "Failed to launch camera",
      };
    }
  }

  static async launchCameraForVideo(
    options?: CameraOptions
  ): Promise<MediaPickerResult> {
    try {
      const permission = await PermissionManager.requestCameraPermission();
      if (!PermissionManager.isPermissionGranted(permission)) {
        return {
          canceled: true,
          error: MediaValidationError.PERMISSION_DENIED,
          errorMessage: "Camera permission was denied",
        };
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["videos"],
        allowsEditing: options?.allowsEditing ?? false,
        quality: options?.quality ?? MEDIA_CONSTANTS.DEFAULT_QUALITY,
        videoMaxDuration: options?.videoMaxDuration,
      });

      return mapPickerResult(result);
    } catch (error) {
      ErrorHandler.handleAndLog(error, 'launchCameraForVideo', { options });
      return {
        canceled: true,
        error: MediaValidationError.PICKER_ERROR,
        errorMessage: "Failed to launch camera for video",
      };
    }
  }

  static async pickImage(
    options?: MediaPickerOptions
  ): Promise<MediaPickerResult> {
    try {
      const permission = await PermissionManager.requestMediaLibraryPermission();
      if (!PermissionManager.isPermissionGranted(permission)) {
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
        const validation = FileValidator.validateAssets(mappedResult.assets, {
          maxFileSizeMB: options?.maxFileSizeMB,
        });

        if (!validation.valid) {
          return {
            canceled: true,
            error: validation.error,
            errorMessage: validation.errorMessage,
          };
        }
      }

      return mappedResult;
    } catch (error) {
      ErrorHandler.handleAndLog(error, 'pickImage', { options });
      return {
        canceled: true,
        error: MediaValidationError.PICKER_ERROR,
        errorMessage: "Failed to pick image from library",
      };
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
