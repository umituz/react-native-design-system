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
export const devWarn = (_message: string, ..._args: unknown[]): void => {
  if (__DEV__) {
  }
};

/**
 * Log error in development mode only
 */
export const devError = (_message: string, ..._args: unknown[]): void => {
  if (__DEV__) {
  }
};

/**
 * Log info in development mode only
 */
export const devLog = (_message: string, ..._args: unknown[]): void => {
  if (__DEV__) {
  }
};
