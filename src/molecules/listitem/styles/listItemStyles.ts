/**
 * ListItem Styles
 */
import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';
import { isTablet } from '../../../device/detection';

export interface ListItemStyles {
    container: ViewStyle;
    disabled: ViewStyle;
    iconContainer: ViewStyle;
    content: ViewStyle;
    subtitle: TextStyle;
}

export const getListItemStyles = (tokens: DesignTokens): ListItemStyles => {
    // Responsive minHeight: 56px on phone, 64px on tablet for better ergonomics
    const minHeight = isTablet() ? 64 : 56;

    return {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.borders.radius.md,
            minHeight,
        },
        disabled: {
            opacity: tokens.opacity.disabled,
        },
        iconContainer: {
            marginRight: tokens.spacing.md,
        },
        content: {
            flex: 1,
        },
        subtitle: {
            marginTop: tokens.spacing.xs,
        },
    };
};
