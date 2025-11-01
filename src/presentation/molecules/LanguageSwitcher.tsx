import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon } from '../atoms';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';
import { useLanguageNavigation } from './languageswitcher/hooks/useLanguageNavigation';
import { languageSwitcherConfig } from './languageswitcher/config/languageSwitcherConfig';

interface LanguageSwitcherProps {
  showName?: boolean;
  showFlag?: boolean;
  color?: string;
  navigationScreen?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  showName = false,
  showFlag = true,
  color,
  navigationScreen = languageSwitcherConfig.defaultNavigationScreen,
}) => {
  const tokens = useAppDesignTokens();
  const { currentLang, navigateToLanguageSelection } = useLanguageNavigation(navigationScreen);
  const iconColor = color || tokens.colors.textPrimary;

  const styles = getStyles(tokens);

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToLanguageSelection} activeOpacity={0.7} hitSlop={languageSwitcherConfig.hitSlop}>
      {showFlag && <AtomicText type="headlineSmall" style={styles.flag}>{currentLang.flag}</AtomicText>}
      {showName && <AtomicText type="bodySmall" color={iconColor} style={styles.languageName}>{currentLang.nativeName}</AtomicText>}
      {!showName && !showFlag && <AtomicIcon name="Languages" color="primary" />}
    </TouchableOpacity>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => ({
  container: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs },
  flag: { fontSize: tokens.typography.headingSmall.fontSize },
  languageName: { fontSize: tokens.typography.bodySmall.fontSize, fontWeight: tokens.typography.semibold },
});

export default LanguageSwitcher;
