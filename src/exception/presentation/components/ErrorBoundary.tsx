/**
 * Error Boundary Component
 * React 19 compatible - Functional component with hooks
 */

import React, { ReactNode, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText } from '../../../atoms';
import { exceptionService } from '../../infrastructure/services/ExceptionService';
import { useAppDesignTokens } from '../../../theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorInfo {
  error: Error;
  componentStack: string | null;
}

export const ErrorBoundary: React.FC<Props> = ({
  children,
  fallback,
  onError
}) => {
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    error: Error | null;
  }>({
    hasError: false,
    error: null,
  });

  const tokens = useAppDesignTokens();

  // Global error handler for React 19
  useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to exception service
    exceptionService.handleFatalError(error, {
      componentStack: errorInfo.componentStack ?? undefined,
      screen: 'ErrorBoundary',
    });

    // Update state
    setErrorState({
      hasError: true,
      error,
    });

    // Call external onError if provided
    if (onError) {
      onError(error, errorInfo);
    }
  }, [onError]);

  // Reset error state
  const resetError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
    });
  }, []);

  // If there's an error, render fallback
  if (errorState.hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <View style={[styles.container, { backgroundColor: tokens.colors.error.background }]}>
        <View style={styles.content}>
          <AtomicText variant="h3" style={styles.title}>
            Something went wrong
          </AtomicText>

          {errorState.error && (
            <AtomicText variant="body" style={styles.message}>
              {errorState.error.message}
            </AtomicText>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: tokens.colors.primary }]}
            onPress={resetError}
          >
            <AtomicText variant="button" style={styles.buttonText}>
              Try Again
            </AtomicText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.7,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});
