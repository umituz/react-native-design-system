/**
 * useResponsive Hook
 *
 * React Hook for accessing responsive utilities with real-time dimension updates
 * and safe area insets integration.
 *
 * Usage:
 * ```tsx
 * const { logoSize, inputHeight, fabPosition, isSmallDevice } = useResponsive();
 * ```
 */
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getResponsiveLogoSize, getResponsiveInputHeight, getResponsiveHorizontalPadding, getResponsiveBottomPosition, getResponsiveFABPosition, getResponsiveModalMaxHeight, getResponsiveMinModalHeight, getResponsiveIconContainerSize, getResponsiveGridColumns, getResponsiveMaxWidth, getResponsiveFontSize, isSmallPhone, isTablet, isLandscape, getDeviceType, getMinTouchTargetSize, getSpacingMultiplier, getOnboardingIconMarginTop, getOnboardingIconMarginBottom, getOnboardingTitleMarginBottom, getOnboardingTextPadding, getOnboardingDescriptionMarginTop, getOnboardingIconSize, getFormBottomPadding, getInputIconSize, getFormContentWidth, getFormElementSpacing, } from '../utils/responsive';
/**
 * Hook for responsive design utilities
 * Automatically updates when screen dimensions or orientation changes
 */
export const useResponsive = () => {
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    return {
        // Device info
        width,
        height,
        isSmallDevice: isSmallPhone(),
        isTabletDevice: isTablet(),
        isLandscapeMode: isLandscape(),
        deviceType: getDeviceType(),
        // Safe area insets
        insets,
        // Responsive sizes (with default values)
        logoSize: getResponsiveLogoSize(),
        inputHeight: getResponsiveInputHeight(),
        iconContainerSize: getResponsiveIconContainerSize(),
        maxContentWidth: getResponsiveMaxWidth(),
        minTouchTarget: getMinTouchTargetSize(),
        // Responsive positioning
        horizontalPadding: getResponsiveHorizontalPadding(16, insets),
        bottomPosition: getResponsiveBottomPosition(32, insets),
        fabPosition: getResponsiveFABPosition(insets),
        // Responsive layout
        modalMaxHeight: getResponsiveModalMaxHeight(),
        modalMinHeight: getResponsiveMinModalHeight(),
        gridColumns: getResponsiveGridColumns(),
        spacingMultiplier: getSpacingMultiplier(),
        // Onboarding-specific spacing (pre-calculated, no component calculations)
        onboardingIconMarginTop: getOnboardingIconMarginTop(),
        onboardingIconMarginBottom: getOnboardingIconMarginBottom(),
        onboardingIconSize: getOnboardingIconSize(),
        onboardingTitleMarginBottom: getOnboardingTitleMarginBottom(),
        onboardingTextPadding: getOnboardingTextPadding(),
        onboardingDescriptionMarginTop: getOnboardingDescriptionMarginTop(),
        // Form-specific spacing (pre-calculated, universal)
        formBottomPadding: getFormBottomPadding(insets.bottom),
        inputIconSize: getInputIconSize(),
        formContentWidth: getFormContentWidth(),
        formElementSpacing: getFormElementSpacing(),
        // Utility functions (allow custom base values)
        getLogoSize: (baseSize) => getResponsiveLogoSize(baseSize),
        getInputHeight: (baseHeight) => getResponsiveInputHeight(baseHeight),
        getIconSize: (baseSize) => getResponsiveIconContainerSize(baseSize),
        getMaxWidth: (baseWidth) => getResponsiveMaxWidth(baseWidth),
        getFontSize: (baseFontSize) => getResponsiveFontSize(baseFontSize),
        getGridCols: (mobile, tablet) => getResponsiveGridColumns(mobile, tablet),
    };
};
/**
 * Shorthand hook for just responsive sizes
 */
export const useResponsiveSizes = () => {
    const { logoSize, inputHeight, iconContainerSize, maxContentWidth } = useResponsive();
    return { logoSize, inputHeight, iconContainerSize, maxContentWidth };
};
/**
 * Shorthand hook for just device type checks
 */
export const useDeviceType = () => {
    const { isSmallDevice, isTabletDevice, deviceType } = useResponsive();
    return { isSmallDevice, isTabletDevice, deviceType };
};
