/**
 * Validation utilities for safe area hooks
 */

// Validate numeric input with performance optimization
// Caches validation results to avoid repeated checks
const validationCache = new Map<string, boolean>();

export const validateNumericInput = (
  value: number,
  name: string,
  allowNegative = false,
): boolean => {
  if (!__DEV__) {
    return true;
  }
  
  const cacheKey = `${name}:${value}:${allowNegative}`;
  
  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }
  
  const isValid = typeof value === 'number' && !isNaN(value) && (allowNegative || value >= 0);
  
  if (!isValid) {
    throttledWarn(`${name}: must be a ${allowNegative ? 'number' : 'non-negative number'}, got ${value}`);
  }
  
  // Limit cache size to prevent memory leaks
  if (validationCache.size > 100) {
    const firstKey = validationCache.keys().next().value;
    if (firstKey) {
      validationCache.delete(firstKey);
    }
  }
  
  validationCache.set(cacheKey, isValid);
  return isValid;
};

// Throttled console warning to prevent spam
// Uses requestAnimationFrame for better performance
const warningTimes = new Map<string, number>();
const WARNING_THROTTLE = 1000; // 1 second

export const throttledWarn = (message: string): void => {
  if (!__DEV__) {
    return;
  }
  
  const now = Date.now();
  const lastTime = warningTimes.get(message) || 0;
  
  if (now - lastTime > WARNING_THROTTLE) {
    console.warn(message);
    warningTimes.set(message, now);
    
    // Clean up old entries to prevent memory leaks
    if (warningTimes.size > 50) {
      const cutoffTime = now - WARNING_THROTTLE * 10;
      for (const [key, time] of warningTimes.entries()) {
        if (time < cutoffTime) {
          warningTimes.delete(key);
        }
      }
    }
  }
};

// Cleanup function to clear validation cache
export const clearValidationCache = (): void => {
  validationCache.clear();
};