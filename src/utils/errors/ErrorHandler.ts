/**
 * ErrorHandler
 *
 * Centralized error handling utility for the design system.
 * Provides consistent error handling, logging, and reporting.
 */

import { DesignSystemError, ErrorCodes } from './DesignSystemError';

export class ErrorHandler {
  /**
   * Handle and normalize errors
   * Converts any error type to DesignSystemError
   */
  static handle(
    error: unknown,
    context?: string,
    additionalContext?: Record<string, any>
  ): DesignSystemError {
    // Already a DesignSystemError, return as-is
    if (error instanceof DesignSystemError) {
      return error;
    }

    // Standard Error object
    if (error instanceof Error) {
      return new DesignSystemError(
        error.message,
        ErrorCodes.UNKNOWN_ERROR,
        {
          context,
          originalError: error.name,
          stack: error.stack,
          ...additionalContext,
        }
      );
    }

    // String error
    if (typeof error === 'string') {
      return new DesignSystemError(
        error,
        ErrorCodes.UNKNOWN_ERROR,
        { context, ...additionalContext }
      );
    }

    // Unknown error type
    return new DesignSystemError(
      'An unknown error occurred',
      ErrorCodes.UNKNOWN_ERROR,
      {
        context,
        originalError: String(error),
        ...additionalContext,
      }
    );
  }

  /**
   * Log error to console (only in development)
   */
  static log(error: DesignSystemError | Error | unknown): void {
    if (__DEV__) {
      if (error instanceof DesignSystemError) {
        console.error('[DesignSystemError]', error.toJSON());
      } else if (error instanceof Error) {
        console.error('[Error]', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      } else {
        console.error('[Unknown Error]', error);
      }
    }
  }

  /**
   * Handle error with logging
   * Combines handle() and log() for convenience
   */
  static handleAndLog(
    error: unknown,
    context?: string,
    additionalContext?: Record<string, any>
  ): DesignSystemError {
    const handled = this.handle(error, context, additionalContext);
    this.log(handled);
    return handled;
  }

  /**
   * Create a new DesignSystemError with specific code
   */
  static create(
    message: string,
    code: string,
    context?: Record<string, any>
  ): DesignSystemError {
    return new DesignSystemError(message, code, context);
  }

  /**
   * Wrap async function with error handling
   * Returns [error, result] tuple (similar to Go pattern)
   */
  static async tryAsync<T>(
    fn: () => Promise<T>,
    context?: string
  ): Promise<[DesignSystemError | null, T | null]> {
    try {
      const result = await fn();
      return [null, result];
    } catch (error) {
      const handled = this.handleAndLog(error, context);
      return [handled, null];
    }
  }

  /**
   * Wrap sync function with error handling
   * Returns [error, result] tuple
   */
  static try<T>(
    fn: () => T,
    context?: string
  ): [DesignSystemError | null, T | null] {
    try {
      const result = fn();
      return [null, result];
    } catch (error) {
      const handled = this.handleAndLog(error, context);
      return [handled, null];
    }
  }
}
