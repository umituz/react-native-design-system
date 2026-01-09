/**
 * File Reader Service
 * Single Responsibility: Read files from device storage
 */

import { File } from "expo-file-system";
import type { FileEncoding } from "../../domain/entities/File";
import { blobToBase64 } from "../utils/blob.utils";

/**
 * Read file as string with encoding
 */
export async function readFile(
  uri: string,
  encoding: FileEncoding = "utf8",
): Promise<string | null> {
  try {
    // For file:// URLs, try fetch first (works in React Native)
    if (uri.startsWith("file://")) {
      try {
        const response = await fetch(uri);
        if (response.ok) {
          if (encoding === "base64") {
            const blob = await response.blob();
            return await blobToBase64(blob);
          }
          return await response.text();
        }
      } catch {
        // Fall through to FileSystem API
      }
    }

    // Use FileSystem API as fallback
    const file = new File(uri);
    if (encoding === "base64") {
      const content = await file.base64();
      return content;
    }
    const content = await file.text();
    return content;
  } catch {
    return null;
  }
}

/**
 * Read file as base64 string
 */
export async function readFileAsBase64(uri: string): Promise<string | null> {
  return readFile(uri, "base64");
}
