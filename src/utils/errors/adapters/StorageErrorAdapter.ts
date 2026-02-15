/**
 * Storage Error Adapter
 *
 * Adapts storage errors to unified DesignSystemError format.
 * Maintains backward compatibility with StorageError hierarchy.
 */

import { DesignSystemError, ErrorCodes, ErrorCategory } from '../DesignSystemError';
import type { ErrorMetadata } from '../DesignSystemError';
import {
  StorageError,
  StorageReadError,
  StorageWriteError,
  StorageDeleteError,
  StorageSerializationError,
  StorageDeserializationError,
} from '../../../storage/domain/errors/StorageError';

export class StorageErrorAdapter {
  /**
   * Create a DesignSystemError for storage read failures
   */
  static readError(key: string, cause?: unknown): DesignSystemError {
    const metadata: ErrorMetadata = {
      category: ErrorCategory.STORAGE,
      operation: 'read',
      key,
      cause,
      retryable: true,
    };

    return new DesignSystemError(
      `Failed to read from storage: ${key}`,
      ErrorCodes.STORAGE_ERROR,
      { key },
      metadata
    );
  }

  /**
   * Create a DesignSystemError for storage write failures
   */
  static writeError(key: string, cause?: unknown): DesignSystemError {
    const metadata: ErrorMetadata = {
      category: ErrorCategory.STORAGE,
      operation: 'write',
      key,
      cause,
      retryable: true,
    };

    return new DesignSystemError(
      `Failed to write to storage: ${key}`,
      ErrorCodes.STORAGE_ERROR,
      { key },
      metadata
    );
  }

  /**
   * Create a DesignSystemError for storage delete failures
   */
  static deleteError(key: string, cause?: unknown): DesignSystemError {
    const metadata: ErrorMetadata = {
      category: ErrorCategory.STORAGE,
      operation: 'delete',
      key,
      cause,
      retryable: true,
    };

    return new DesignSystemError(
      `Failed to delete from storage: ${key}`,
      ErrorCodes.STORAGE_ERROR,
      { key },
      metadata
    );
  }

  /**
   * Convert legacy StorageError to DesignSystemError
   */
  static fromStorageError(error: StorageError): DesignSystemError {
    let operation = 'unknown';

    if (error instanceof StorageReadError) operation = 'read';
    else if (error instanceof StorageWriteError) operation = 'write';
    else if (error instanceof StorageDeleteError) operation = 'delete';
    else if (error instanceof StorageSerializationError) operation = 'serialize';
    else if (error instanceof StorageDeserializationError) operation = 'deserialize';

    const cause = 'cause' in error ? error.cause : undefined;

    return new DesignSystemError(
      error.message,
      ErrorCodes.STORAGE_ERROR,
      { key: error.key },
      {
        category: ErrorCategory.STORAGE,
        operation,
        key: error.key,
        cause,
        retryable: true,
      }
    );
  }
}
