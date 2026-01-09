/**
 * Media Picker Mapper Utilities
 * Mapping functions for media picker operations
 */

import * as ImagePicker from "expo-image-picker";
import {
  MediaLibraryPermission,
  MediaType,
  type MediaAsset,
  type MediaPickerResult,
} from "../../domain/entities/Media";

/**
 * Map expo-image-picker permission status to MediaLibraryPermission
 */
export const mapPermissionStatus = (
  status: ImagePicker.PermissionStatus
): MediaLibraryPermission => {
  switch (status) {
    case ImagePicker.PermissionStatus.GRANTED:
      return MediaLibraryPermission.GRANTED;
    case ImagePicker.PermissionStatus.DENIED:
      return MediaLibraryPermission.DENIED;
    case ImagePicker.PermissionStatus.UNDETERMINED:
      return MediaLibraryPermission.DENIED;
    default:
      return MediaLibraryPermission.DENIED;
  }
};

/**
 * Map MediaType to expo-image-picker media types
 */
export const mapMediaType = (
  type?: MediaType
): ImagePicker.MediaType[] => {
  switch (type) {
    case MediaType.IMAGE:
      return ["images"];
    case MediaType.VIDEO:
      return ["videos"];
    case MediaType.ALL:
      return ["images", "videos"];
    default:
      return ["images"];
  }
};

/**
 * Map expo-image-picker result to MediaPickerResult
 */
export const mapPickerResult = (
  result: ImagePicker.ImagePickerResult
): MediaPickerResult => {
  if (result.canceled) {
    return { canceled: true };
  }

  const assets: MediaAsset[] = result.assets.map((asset) => ({
    uri: asset.uri,
    width: asset.width,
    height: asset.height,
    type: asset.type === "video" ? MediaType.VIDEO : MediaType.IMAGE,
    fileSize: asset.fileSize,
    fileName: asset.fileName ?? undefined,
    duration: asset.duration ?? undefined,
    base64: asset.base64 ?? undefined,
    mimeType: asset.mimeType ?? undefined,
  }));

  return {
    canceled: false,
    assets,
  };
};
