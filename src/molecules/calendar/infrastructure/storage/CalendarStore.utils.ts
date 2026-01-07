/**
 * Calendar Store Utilities
 * Helper functions for calendar store operations
 */

import type { CalendarEvent } from '../../domain/entities/CalendarEvent.entity';
import type { CalendarState } from './CalendarStore.types';

/**
 * Storage key for calendar events
 */
export const STORAGE_KEY = 'calendar_events';

/**
 * Generate unique ID for events
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Hydrate date strings in events back to Date objects
 */
export const hydrateEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.map((event) => ({
    ...event,
    createdAt: new Date(event.createdAt),
    updatedAt: new Date(event.updatedAt),
  }));
};

/**
 * Handle storage operation error
 */
export const handleStorageError = (
  set: (state: Partial<CalendarState>) => void,
  errorMessage: string
): void => {
  set({
    error: errorMessage,
    isLoading: false,
  });
};

/**
 * Handle storage operation success
 */
export const handleStorageSuccess = (
  set: (state: Partial<CalendarState>) => void,
  updates: Partial<CalendarState>
): void => {
  set({
    ...updates,
    isLoading: false,
  });
};
