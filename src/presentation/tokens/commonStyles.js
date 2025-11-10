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
import { useAppDesignTokens } from '@umituz/react-native-theme';
/**
 * Hook to get common styles with dynamic theme support
 */
export const useCommonStyles = () => {
    const tokens = useAppDesignTokens();
    return {
        // ========================================================================
        // SCREEN CONTAINERS
        // ========================================================================
        /**
         * Standard full-screen container
         * Most common pattern: flex: 1 with background color
         */
        screenContainer: {
            flex: 1,
            backgroundColor: tokens.colors.backgroundPrimary,
        },
        /**
         * Basic flex container without background
         * Use when background is set elsewhere or not needed
         */
        flexContainer: {
            flex: 1,
        },
        /**
         * Screen container with secondary background
         */
        screenContainerSecondary: {
            flex: 1,
            backgroundColor: tokens.colors.backgroundSecondary,
        },
        // ========================================================================
        // SCROLL CONTAINERS
        // ========================================================================
        /**
         * Standard ScrollView wrapper
         */
        scrollView: {
            flex: 1,
        },
        /**
         * ScrollView content container with standard padding
         */
        scrollContent: {
            paddingHorizontal: tokens.spacing.lg,
            paddingBottom: tokens.spacing.xl,
        },
        /**
         * ScrollView content that grows to fill available space
         */
        scrollContentGrow: {
            flexGrow: 1,
            padding: tokens.spacing.lg,
        },
        /**
         * Centered scroll content (for forms, onboarding screens)
         */
        scrollContentCentered: {
            flexGrow: 1,
            padding: tokens.spacing.lg,
            justifyContent: 'center',
        },
        // ========================================================================
        // LAYOUT UTILITIES
        // ========================================================================
        /**
         * Centered container - both horizontal and vertical
         * Perfect for empty states, splash screens
         */
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        /**
         * Centered container with padding
         */
        centerContainerPadded: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: tokens.spacing.xl,
        },
        /**
         * Horizontal row layout
         */
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        /**
         * Horizontal row with space between
         */
        rowBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        /**
         * Horizontal row centered
         */
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        // ========================================================================
        // PADDING UTILITIES
        // ========================================================================
        /**
         * Standard horizontal padding
         */
        paddedHorizontal: {
            paddingHorizontal: tokens.spacing.lg,
        },
        /**
         * Standard vertical padding
         */
        paddedVertical: {
            paddingVertical: tokens.spacing.lg,
        },
        /**
         * Standard padding all sides
         */
        padded: {
            padding: tokens.spacing.lg,
        },
        // ========================================================================
        // SECTION STYLES
        // ========================================================================
        /**
         * Standard section container
         */
        section: {
            marginBottom: tokens.spacing.xl,
        },
        /**
         * Section with padding
         */
        sectionPadded: {
            marginBottom: tokens.spacing.xl,
            paddingHorizontal: tokens.spacing.lg,
        },
        // ========================================================================
        // TEXT STYLES
        // ========================================================================
        /**
         * Screen title - primary heading
         */
        screenTitle: {
            ...tokens.typography.headingLarge,
            color: tokens.colors.textPrimary,
            marginBottom: tokens.spacing.sm,
        },
        /**
         * Section title
         */
        sectionTitle: {
            ...tokens.typography.headingMedium,
            color: tokens.colors.textPrimary,
            marginBottom: tokens.spacing.md,
        },
        /**
         * Subtitle/description text
         */
        subtitle: {
            ...tokens.typography.bodyMedium,
            color: tokens.colors.textSecondary,
            textAlign: 'center',
        },
        /**
         * Body text
         */
        bodyText: {
            ...tokens.typography.bodyMedium,
            color: tokens.colors.textPrimary,
        },
        /**
         * Secondary text (muted)
         */
        secondaryText: {
            ...tokens.typography.bodySmall,
            color: tokens.colors.textSecondary,
        },
        // ========================================================================
        // FORM STYLES
        // ========================================================================
        /**
         * Form container
         */
        form: {
            width: '100%',
        },
        /**
         * Form header section
         */
        formHeader: {
            alignItems: 'center',
            marginBottom: tokens.spacing.xl,
        },
    };
};
