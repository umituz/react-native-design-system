/**
 * Infrastructure - Filter Utils
 *
 * Legacy wrapper for backward compatibility. Use specific filter classes directly.
 */

import { ColorAdjustmentFilters } from './filters/ColorAdjustmentFilters';
import { StyleFilters } from './filters/StyleFilters';
import { FilterHelpers } from './filters/FilterHelpers';

export class ImageFilterUtils {
  static applyBrightness = ColorAdjustmentFilters.applyBrightness;
  static applyContrast = ColorAdjustmentFilters.applyContrast;
  static applySaturation = ColorAdjustmentFilters.applySaturation;
  static applyVintage = StyleFilters.applyVintage;
  static applyBlur = StyleFilters.applyBlur;
  static applyIntensity = FilterHelpers.applyIntensity;
}

export { ColorAdjustmentFilters, StyleFilters, FilterHelpers };
