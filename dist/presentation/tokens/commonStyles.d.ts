/**
 * Common Styles - Reusable Style Patterns
 *
 * Centralized style utilities to reduce duplication across screens.
 * These styles are composable and follow DRY principles.
 *
 * Usage:
 * ```typescript
 * import { useCommonStyles } from '@domains/design-system/commonStyles';
 *
 * const MyComponent = () => {
 *   const commonStyles = useCommonStyles();
 *   return <View style={commonStyles.screenContainer}>...</View>;
 * };
 * ```
 */
import { ViewStyle, TextStyle } from 'react-native';
/**
 * Hook to get common styles with dynamic theme support
 */
export declare const useCommonStyles: () => {
    /**
     * Standard full-screen container
     * Most common pattern: flex: 1 with background color
     */
    screenContainer: ViewStyle;
    /**
     * Basic flex container without background
     * Use when background is set elsewhere or not needed
     */
    flexContainer: ViewStyle;
    /**
     * Screen container with secondary background
     */
    screenContainerSecondary: ViewStyle;
    /**
     * Standard ScrollView wrapper
     */
    scrollView: ViewStyle;
    /**
     * ScrollView content container with standard padding
     */
    scrollContent: ViewStyle;
    /**
     * ScrollView content that grows to fill available space
     */
    scrollContentGrow: ViewStyle;
    /**
     * Centered scroll content (for forms, onboarding screens)
     */
    scrollContentCentered: ViewStyle;
    /**
     * Centered container - both horizontal and vertical
     * Perfect for empty states, splash screens
     */
    centerContainer: ViewStyle;
    /**
     * Centered container with padding
     */
    centerContainerPadded: ViewStyle;
    /**
     * Horizontal row layout
     */
    row: ViewStyle;
    /**
     * Horizontal row with space between
     */
    rowBetween: ViewStyle;
    /**
     * Horizontal row centered
     */
    rowCenter: ViewStyle;
    /**
     * Standard horizontal padding
     */
    paddedHorizontal: ViewStyle;
    /**
     * Standard vertical padding
     */
    paddedVertical: ViewStyle;
    /**
     * Standard padding all sides
     */
    padded: ViewStyle;
    /**
     * Standard section container
     */
    section: ViewStyle;
    /**
     * Section with padding
     */
    sectionPadded: ViewStyle;
    /**
     * Screen title - primary heading
     */
    screenTitle: TextStyle;
    /**
     * Section title
     */
    sectionTitle: TextStyle;
    /**
     * Subtitle/description text
     */
    subtitle: TextStyle;
    /**
     * Body text
     */
    bodyText: TextStyle;
    /**
     * Secondary text (muted)
     */
    secondaryText: TextStyle;
    /**
     * Form container
     */
    form: ViewStyle;
    /**
     * Form header section
     */
    formHeader: ViewStyle;
};
//# sourceMappingURL=commonStyles.d.ts.map