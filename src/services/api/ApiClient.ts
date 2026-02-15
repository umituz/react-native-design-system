/**
 * API Client
 * Centralized HTTP client for API communication
 */

import type {
  ApiClientConfig,
  ApiRequestConfig,
  ApiResponse,
  HttpMethod,
} from './types/ApiTypes';
import {
  buildURL,
  buildRequestConfig,
} from './utils/requestBuilder';
import {
  parseResponse,
  handleHttpError,
  handleNetworkError,
  isSuccessfulResponse,
  fetchWithTimeout,
} from './utils/responseHandler';
import { retryWithBackoff, isNetworkError, isRetryableHttpStatus } from '../../utils/async';
import { ErrorHandler } from '../../utils/errors';

/**
 * Applies interceptors to a value
 */
async function applyInterceptors<T>(
  value: T,
  interceptors: Array<(value: T) => T | Promise<T>> | undefined
): Promise<T> {
  let result = value;
  for (const interceptor of interceptors || []) {
    result = await interceptor(result);
  }
  return result;
}

export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Makes an HTTP request with automatic retry for retryable errors
   */
  async request<T>(requestConfig: ApiRequestConfig): Promise<ApiResponse<T>> {
    try {
      const config = await applyInterceptors(requestConfig, this.config.requestInterceptors);

      const fullURL = config.url.startsWith('http')
        ? config.url
        : buildURL(this.config.baseURL, config.url, config.params);

      const fetchOptions = buildRequestConfig({
        ...config,
        headers: { ...this.config.headers, ...config.headers },
      });

      // Retry only for GET requests and retryable errors
      const shouldRetry = config.method === 'GET';
      const timeout = config.timeout || this.config.timeout || 30000;

      const response = shouldRetry
        ? await retryWithBackoff(
            () => fetchWithTimeout(fullURL, fetchOptions, timeout),
            {
              maxRetries: 3,
              baseDelay: 1000,
              shouldRetry: (error) => {
                // Retry on network errors
                if (isNetworkError(error as Error)) return true;

                // Retry on specific HTTP status codes (5xx, 429, 408)
                if ('status' in error && typeof error.status === 'number') {
                  return isRetryableHttpStatus(error.status);
                }

                return false;
              },
              onRetry: (error, attempt, delay) => {
                if (__DEV__) {
                  ErrorHandler.log({
                    name: 'ApiRetry',
                    message: `Retrying API request (attempt ${attempt}) after ${delay}ms`,
                    context: { url: fullURL, error: error.message },
                  });
                }
              },
            }
          )
        : await fetchWithTimeout(fullURL, fetchOptions, timeout);

      if (!isSuccessfulResponse(response)) {
        const error = await handleHttpError(response);
        throw await applyInterceptors(error, this.config.errorInterceptors);
      }

      let parsedResponse = await parseResponse<T>(response);
      parsedResponse = await applyInterceptors(parsedResponse, this.config.responseInterceptors);

      return parsedResponse;
    } catch (error) {
      const apiError = handleNetworkError(error);
      ErrorHandler.log(apiError);
      throw await applyInterceptors(apiError, this.config.errorInterceptors);
    }
  }

  /**
   * Makes an HTTP request with a specific method
   */
  private requestWithMethod<T>(
    method: HttpMethod,
    url: string,
    bodyOrParams?: any,
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    const requestData: ApiRequestConfig = {
      url,
      method,
      ...(method === 'GET' || method === 'DELETE' ? { params: bodyOrParams } : { body: bodyOrParams }),
      ...config,
    };
    return this.request<T>(requestData);
  }

  get<T>(url: string, params?: Record<string, string | number | boolean | undefined>, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.requestWithMethod<T>('GET', url, params, config);
  }

  post<T>(url: string, body?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.requestWithMethod<T>('POST', url, body, config);
  }

  put<T>(url: string, body?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.requestWithMethod<T>('PUT', url, body, config);
  }

  patch<T>(url: string, body?: any, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.requestWithMethod<T>('PATCH', url, body, config);
  }

  delete<T>(url: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.requestWithMethod<T>('DELETE', url, undefined, config);
  }

  updateConfig(updates: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  getConfig(): ApiClientConfig {
    return { ...this.config };
  }
}

let apiClientInstance: ApiClient | null = null;

export function createApiClient(config: ApiClientConfig): ApiClient {
  if (!apiClientInstance) {
    apiClientInstance = new ApiClient(config);
  }
  return apiClientInstance;
}

export function getApiClient(): ApiClient | null {
  return apiClientInstance;
}

export function resetApiClient(): void {
  apiClientInstance = null;
}


