/**
 * Infrastructure - Filter Helper Utilities
 *
 * Common helper functions for filter operations
 */

export class FilterHelpers {
  static applyIntensity(
    originalData: Uint8ClampedArray,
    processedData: Uint8ClampedArray,
    intensity: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(originalData.length);

    for (let i = 0; i < originalData.length; i++) {
      result[i] = originalData[i] * (1 - intensity) + processedData[i] * intensity;
    }

    return result;
  }
}
