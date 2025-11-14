/**
 * AppHeader Organism - Application Header Component
 *
 * Complex header combining atoms and molecules
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ORGANISM
 * Composition: AtomicIcon + AtomicText + AtomicButton + SearchBar
 */
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicText, AtomicButton } from '@umituz/react-native-design-system-atoms';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const AppHeader = ({ title, subtitle, leftIcon, onLeftPress, rightIcon, onRightPress, showShadow = true, backgroundColor, style, }) => {
    const tokens = useAppDesignTokens();
    const bgColor = backgroundColor || tokens.colors.surface;
    const styles = getStyles(tokens);
    return (<SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={[styles.container, { backgroundColor: bgColor }, style]}>
        {/* Left Action */}
        <View style={styles.leftContainer}>
          {leftIcon && onLeftPress && (<AtomicButton variant="text" size="sm" onPress={onLeftPress} icon={leftIcon}/>)}
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <AtomicText type="titleLarge" color="primary" numberOfLines={1}>
            {title}
          </AtomicText>
          {subtitle && (<AtomicText type="bodySmall" color="secondary" numberOfLines={1}>
              {subtitle}
            </AtomicText>)}
        </View>

        {/* Right Action */}
        <View style={styles.rightContainer}>
          {rightIcon && onRightPress && (<AtomicButton variant="text" size="sm" onPress={onRightPress} icon={rightIcon}/>)}
        </View>
      </View>
    </SafeAreaView>);
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => ({
    safeArea: {
        backgroundColor: tokens.colors.surface,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        minHeight: tokens.iconSizes.xl + tokens.spacing.md,
    },
    leftContainer: {
        width: tokens.iconSizes.xl + tokens.spacing.sm,
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: tokens.spacing.sm,
    },
    rightContainer: {
        width: tokens.iconSizes.xl + tokens.spacing.sm,
        alignItems: 'flex-start',
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
