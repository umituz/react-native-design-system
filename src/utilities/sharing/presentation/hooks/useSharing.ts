/**
 * Sharing Domain - useSharing Hook
 *
 * React hook for sharing files.
 * Provides system share sheet functionality with state management.
 *
 * @domain sharing
 * @layer presentation/hooks
 */

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { SharingService } from '../../infrastructure/services/SharingService';
import type { ShareOptions } from '../../domain/entities/Share';

/**
 * useSharing hook for sharing files via system share sheet
 *
 * USAGE:
 * ```typescript
 * const { share, shareWithAutoType, isAvailable, isSharing } = useSharing();
 *
 * // Check availability
 * if (!isAvailable) {
 *   return <Text>Sharing not available</Text>;
 * }
 *
 * // Basic share
 * const handleShare = async () => {
 *   await share('file:///path/to/file.jpg', {
 *     dialogTitle: 'Share Photo',
 *     mimeType: 'image/jpeg',
 *   });
 * };
 *
 * // Auto-detect MIME type
 * const handleShareAuto = async () => {
 *   await shareWithAutoType(
 *     'file:///path/to/document.pdf',
 *     'document.pdf',
 *     'Share Document'
 *   );
 * };
 * ```
 */
export const useSharing = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track mounted state to prevent setState on unmounted component
  const isMountedRef = useRef(true);

  /**
   * Check sharing availability on mount
   */
  useEffect(() => {
    const checkAvailability = async () => {
      const available = await SharingService.isAvailable();
      if (isMountedRef.current) {
        setIsAvailable(available);
      }
    };

    checkAvailability();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Share a file via system share sheet
   */
  const share = useCallback(async (uri: string, options?: ShareOptions): Promise<boolean> => {
    if (isMountedRef.current) {
      setIsSharing(true);
      setError(null);
    }

    try {
      const result = await SharingService.shareFile(uri, options);

      if (!result.success && isMountedRef.current) {
        setError(result.error || 'Failed to share file');
        return false;
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to share file';
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      return false;
    } finally {
      if (isMountedRef.current) {
        setIsSharing(false);
      }
    }
  }, []);

  /**
   * Share file with automatic MIME type detection
   */
  const shareWithAutoType = useCallback(
    async (uri: string, filename: string, dialogTitle?: string): Promise<boolean> => {
      if (isMountedRef.current) {
        setIsSharing(true);
        setError(null);
      }

      try {
        const result = await SharingService.shareWithAutoType(uri, filename, dialogTitle);

        if (!result.success && isMountedRef.current) {
          setError(result.error || 'Failed to share file');
          return false;
        }

        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to share file';
        if (isMountedRef.current) {
          setError(errorMessage);
        }
        return false;
      } finally {
        if (isMountedRef.current) {
          setIsSharing(false);
        }
      }
    },
    []
  );

  /**
   * Share multiple files
   */
  const shareMultiple = useCallback(
    async (uris: string[], options?: ShareOptions): Promise<boolean> => {
      if (isMountedRef.current) {
        setIsSharing(true);
        setError(null);
      }

      try {
        const result = await SharingService.shareMultipleFiles(uris, options);

        if (!result.success && isMountedRef.current) {
          setError(result.error || 'Failed to share files');
          return false;
        }

        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to share files';
        if (isMountedRef.current) {
          setError(errorMessage);
        }
        return false;
      } finally {
        if (isMountedRef.current) {
          setIsSharing(false);
        }
      }
    },
    []
  );

  return useMemo(() => ({
    // Functions
    share,
    shareWithAutoType,
    shareMultiple,

    // State
    isAvailable,
    isSharing,
    error,
  }), [share, shareWithAutoType, shareMultiple, isAvailable, isSharing, error]);
};
