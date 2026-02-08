/**
 * API Client
 * Centralized HTTP client for API communication
 */

import type {
  ApiClientConfig,
  ApiRequestConfig,
  ApiResponse,
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

export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Makes an HTTP request
   *
   * @param requestConfig - Request configuration
   * @returns API response
   */
  async request<T>(requestConfig: ApiRequestConfig): Promise<ApiResponse<T>> {
    try {
      // Apply request interceptors
      let config = requestConfig;
      for (const interceptor of this.config.requestInterceptors || []) {
        config = await interceptor(config);
      }

      // Build request
      const fullURL = config.url.startsWith('http')
        ? config.url
        : buildURL(this.config.baseURL, config.url, config.params);

      const fetchOptions = buildRequestConfig({
        ...config,
        headers: { ...this.config.headers, ...config.headers },
      });

      // Make request with timeout
      const response = await fetchWithTimeout(
        fullURL,
        fetchOptions,
        config.timeout || this.config.timeout || 30000
      );

      // Check for HTTP errors
      if (!isSuccessfulResponse(response)) {
        const error = await handleHttpError(response);

        // Apply error interceptors
        let finalError = error;
        for (const interceptor of this.config.errorInterceptors || []) {
          finalError = await interceptor(finalError);
        }

        throw finalError;
      }

      // Parse response
      let parsedResponse = await parseResponse<T>(response);

      // Apply response interceptors
      for (const interceptor of this.config.responseInterceptors || []) {
        parsedResponse = await interceptor(parsedResponse);
      }

      return parsedResponse;
    } catch (error) {
      // Handle network errors
      const apiError = handleNetworkError(error);

      // Apply error interceptors
      let finalError = apiError;
      for (const interceptor of this.config.errorInterceptors || []) {
        finalError = await interceptor(finalError);
      }

      throw finalError;
    }
  }

  /**
   * Makes a GET request
   *
   * @param url - Request URL
   * @param params - Query parameters
   * @param config - Additional config
   * @returns API response
   */
  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>,
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config,
    });
  }

  /**
   * Makes a POST request
   *
   * @param url - Request URL
   * @param body - Request body
   * @param config - Additional config
   * @returns API response
   */
  async post<T>(
    url: string,
    body?: any,
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      body,
      ...config,
    });
  }

  /**
   * Makes a PUT request
   *
   * @param url - Request URL
   * @param body - Request body
   * @param config - Additional config
   * @returns API response
   */
  async put<T>(
    url: string,
    body?: any,
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      body,
      ...config,
    });
  }

  /**
   * Makes a PATCH request
   *
   * @param url - Request URL
   * @param body - Request body
   * @param config - Additional config
   * @returns API response
   */
  async patch<T>(
    url: string,
    body?: any,
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PATCH',
      body,
      ...config,
    });
  }

  /**
   * Makes a DELETE request
   *
   * @param url - Request URL
   * @param config - Additional config
   * @returns API response
   */
  async delete<T>(
    url: string,
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      ...config,
    });
  }

  /**
   * Updates base configuration
   *
   * @param updates - Configuration updates
   */
  updateConfig(updates: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Gets current configuration
   *
   * @returns Current configuration
   */
  getConfig(): ApiClientConfig {
    return { ...this.config };
  }
}

/**
 * Creates a singleton API client instance
 *
 * @param config - API client configuration
 * @returns API client instance
 */
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
