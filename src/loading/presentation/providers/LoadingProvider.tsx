/**
 * LoadingProvider
 * Global loading provider with auto-detection
 */

import React, { useEffect, useRef } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { useLoadingStore } from '../../infrastructure/store/LoadingStore';
import { LoadingOverlay } from '../components/LoadingOverlay';
import type { LoadingProviderProps } from '../../domain/types/loading.types';

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  spinnerColor,
  spinnerSize = 'lg',
  overlayColor,
  defaultMessage,
  detectFetching = true,
  minDisplayTime = 300,
}) => {
  const { isLoading, message, show, hide } = useLoadingStore();
  const isFetching = useIsFetching();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!detectFetching) return;

    if (isFetching > 0) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      showTimeRef.current = Date.now();
      show(defaultMessage, 'fetch');
    } else if (isLoading) {
      const elapsed = Date.now() - showTimeRef.current;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      hideTimeoutRef.current = setTimeout(() => {
        hide();
        hideTimeoutRef.current = null;
      }, remaining);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isFetching, detectFetching, show, hide, defaultMessage, minDisplayTime, isLoading]);

  return (
    <>
      {children}
      <LoadingOverlay
        visible={isLoading}
        message={message || defaultMessage}
        spinnerColor={spinnerColor}
        spinnerSize={spinnerSize}
        overlayColor={overlayColor}
      />
    </>
  );
};
