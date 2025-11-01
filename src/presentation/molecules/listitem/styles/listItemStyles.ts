import { ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../../hooks/useAppDesignTokens';

type DesignTokens = ReturnType<typeof useAppDesignTokens>;

export const getListItemStyles = (tokens: DesignTokens) => ({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borders.radius.lg,
    marginBottom: tokens.spacing.sm,
  } as ViewStyle,
  disabled: { opacity: 0.6 } as ViewStyle,
  iconContainer: { marginHorizontal: tokens.spacing.sm } as ViewStyle,
  content: { flex: 1 } as ViewStyle,
  subtitle: { marginTop: tokens.spacing.xs } as ViewStyle,
});
