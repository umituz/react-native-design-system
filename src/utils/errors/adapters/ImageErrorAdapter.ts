/**
 * Image Error Adapter
 *
 * Adapts image errors to unified DesignSystemError format.
 * Maintains backward compatibility with ImageError.
 */

import { DesignSystemError, ErrorCodes, ErrorCategory } from '../DesignSystemError';
import type { ErrorMetadata } from '../DesignSystemError';
import {
  ImageError,
  IMAGE_ERROR_CODES,
  type ImageErrorCode,
} from '../../../image/infrastructure/utils/ImageErrorHandler';

export class ImageErrorAdapter {
  /**
   * Map ImageErrorCode to DesignSystemError code
   */
  private static mapErrorCode(code: ImageErrorCode): string {
    switch (code) {
      case IMAGE_ERROR_CODES.INVALID_URI:
      case IMAGE_ERROR_CODES.INVALID_DIMENSIONS:
      case IMAGE_ERROR_CODES.INVALID_QUALITY:
      case IMAGE_ERROR_CODES.VALIDATION_ERROR:
        return ErrorCodes.VALIDATION_ERROR;

      case IMAGE_ERROR_CODES.MANIPULATION_FAILED:
      case IMAGE_ERROR_CODES.CONVERSION_FAILED:
        return ErrorCodes.IMAGE_LOAD_ERROR;

      case IMAGE_ERROR_CODES.STORAGE_FAILED:
        return ErrorCodes.STORAGE_ERROR;

      default:
        return ErrorCodes.UNKNOWN_ERROR;
    }
  }

  /**
   * Create a DesignSystemError for image operations
   */
  static create(
    message: string,
    code: ImageErrorCode,
    operation?: string
  ): DesignSystemError {
    const metadata: ErrorMetadata = {
      category: ErrorCategory.IMAGE,
      operation,
      retryable: code === IMAGE_ERROR_CODES.MANIPULATION_FAILED,
    };

    return new DesignSystemError(
      message,
      this.mapErrorCode(code),
      { imageErrorCode: code, operation },
      metadata
    );
  }

  /**
   * Convert legacy ImageError to DesignSystemError
   */
  static fromImageError(error: ImageError): DesignSystemError {
    return this.create(error.message, error.code as ImageErrorCode, error.operation);
  }

  /**
   * Handle unknown image errors
   */
  static handleUnknown(error: unknown, operation?: string): DesignSystemError {
    if (error instanceof ImageError) {
      return this.fromImageError(error);
    }

    const message = error instanceof Error ? error.message : 'Unknown image error occurred';

    return new DesignSystemError(
      message,
      ErrorCodes.IMAGE_LOAD_ERROR,
      { operation },
      {
        category: ErrorCategory.IMAGE,
        operation,
        cause: error,
        retryable: true,
      }
    );
  }
}
