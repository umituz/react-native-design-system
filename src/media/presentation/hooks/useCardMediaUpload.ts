/**
 * Card Media Upload Hook
 * Hook for uploading card media files
 */

import React from "react";
import {
  generateThumbnail,
  getCardMediaType,
  getMediaDuration,
} from "../../infrastructure/utils/mediaHelpers";
import type { UseCardMediaUploadResult } from "./card-multimedia.types";
import type {
  CardMediaAttachment,
  CardMediaCompressionOptions,
  CardMediaUploadProgress,
} from "../../domain/entities/CardMultimedia.types";

export const useCardMediaUpload = (): UseCardMediaUploadResult => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] =
    React.useState<CardMediaUploadProgress | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const uploadMedia = React.useCallback(
    async (file: any, options?: CardMediaCompressionOptions) => {
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
          await new Promise((resolve) => setTimeout(resolve, 50));
          setUploadProgress((prev) => (prev ? { ...prev, progress: i } : null));
        }

        const attachment: CardMediaAttachment = {
          id: `card_media_${Date.now()}`,
          type: getCardMediaType(file.type),
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
