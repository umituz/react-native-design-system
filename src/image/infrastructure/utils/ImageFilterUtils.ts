/**
 * Infrastructure - Filter Utils
 *
 * Legacy wrapper for backward compatibility. Use specific filter classes directly.
 */

import { BasicFilters } from './filters/BasicFilters';
import { SpecialFilters } from './filters/SpecialFilters';
import { FilterHelpers } from './filters/FilterHelpers';

export class ImageFilterUtils {
  static applyBrightness = BasicFilters.applyBrightness;
  static applyContrast = BasicFilters.applyContrast;
  static applySaturation = BasicFilters.applySaturation;
  static applyVintage = SpecialFilters.applyVintage;
  static applyBlur = SpecialFilters.applyBlur;
  static applyIntensity = FilterHelpers.applyIntensity;
}

// Re-export for convenience
export { BasicFilters, SpecialFilters, FilterHelpers };
