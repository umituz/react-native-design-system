import React from 'react';

/**
 * SafeBottomSheetModalProvider
 * A wrapper provider that was previously used for bottom sheet modals.
 * Currently serves as a pass-through to maintain compatibility with other packages.
 */
export const SafeBottomSheetModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
