import React, { ReactNode } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

interface SafeBottomSheetModalProviderProps {
  children: ReactNode;
}

export const SafeBottomSheetModalProvider = ({ children }: SafeBottomSheetModalProviderProps) => (
  <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
);

