/**
 * Responsive Design Utilities
 *
 * Centralized responsive sizing and spacing utilities to prevent
 * Apple App Store rejection due to layout issues on different devices.
 *
 * Supports:
 * - iPhone 13 mini (5.4" - smallest)
 * - iPhone 13/14/15 (6.1" - standard)
 * - iPhone 14 Pro Max (6.7" - largest phone)
 * - iPad Air (10.9" - tablet)
 */
/**
 * Get current screen dimensions
 */
export declare const getScreenDimensions: () => {
    width: number;
    height: number;
};
/**
 * Check if current device is a small phone (iPhone 13 mini, SE)
 */
export declare const isSmallPhone: () => boolean;
/**
 * Check if current device is a tablet (iPad)
 */
export declare const isTablet: () => boolean;
/**
 * Responsive logo/icon size
 * Small devices: 100-120px
 * Medium devices: 120-160px
 * Tablets: 160-200px
 */
export declare const getResponsiveLogoSize: (baseSize?: number) => number;
/**
 * Responsive multiline input height
 * Prevents keyboard overlap on small devices
 *
 * Small devices: 100-120px
 * Medium devices: 120-150px
 * Tablets: 150-200px
 */
export declare const getResponsiveInputHeight: (baseHeight?: number) => number;
/**
 * Responsive horizontal padding
 * Accounts for safe area on notched devices and iPad
 */
export declare const getResponsiveHorizontalPadding: (basePadding?: number, insets?: {
    left: number;
    right: number;
}) => number;
/**
 * Responsive bottom positioning
 * Accounts for home indicator and safe area
 */
export declare const getResponsiveBottomPosition: (basePosition?: number, insets?: {
    bottom: number;
}) => number;
/**
 * Responsive FAB (Floating Action Button) position
 * CRITICAL: Ensures FAB appears above tab bar (70-90px tall) and safe areas
 *
 * Tab bar heights:
 * - iOS: ~80-90px (including safe area)
 * - Android: ~70px
 *
 * FAB positioning:
 * - Tablets: 100px from bottom (generous spacing)
 * - Phones: 90px from bottom (above tab bar)
 * - Safe area aware (home indicator clearance)
 */
export declare const getResponsiveFABPosition: (insets?: {
    bottom: number;
    right: number;
}) => {
    bottom: number;
    right: number;
};
/**
 * Responsive modal max height
 * Prevents modals from taking too much space on tablets
 * or too little on small devices
 */
export declare const getResponsiveModalMaxHeight: () => string;
/**
 * Responsive modal min height
 * Ensures modals are always usable and not too small
 * Complements getResponsiveModalMaxHeight for complete modal sizing
 */
export declare const getResponsiveMinModalHeight: () => number;
/**
 * Responsive icon container size
 * Used in onboarding, cards, etc.
 */
export declare const getResponsiveIconContainerSize: (baseSize?: number) => number;
/**
 * Responsive grid columns
 * Returns number of columns for grid layouts
 */
export declare const getResponsiveGridColumns: (mobileColumns?: number, tabletColumns?: number) => number;
/**
 * Responsive max width for content
 * Prevents text from stretching too wide on tablets
 */
export declare const getResponsiveMaxWidth: (baseWidth?: number) => number;
/**
 * Responsive font size
 * Scales text for different devices while respecting minimum sizes
 */
export declare const getResponsiveFontSize: (baseFontSize: number) => number;
/**
 * Check if device is in landscape mode
 */
export declare const isLandscape: () => boolean;
/**
 * Get universal keyboard behavior
 * Returns 'padding' which works across all platforms (iOS, Android, Web)
 */
export declare const getKeyboardBehavior: () => "padding" | "height" | "position" | undefined;
/**
 * Device type enum for conditional rendering
 */
export declare enum DeviceType {
    SMALL_PHONE = "SMALL_PHONE",
    MEDIUM_PHONE = "MEDIUM_PHONE",
    LARGE_PHONE = "LARGE_PHONE",
    TABLET = "TABLET"
}
/**
 * Get current device type
 */
export declare const getDeviceType: () => DeviceType;
/**
 * Apple HIG compliant touch target size
 */
export declare const getMinTouchTargetSize: () => number;
/**
 * Responsive spacing multiplier
 * Returns a multiplier for spacing based on device size
 */
export declare const getSpacingMultiplier: () => number;
/**
 * Onboarding icon container top margin
 * Small phones: 24px (lg), Others: 40px (xxl)
 */
export declare const getOnboardingIconMarginTop: () => number;
/**
 * Onboarding icon container bottom margin
 * Tablets: 60px (xxl * 1.5 for extra breathing room), Others: 40px (xxl)
 */
export declare const getOnboardingIconMarginBottom: () => number;
/**
 * Onboarding title bottom margin
 * Tablets: 24px (lg), Others: 16px (md)
 */
export declare const getOnboardingTitleMarginBottom: () => number;
/**
 * Onboarding text horizontal padding (title and description)
 * Small phones: 8px (sm for tighter fit), Others: 16px (md)
 */
export declare const getOnboardingTextPadding: () => number;
/**
 * Onboarding description top margin
 * Small phones: 4px (xs), Others: 8px (sm)
 */
export declare const getOnboardingDescriptionMarginTop: () => number;
/**
 * Onboarding icon size (for icon inside container)
 * Calculated as ~55% of icon container size for proper visual balance
 * Small phones: ~66px (55% of 120px), Standard: ~77px (55% of 140px), Tablets: ~99px (55% of 180px)
 */
export declare const getOnboardingIconSize: () => number;
/**
 * Keyboard vertical offset for KeyboardAvoidingView
 * Accounts for header/navigation bar height
 * Universal value that works across all platforms
 */
export declare const getKeyboardVerticalOffset: () => number;
/**
 * Form container bottom padding
 * Prevents overlap with bottom tab navigation and ensures submit buttons are accessible
 *
 * Formula: safeAreaBottom + tabBarHeight + extraSpace
 * - Tab bar height: ~56px (iOS/Android standard)
 * - Extra space: ~24px (breathing room for submit button)
 * - Safe area: Variable (home indicator on iPhone)
 * - Minimum: 100px (ensures buttons always accessible)
 */
export declare const getFormBottomPadding: (safeAreaBottom: number) => number;
/**
 * Input field icon size
 * Used for leading/trailing icons and password toggle
 * Apple HIG: Minimum 22px for touch targets
 */
export declare const getInputIconSize: () => number;
/**
 * Form content container width
 * Forms need more generous width than regular content to prevent cramped layouts
 *
 * Strategy:
 * - Phones: undefined (no max width restriction, fills available space)
 * - Tablets: Max 700px (readable but not restrictive)
 *
 * Different from getResponsiveMaxWidth which is for text content (max 400px)
 *
 * @returns number for tablets (700px max), undefined for phones (no restriction)
 */
export declare const getFormContentWidth: () => number | undefined;
/**
 * Form element spacing (vertical)
 * Vertical spacing between form elements (inputs, buttons, etc.)
 * Used with Children.map() wrapper pattern for universal compatibility
 * Replaces CSS gap property (old RN version compatibility)
 *
 * Universal pattern - works on iOS, Android, Web
 */
export declare const getFormElementSpacing: () => number;
