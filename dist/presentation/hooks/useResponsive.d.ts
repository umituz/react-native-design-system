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
import { DeviceType } from '../utils/responsive';
export interface UseResponsiveReturn {
    width: number;
    height: number;
    isSmallDevice: boolean;
    isTabletDevice: boolean;
    isLandscapeMode: boolean;
    deviceType: DeviceType;
    insets: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    logoSize: number;
    inputHeight: number;
    iconContainerSize: number;
    maxContentWidth: number;
    minTouchTarget: number;
    horizontalPadding: number;
    bottomPosition: number;
    fabPosition: {
        bottom: number;
        right: number;
    };
    modalMaxHeight: string;
    modalMinHeight: number;
    gridColumns: number;
    spacingMultiplier: number;
    onboardingIconMarginTop: number;
    onboardingIconMarginBottom: number;
    onboardingIconSize: number;
    onboardingTitleMarginBottom: number;
    onboardingTextPadding: number;
    onboardingDescriptionMarginTop: number;
    formBottomPadding: number;
    inputIconSize: number;
    formContentWidth: number | undefined;
    formElementSpacing: number;
    getLogoSize: (baseSize?: number) => number;
    getInputHeight: (baseHeight?: number) => number;
    getIconSize: (baseSize?: number) => number;
    getMaxWidth: (baseWidth?: number) => number;
    getFontSize: (baseFontSize: number) => number;
    getGridCols: (mobile?: number, tablet?: number) => number;
}
/**
 * Hook for responsive design utilities
 * Automatically updates when screen dimensions or orientation changes
 */
export declare const useResponsive: () => UseResponsiveReturn;
/**
 * Shorthand hook for just responsive sizes
 */
export declare const useResponsiveSizes: () => {
    logoSize: number;
    inputHeight: number;
    iconContainerSize: number;
    maxContentWidth: number;
};
/**
 * Shorthand hook for just device type checks
 */
export declare const useDeviceType: () => {
    isSmallDevice: boolean;
    isTabletDevice: boolean;
    deviceType: DeviceType;
};
