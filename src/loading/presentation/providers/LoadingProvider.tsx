/**
 * LoadingProvider
 * Global loading provider with auto-detection
 */

import React, { useEffect, useRef, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';
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
  const isFetching = useIsFetching();
  const [showFetchLoading, setShowFetchLoading] = useState(false);
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
      setShowFetchLoading(true);
    } else if (showFetchLoading) {
      const elapsed = Date.now() - showTimeRef.current;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      hideTimeoutRef.current = setTimeout(() => {
        setShowFetchLoading(false);
        hideTimeoutRef.current = null;
      }, remaining);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isFetching, detectFetching, minDisplayTime, showFetchLoading]);

  return (
    <>
      {children}
      <LoadingOverlay
        visible={detectFetching && showFetchLoading}
        message={defaultMessage}
        spinnerColor={spinnerColor}
        spinnerSize={spinnerSize}
        overlayColor={overlayColor}
      />
    </>
  );
};
