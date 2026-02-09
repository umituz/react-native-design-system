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
   * Makes an HTTP request
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

      const response = await fetchWithTimeout(
        fullURL,
        fetchOptions,
        config.timeout || this.config.timeout || 30000
      );

      if (!isSuccessfulResponse(response)) {
        const error = await handleHttpError(response);
        throw await applyInterceptors(error, this.config.errorInterceptors);
      }

      let parsedResponse = await parseResponse<T>(response);
      parsedResponse = await applyInterceptors(parsedResponse, this.config.responseInterceptors);

      return parsedResponse;
    } catch (error) {
      const apiError = handleNetworkError(error);
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


