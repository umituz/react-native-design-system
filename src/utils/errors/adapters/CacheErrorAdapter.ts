/**
 * Cache Error Adapter
 *
 * Adapts cache errors to unified DesignSystemError format.
 * Maintains backward compatibility with CacheError.
 */

import { DesignSystemError, ErrorCodes, ErrorCategory } from '../DesignSystemError';
import type { ErrorMetadata } from '../DesignSystemError';
import { CacheError } from '../../../storage/cache/domain/ErrorHandler';

export class CacheErrorAdapter {
  /**
   * Create a DesignSystemError for cache operations
   */
  static create(message: string, context: string, cause?: unknown): DesignSystemError {
    const metadata: ErrorMetadata = {
      category: ErrorCategory.CACHE,
      operation: context,
      cause,
      retryable: true,
    };

    return new DesignSystemError(
      `${context}: ${message}`,
      ErrorCodes.CACHE_ERROR,
      { context },
      metadata
    );
  }

  /**
   * Convert legacy CacheError to DesignSystemError
   */
  static fromCacheError(error: CacheError): DesignSystemError {
    return new DesignSystemError(
      error.message,
      ErrorCodes.CACHE_ERROR,
      { cacheErrorCode: error.code },
      {
        category: ErrorCategory.CACHE,
        retryable: true,
      }
    );
  }

  /**
   * Handle with timeout (replaces cache ErrorHandler.withTimeout)
   */
  static async withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    context: string
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(
          this.create(
            `Operation timed out after ${timeoutMs}ms`,
            context
          )
        );
      }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }
}
