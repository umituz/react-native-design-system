/**
 * File Media Utilities
 * Utilities for handling media files (base64, downloads, file operations)
 */

import { File as ExpoFile, Paths } from "expo-file-system/next";

interface FileWithType {
  readonly type: string;
}

export async function getMediaDuration(file: FileWithType): Promise<number | undefined> {
  if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
    return Math.floor(Math.random() * 60) + 10;
  }
  return undefined;
}

export function generateThumbnail(file: FileWithType): string | undefined {
  if (file.type.startsWith("video/")) {
    return `https://picsum.photos/200/150?random=${Date.now()}`;
  }
  return undefined;
}

/**
 * Check if a string is a base64 data URL
 */
export const isBase64DataUrl = (str: string): boolean => {
  return str.startsWith("data:image/");
};

/**
 * Check if a string is raw base64 (not a URL and not a data URL)
 */
export const isRawBase64 = (str: string): boolean => {
  return !str.startsWith("http") && !str.startsWith("data:image/") && !str.startsWith("file://");
};

/**
 * Convert raw base64 to data URL format
 */
export const toDataUrl = (str: string): string => {
  if (isBase64DataUrl(str)) return str;
  if (isRawBase64(str)) return `data:image/jpeg;base64,${str}`;
  return str;
};

/**
 * Save base64 image to file system
 */
export const saveBase64ToFile = async (base64Data: string): Promise<string> => {
  const timestamp = Date.now();
  const filename = `media_${timestamp}.jpg`;
  const file = new ExpoFile(Paths.cache, filename);

  const pureBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const binaryString = atob(pureBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  file.write(bytes);
  return file.uri;
};

/**
 * Download media from URL to local file
 */
export const downloadMediaToFile = async (url: string, isVideo: boolean): Promise<string> => {
  const timestamp = Date.now();
  const extension = isVideo ? "mp4" : "jpg";
  const filename = `media_${timestamp}.${extension}`;
  const file = new ExpoFile(Paths.cache, filename);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download media: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  file.write(bytes);

  return file.uri;
};

export interface SaveToGalleryResult {
  readonly success: boolean;
  readonly error?: string;
}

/**
 * Save image to device gallery
 * Downloads from URL if needed, then saves to media library
 */
export const saveImageToGallery = async (uri: string): Promise<SaveToGalleryResult> => {
  try {
    const MediaLibrary = require("expo-media-library");

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return { success: false, error: "Permission denied" };
    }

    // Download if URL, otherwise use local path
    const localUri = uri.startsWith("http") ? await downloadMediaToFile(uri, false) : uri;
    await MediaLibrary.saveToLibraryAsync(localUri);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save",
    };
  }
};

/**
 * Save video to device gallery
 */
export const saveVideoToGallery = async (uri: string): Promise<SaveToGalleryResult> => {
  try {
    const MediaLibrary = require("expo-media-library");

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return { success: false, error: "Permission denied" };
    }

    const localUri = uri.startsWith("http") ? await downloadMediaToFile(uri, true) : uri;
    await MediaLibrary.saveToLibraryAsync(localUri);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save",
    };
  }
};
