/**
 * Exception Store
 * Zustand store for exception state management
 */

import { createStore } from '../../../storage';
import type { ExceptionEntity } from '../../domain/entities/ExceptionEntity';

interface ExceptionState {
    exceptions: ExceptionEntity[];
}

interface ExceptionActions {
    addException: (exception: ExceptionEntity) => void;
    clearExceptions: () => void;
    markAsHandled: (id: string) => void;
}

export const useExceptionStore = createStore<ExceptionState, ExceptionActions>({
    name: 'exception-store',
    initialState: {
        exceptions: [],
    },
    persist: false,
    actions: (set: (state: Partial<ExceptionState>) => void, get: () => ExceptionState) => ({
        addException: (exception: ExceptionEntity) =>
            set({ exceptions: [...get().exceptions, exception] }),
        clearExceptions: () => set({ exceptions: [] }),
        markAsHandled: (id: string) =>
            set({
                exceptions: get().exceptions.map((e: ExceptionEntity) =>
                    e.id === id ? { ...e, handled: true } : e
                ),
            }),
    }),
});

/**
 * Hook to get exceptions from store
 */
export const useExceptions = () => {
    const exceptions = useExceptionStore((state: ExceptionState) => state.exceptions);
    return exceptions;
};
