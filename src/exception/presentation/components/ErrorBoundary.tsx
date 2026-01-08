/**
 * Error Boundary Component
 * Catches React errors and provides fallback UI
 */

import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { exceptionService } from '../../infrastructure/services/ExceptionService';
import { useAppDesignTokens } from '../../../theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to exception service
    exceptionService.handleFatalError(error, {
      componentStack: errorInfo.componentStack ?? undefined,
      screen: 'ErrorBoundary',
    });

    // Call external onError if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDisplay error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

interface ErrorDisplayProps {
  error: Error | null;
  onReset: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onReset }) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        {error?.message || 'An unexpected error occurred'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    button: {
      backgroundColor: tokens.colors.primary,
      borderRadius: tokens.borders.radius.sm,
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.sm,
    },
    buttonText: {
      color: tokens.colors.textInverse,
      fontSize: tokens.typography.bodyLarge.fontSize,
      fontWeight: tokens.typography.labelLarge.fontWeight,
    },
    container: {
      alignItems: 'center',
      backgroundColor: tokens.colors.backgroundPrimary,
      flex: 1,
      justifyContent: 'center',
      padding: tokens.spacing.lg,
    },
    message: {
      color: tokens.colors.textSecondary,
      fontSize: tokens.typography.bodyLarge.fontSize,
      marginBottom: tokens.spacing.lg,
      textAlign: 'center',
    },
    title: {
      color: tokens.colors.textPrimary,
      fontSize: tokens.typography.headlineSmall.fontSize,
      fontWeight: tokens.typography.headlineSmall.fontWeight,
      marginBottom: tokens.spacing.sm,
    },
  });


