/**
 * AtomicConfirmationModal Style Utilities
 *
 * Styling functions for confirmation modal component
 */
import { ViewStyle } from 'react-native';
import { ConfirmationModalVariant, ConfirmationModalVariantConfig } from '../types';
import type { DesignTokens } from '@umituz/react-native-theme';
/**
 * Get variant configuration (icon and color only)
 * Note: Confirm text is handled in component with translations
 */
export declare const getVariantConfig: (variant: ConfirmationModalVariant, tokens: DesignTokens) => Omit<ConfirmationModalVariantConfig, "confirmText">;
/**
 * Get modal overlay style
 */
export declare const getModalOverlayStyle: (tokens: DesignTokens) => ViewStyle;
/**
 * Get backdrop style (invisible layer for dismissing)
 */
export declare const getBackdropStyle: () => ViewStyle;
/**
 * Get modal container style
 */
export declare const getModalContainerStyle: (tokens: DesignTokens) => ViewStyle;
/**
 * Get icon container style
 */
export declare const getIconContainerStyle: (tokens: DesignTokens) => ViewStyle;
/**
 * Get title container style
 */
export declare const getTitleContainerStyle: (tokens: DesignTokens) => ViewStyle;
/**
 * Get message container style
 */
export declare const getMessageContainerStyle: (tokens: DesignTokens) => ViewStyle;
/**
 * Get button container style
 */
export declare const getButtonContainerStyle: (tokens: DesignTokens) => ViewStyle;
/**
 * Get button style
 */
export declare const getButtonStyle: () => ViewStyle;
/**
 * Get confirm button variant based on modal variant
 */
export declare const getConfirmButtonVariant: (variant: ConfirmationModalVariant) => "primary" | "secondary" | "tertiary" | "outline" | "ghost";
