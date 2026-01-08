/**
 * Infrastructure - Basic Image Filters
 *
 * Core filter operations: brightness, contrast, saturation
 */

export class BasicFilters {
  static applyBrightness(
    data: Uint8ClampedArray,
    brightness: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const adjustment = brightness * 2.55;

    for (let i = 0; i < result.length; i += 4) {
      result[i] = Math.min(255, Math.max(0, result[i] + adjustment));
      result[i + 1] = Math.min(255, Math.max(0, result[i + 1] + adjustment));
      result[i + 2] = Math.min(255, Math.max(0, result[i + 2] + adjustment));
    }

    return result;
  }

  static applyContrast(
    data: Uint8ClampedArray,
    contrast: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const factor = (259 * (contrast * 2.55 + 255)) / (255 * (259 - contrast * 2.55));

    for (let i = 0; i < result.length; i += 4) {
      result[i] = Math.min(255, Math.max(0, factor * (result[i] - 128) + 128));
      result[i + 1] = Math.min(255, Math.max(0, factor * (result[i + 1] - 128) + 128));
      result[i + 2] = Math.min(255, Math.max(0, factor * (result[i + 2] - 128) + 128));
    }

    return result;
  }

  static applySaturation(
    data: Uint8ClampedArray,
    saturation: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const adjustment = 1 + (saturation / 100);

    for (let i = 0; i < result.length; i += 4) {
      const r = result[i];
      const g = result[i + 1];
      const b = result[i + 2];

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      result[i] = Math.min(255, Math.max(0, gray + adjustment * (r - gray)));
      result[i + 1] = Math.min(255, Math.max(0, gray + adjustment * (g - gray)));
      result[i + 2] = Math.min(255, Math.max(0, gray + adjustment * (b - gray)));
    }

    return result;
  }
}
