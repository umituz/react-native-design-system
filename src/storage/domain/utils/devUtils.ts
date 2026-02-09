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
 * All logs are disabled
 */
export const devWarn = (_message: string, ..._args: unknown[]): void => {
  // Disabled
};

/**
 * Log error in development mode only
 * All logs are disabled
 */
export const devError = (_message: string, ..._args: unknown[]): void => {
  // Disabled
};

/**
 * Log info in development mode only
 * All logs are disabled
 */
export const devLog = (_message: string, ..._args: unknown[]): void => {
  // Disabled
};

