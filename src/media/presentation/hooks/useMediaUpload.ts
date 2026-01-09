/**
 * Media Upload Hook
 * Hook for uploading media files
 */

import React from "react";
import {
  generateThumbnail,
  getMediaDuration,
  getMediaType,
} from "../../infrastructure/utils/mediaHelpers";
import type { UseMediaUploadResult } from "./multimedia.types";
import type {
  MediaAttachment,
  MediaCompressionOptions,
  MediaUploadProgress,
} from "../../domain/entities/MultimediaFlashcardTypes";

export const useMediaUpload = (): UseMediaUploadResult => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] =
    React.useState<MediaUploadProgress | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const uploadMedia = React.useCallback(
    async (file: any, options?: MediaCompressionOptions) => {
      try {
        setIsUploading(true);
        setError(null);

        // Simulate upload progress
        setUploadProgress({
          fileId: `upload_${Date.now()}`,
          progress: 0,
          status: "uploading",
        });

        // Simulate progress updates
        for (let i = 1; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setUploadProgress((prev) => (prev ? { ...prev, progress: i } : null));
        }

        const attachment: MediaAttachment = {
          id: `media_${Date.now()}`,
          type: getMediaType(file.type),
          position: "both",
          url: `https://storage.example.com/media/${Date.now()}_${file.name}`,
          filename: file.name,
          fileSize: file.size || 100000,
          mimeType: file.type,
          duration: await getMediaDuration(file),
          thumbnailUrl: generateThumbnail(file),
          caption: "",
          isDownloaded: true,
          createdAt: new Date().toISOString(),
        };

        setUploadProgress({
          fileId: `upload_${Date.now()}`,
          progress: 100,
          status: "completed",
          url: attachment.url,
        });

        return attachment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        setError(errorMessage);
        setIsUploading(false);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [],
  );

  return {
    uploadMedia,
    isUploading,
    uploadProgress,
    error,
  };
};
