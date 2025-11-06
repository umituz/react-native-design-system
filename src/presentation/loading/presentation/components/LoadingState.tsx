/**
 * LoadingState - Dynamic Icon-Based Loading Component
 *
 * Universal loading component with configurable emoji/icon support
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Features:
 * - ✅ Dynamic emoji/icon per screen (🏠 Home, ⚙️ Settings, 💪 Workout, etc.)
 * - ✅ Size variants (small, medium, large)
 * - ✅ Full screen or inline modes
 * - ✅ Optional loading message
 * - ✅ Theme-aware styling
 */

import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useAppDesignTokens } from '../../../hooks/useAppDesignTokens';
import { AtomicText } from '../../../atoms/AtomicText';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type LoadingStateSize = 'small' | 'medium' | 'large';

export interface LoadingStateProps {
  /**
   * Emoji/icon to display (changes per screen context)
   * Examples: 🏠 Home, ⚙️ Settings, 💪 Workout, 🧘 Meditation, 📊 Analytics
   */
  icon?: string;

  /**
   * Optional loading message
   */
  message?: string;

  /**
   * Size variant
   */
  size?: LoadingStateSize;

  /**
   * Full screen overlay mode
   */
  fullScreen?: boolean;
}

// =============================================================================
// SIZE CONFIGURATION
// =============================================================================

interface SizeConfig {
  iconSize: number;
  showMessage: boolean;
  containerPadding: number;
}

const SIZE_CONFIG: Record<LoadingStateSize, SizeConfig> = {
  small: {
    iconSize: 32,
    showMessage: false,
    containerPadding: 16,
  },
  medium: {
    iconSize: 48,
    showMessage: true,
    containerPadding: 24,
  },
  large: {
    iconSize: 64,
    showMessage: true,
    containerPadding: 32,
  },
};

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const LoadingState: React.FC<LoadingStateProps> = ({
  icon = '⏳', // Default hourglass icon
  message,
  size = 'large',
  fullScreen = false,
}) => {
  // ✅ Dynamic theme tokens
  const tokens = useAppDesignTokens();

  // Size configuration
  const config = SIZE_CONFIG[size];

  // Dynamic styles based on theme
  const styles = useMemo(() => getStyles(tokens, config, fullScreen), [tokens, config, fullScreen]);

  return (
    <View style={styles.container}>
      {/* Icon/Emoji */}
      <Text
        style={[
          styles.icon,
          {
            fontSize: config.iconSize,
          },
        ]}
      >
        {icon}
      </Text>

      {/* Optional Loading Message */}
      {config.showMessage && message && (
        <AtomicText
          type="bodyMedium"
          style={styles.message}
        >
          {message}
        </AtomicText>
      )}
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (
  tokens: ReturnType<typeof useAppDesignTokens>,
  config: SizeConfig,
  fullScreen: boolean
) => StyleSheet.create({
  container: {
    ...(fullScreen ? {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tokens.colors.backgroundPrimary,
    } : {
      justifyContent: 'center',
      alignItems: 'center',
      padding: config.containerPadding,
    }),
  },
  icon: {
    textAlign: 'center',
    marginBottom: tokens.spacing.md,
  },
  message: {
    color: tokens.colors.textSecondary,
    textAlign: 'center',
    marginTop: tokens.spacing.sm,
    maxWidth: 300,
  },
});

export default LoadingState;
