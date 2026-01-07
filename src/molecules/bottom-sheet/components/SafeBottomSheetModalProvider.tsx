import React, { ReactNode } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

interface SafeBottomSheetModalProviderProps {
  children: ReactNode;
}

export const SafeBottomSheetModalProvider = ({ children }: SafeBottomSheetModalProviderProps) => {
  React.useEffect(() => {
    if (__DEV__) {
      console.log('[SafeBottomSheetModalProvider] Mounted and providing context');
    }
  }, []);

  if (__DEV__) {
    console.log('[SafeBottomSheetModalProvider] Rendering');
  }

  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
};

