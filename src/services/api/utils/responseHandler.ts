/**
 * Response Handler Utility
 * Handles API responses and errors
 */

import type { ApiResponse, ApiError } from '../types/ApiTypes';

/**
 * Parses fetch response to ApiResponse
 *
 * @param response - Fetch response
 * @returns Parsed API response
 */
export async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await parseResponseBody<T>(response);

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
  };
}

/**
 * Parses response body based on content type
 *
 * @param response - Fetch response
 * @returns Parsed body data
 */
async function parseResponseBody<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type');

  if (contentType?.includes('application/json')) {
    const data = await response.json();
    return data as T;
  }

  if (contentType?.includes('text/')) {
    const text = await response.text();
    return text as unknown as T;
  }

  const blob = await response.blob();
  return blob as unknown as T;
}

/**
 * Handles HTTP error and converts to ApiError
 *
 * @param response - Fetch response
 * @returns ApiError object
 */
export async function handleHttpError(response: Response): Promise<ApiError> {
  let details: any;

  try {
    details = await response.json();
  } catch {
    details = await response.text();
  }

  return {
    message: details?.message || response.statusText || 'Request failed',
    status: response.status,
    code: details?.code,
    details,
  };
}

/**
 * Handles network error
 *
 * @param error - Error object
 * @returns ApiError object
 */
export function handleNetworkError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message || 'Network error',
      details: error,
    };
  }

  return {
    message: 'Unknown network error',
    details: error,
  };
}

/**
 * Checks if response is successful
 *
 * @param response - Fetch response
 * @returns True if response is OK
 */
export function isSuccessfulResponse(response: Response): boolean {
  return response.ok && response.status >= 200 && response.status < 300;
}

/**
 * Creates timeout promise
 *
 * @param ms - Timeout in milliseconds
 * @returns Promise that rejects after timeout
 */
export function createTimeoutPromise(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms);
  });
}

/**
 * Wraps fetch with timeout
 *
 * @param url - Request URL
 * @param options - Fetch options
 * @param timeout - Timeout in milliseconds
 * @returns Fetch result with timeout
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    createTimeoutPromise(timeout),
  ]) as Promise<Response>;
}
