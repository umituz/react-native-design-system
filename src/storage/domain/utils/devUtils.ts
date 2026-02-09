/**
 * Development utilities
 */

/**
 * Check if running in development mode
 */
export const isDev = (): boolean => {
  return __DEV__;
};

/**
 * Log warning in development mode only
 */
export const devWarn = (message: string, ...args: unknown[]): void => {
  if (__DEV__) {
  }
};

/**
 * Log error in development mode only
 */
export const devError = (message: string, ...args: unknown[]): void => {
  if (__DEV__) {
  }
};

/**
 * Log info in development mode only
 */
export const devLog = (message: string, ...args: unknown[]): void => {
  if (__DEV__) {
  }
};
