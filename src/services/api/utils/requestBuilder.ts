/**
 * Request Builder Utility
 * Builds HTTP requests with proper configuration
 */

import type { ApiRequestConfig, HttpMethod } from '../types/ApiTypes';

/**
 * Builds query string from params object
 *
 * @param params - Query parameters
 * @returns Query string
 */
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Builds full URL with query parameters
 *
 * @param baseURL - Base URL
 * @param path - Request path
 * @param params - Query parameters
 * @returns Full URL
 */
export function buildURL(
  baseURL: string,
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullURL = `${baseURL}${cleanPath}`;

  if (params) {
    return `${fullURL}${buildQueryString(params)}`;
  }

  return fullURL;
}

/**
 * Builds request configuration
 *
 * @param config - Request configuration
 * @returns Built fetch options
 */
export function buildRequestConfig(config: ApiRequestConfig): RequestInit {
  const options: RequestInit = {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  };

  if (config.body) {
    options.body = JSON.stringify(config.body);
  }

  return options;
}

/**
 * Creates a request builder function for a specific base URL
 *
 * @param baseURL - Base URL for all requests
 * @returns Request builder function
 */
export function createRequestBuilder(baseURL: string) {
  return (
    path: string,
    method: HttpMethod,
    params?: Record<string, string | number | boolean | undefined>,
    body?: any,
    headers?: Record<string, string>
  ): ApiRequestConfig => ({
    url: buildURL(baseURL, path, params),
    method,
    params,
    body,
    headers,
  });
}
