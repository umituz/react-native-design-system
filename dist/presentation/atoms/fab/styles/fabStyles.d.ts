import { ViewStyle } from 'react-native';
import { FabVariant, FabSize, FabVariantConfig, FabSizeConfig } from '../types';
import type { DesignTokens } from '@umituz/react-native-theme';
/**
 * Material Design 3 FAB size configurations
 */
export declare const FAB_SIZES: Record<FabSize, FabSizeConfig>;
/**
 * Get FAB variant styles based on design tokens
 * Note: Icon colors are handled via customColor in AtomicIcon
 */
export declare const getFabVariants: (tokens: DesignTokens) => Record<FabVariant, FabVariantConfig>;
/**
 * Get icon size based on FAB size
 * Returns AtomicIconSize type ('sm', 'md', 'lg')
 */
export declare const getFabIconSize: (size: FabSize) => "sm" | "md" | "lg";
/**
 * Get FAB border for depth (shadows removed per CLAUDE.md)
 * Subtle border provides visual elevation without shadow issues
 */
export declare const getFabBorder: (tokens: DesignTokens) => ViewStyle;
