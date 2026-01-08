/**
 * Infrastructure - Special Image Filters
 *
 * Advanced filter operations: vintage, blur
 */

export class SpecialFilters {
  static applyVintage(
    data: Uint8ClampedArray,
    intensity: number,
    warmth: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const factor = intensity / 100;
    const warmFactor = warmth / 100;

    for (let i = 0; i < result.length; i += 4) {
      let r = result[i];
      let g = result[i + 1];
      let b = result[i + 2];

      const tr = 0.393 * r + 0.769 * g + 0.189 * b;
      const tg = 0.349 * r + 0.686 * g + 0.168 * b;
      const tb = 0.272 * r + 0.534 * g + 0.131 * b;

      r = r * (1 - factor) + tr * factor;
      g = g * (1 - factor) + tg * factor;
      b = b * (1 - factor) + tb * factor;

      if (warmFactor > 0) {
        result[i] = Math.min(255, r + warmFactor * 20);
        result[i + 1] = Math.min(255, g + warmFactor * 10);
        result[i + 2] = Math.min(255, b * (1 - warmFactor * 0.3));
      } else {
        result[i] = r;
        result[i + 1] = g;
        result[i + 2] = Math.min(255, b * (1 - Math.abs(warmFactor) * 0.3));
      }
    }

    return result;
  }

  static applyBlur(
    data: Uint8ClampedArray,
    radius: number,
    width: number,
    height: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const size = Math.floor(radius) || 1;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, a = 0;
        let count = 0;

        for (let dy = -size; dy <= size; dy++) {
          for (let dx = -size; dx <= size; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              const idx = (ny * width + nx) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              a += data[idx + 3];
              count++;
            }
          }
        }

        const idx = (y * width + x) * 4;
        result[idx] = r / count;
        result[idx + 1] = g / count;
        result[idx + 2] = b / count;
        result[idx + 3] = a / count;
      }
    }

    return result;
  }
}
