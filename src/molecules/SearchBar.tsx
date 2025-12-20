/**
 * SearchBar Molecule - Enhanced Search Input with Clear Button
 *
 * Universal search input with clear functionality and loading state
 * Fully configurable for general purpose use
 */

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicIcon } from '../atoms';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: ViewStyle;
  searchIconName?: string;
  clearIconName?: string;
}

const useSearchBarLogic = (
  value: string,
  loading: boolean,
  onChangeText: (text: string) => void,
  onClear?: () => void,
  onSubmit?: () => void
) => {
  const handleClear = React.useCallback(() => {
    onChangeText('');
    onClear?.();
  }, [onChangeText, onClear]);

  const handleSubmit = React.useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  const showClear = React.useMemo(() =>
    value.length > 0 && !loading, [value, loading]
  );

  return { handleClear, handleSubmit, showClear };
};

const SearchBarInput: React.FC<{
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  tokens: ReturnType<typeof useAppDesignTokens>;
}> = ({ value, placeholder, autoFocus, disabled, style, onChangeText, onSubmitEditing, tokens }) => {
  const styles = React.useMemo(() => getSearchBarStyles(), []);

  const inputStyle = React.useMemo(() => [
    styles.input,
    {
      color: tokens.colors.textPrimary,
      ...tokens.typography.bodyMedium,
    },
  ], [styles.input, tokens.colors.textPrimary, tokens.typography.bodyMedium]);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={tokens.colors.textSecondary}
      autoFocus={autoFocus}
      editable={!disabled}
      returnKeyType="search"
      autoCapitalize="none"
      autoCorrect={false}
      style={[inputStyle, style]}
    />
  );
};

const SearchBarIcons: React.FC<{
  searchIconName: string;
  clearIconName: string;
  loading: boolean;
  showClear: boolean;
  onClear: () => void;
  tokens: ReturnType<typeof useAppDesignTokens>;
}> = ({ searchIconName, clearIconName, loading, showClear, onClear, tokens }) => {
  const styles = React.useMemo(() => getSearchBarStyles(), []);

  return (
    <>
      <AtomicIcon
        name={searchIconName}
        customSize={20}
        customColor={tokens.colors.textSecondary}
        style={styles.searchIcon}
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color={tokens.colors.primary}
          style={styles.icon}
        />
      )}

      {showClear && (
        <TouchableOpacity onPress={onClear} style={styles.icon}>
          <AtomicIcon name={clearIconName} customSize={20} customColor={tokens.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </>
  );
};

const SearchBarComponent: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder,
  autoFocus = false,
  loading = false,
  disabled = false,
  style,
  containerStyle,
  searchIconName = 'search',
  clearIconName = 'close-circle',
}) => {
  const tokens = useAppDesignTokens();
  const { handleClear, handleSubmit, showClear } = useSearchBarLogic(
    value, loading, onChangeText, onClear, onSubmit
  );

  return (
    <View style={containerStyle}>
      <SearchBarIcons
        searchIconName={searchIconName}
        clearIconName={clearIconName}
        loading={loading}
        showClear={showClear}
        onClear={handleClear}
        tokens={tokens}
      />

      <SearchBarInput
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        style={style}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        tokens={tokens}
      />
    </View>
  );
};

export const SearchBar = SearchBarComponent;

const getSearchBarStyles = () => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  icon: {
    marginLeft: 8,
  },
});

