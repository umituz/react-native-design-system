/**
 * Generic Media Generation Hook
 * Shared implementation for both Media and CardMedia generation
 * Eliminates ~600 LOC duplication
 */

import { useState, useCallback } from "react";

interface GenericMediaAttachment {
  id: string;
  type: string;
  position: string;
  url: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  duration?: number;
  thumbnailUrl?: string;
  caption?: string;
  isDownloaded: boolean;
  createdAt: string;
}

interface GenericMediaGenerationRequest {
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

interface GenericMediaGenerationResult<TAttachment> {
  success: boolean;
  attachments: TAttachment[];
  creditsUsed: number;
  processingTime: number;
  error?: string;
  requestId: string;
}

export interface UseGenericMediaGenerationResult<TAttachment, TRequest> {
  generateMedia: (request: TRequest) => Promise<GenericMediaGenerationResult<TAttachment>>;
  isGenerating: boolean;
  generationResult: GenericMediaGenerationResult<TAttachment> | null;
  error: string | null;
}

/**
 * Generic implementation of media generation logic
 * Type-safe through attachment factory pattern
 */
export function useGenericMediaGeneration<
  TAttachment extends GenericMediaAttachment,
  TRequest extends GenericMediaGenerationRequest
>(
  attachmentFactory: (baseAttachment: GenericMediaAttachment) => TAttachment
): UseGenericMediaGenerationResult<TAttachment, TRequest> {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] =
    useState<GenericMediaGenerationResult<TAttachment> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMedia = useCallback(
    async (request: TRequest): Promise<GenericMediaGenerationResult<TAttachment>> => {
      try {
        setIsGenerating(true);
        setError(null);

        // Simulate generation
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const baseAttachments: GenericMediaAttachment[] = [];

        switch (request.type) {
          case "text_to_image":
            for (let i = 0; i < (request.options.maxResults || 1); i++) {
              baseAttachments.push({
                id: `ai_img_${Date.now()}_${i}`,
                type: "image",
                position: "both",
                url: `https://picsum.photos/400/300?random=${Date.now() + i}`,
                filename: `ai_generated_${i}.jpg`,
                fileSize: 150000,
                mimeType: "image/jpeg",
                isDownloaded: false,
                createdAt: new Date().toISOString(),
              });
            }
            break;

          case "text_to_audio":
            baseAttachments.push({
              id: `ai_audio_${Date.now()}`,
              type: "audio",
              position: "back",
              url: `https://example.com/audio_${Date.now()}.mp3`,
              filename: `ai_generated_${Date.now()}.mp3`,
              fileSize: 80000,
              mimeType: "audio/mp3",
              duration: 10,
              isDownloaded: false,
              createdAt: new Date().toISOString(),
            });
            break;

          case "image_search":
            for (let i = 0; i < (request.options.maxResults || 5); i++) {
              baseAttachments.push({
                id: `search_img_${Date.now()}_${i}`,
                type: "image",
                position: "both",
                url: `https://picsum.photos/400/300?random=${Date.now() + i}`,
                filename: `search_result_${i}.jpg`,
                fileSize: 120000,
                mimeType: "image/jpeg",
                isDownloaded: false,
                createdAt: new Date().toISOString(),
              });
            }
            break;
        }

        const attachments = baseAttachments.map(attachmentFactory);

        const result: GenericMediaGenerationResult<TAttachment> = {
          success: true,
          attachments,
          creditsUsed: request.type === "text_to_image" ? 5 : request.type === "text_to_audio" ? 3 : 2,
          processingTime: 3000,
          requestId: `req_${Date.now()}`,
        };

        setGenerationResult(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Generation failed";
        setError(errorMessage);
        setIsGenerating(false);

        return {
          success: false,
          attachments: [],
          creditsUsed: 0,
          processingTime: 0,
          error: errorMessage,
          requestId: "",
        };
      } finally {
        setIsGenerating(false);
      }
    },
    [attachmentFactory],
  );

  return {
    generateMedia,
    isGenerating,
    generationResult,
    error,
  };
}
