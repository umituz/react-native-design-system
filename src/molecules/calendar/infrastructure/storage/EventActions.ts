/**
 * Calendar Event Actions
 * Event CRUD operations for calendar store
 */

import { storageRepository, unwrap } from '@umituz/react-native-storage';
import type { CalendarEvent, CreateCalendarEventRequest, UpdateCalendarEventRequest } from '../../domain/entities/CalendarEvent.entity';
import { generateId, STORAGE_KEY, hydrateEvents, handleStorageError, handleStorageSuccess } from './CalendarStore.utils';
import type { CalendarState } from './CalendarStore.types';

/**
 * Load events from storage
 */
export const loadEvents = async (
  set: (state: Partial<CalendarState>) => void
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const result = await storageRepository.getItem<CalendarEvent[]>(STORAGE_KEY, []);
    const events = unwrap(result, []);

    if (events && events.length > 0) {
      const hydratedEvents = hydrateEvents(events);
      set({ events: hydratedEvents, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  } catch {
    handleStorageError(set, 'Failed to load events');
  }
};

/**
 * Add a new event
 */
export const addEvent = async (
  request: CreateCalendarEventRequest,
  set: (state: Partial<CalendarState>) => void,
  get: () => CalendarState
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const newEvent: CalendarEvent = {
      id: generateId(),
      ...request,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const events = [...get().events, newEvent];
    await storageRepository.setItem(STORAGE_KEY, events);
    handleStorageSuccess(set, { events });
  } catch {
    handleStorageError(set, 'Failed to add event');
  }
};

/**
 * Update an existing event
 */
export const updateEvent = async (
  request: UpdateCalendarEventRequest,
  set: (state: Partial<CalendarState>) => void,
  get: () => CalendarState
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const events = get().events.map((event) => {
      if (event.id === request.id) {
        return {
          ...event,
          ...request,
          updatedAt: new Date(),
        };
      }
      return event;
    });

    await storageRepository.setItem(STORAGE_KEY, events);
    handleStorageSuccess(set, { events });
  } catch {
    handleStorageError(set, 'Failed to update event');
  }
};

/**
 * Delete an event
 */
export const deleteEvent = async (
  id: string,
  set: (state: Partial<CalendarState>) => void,
  get: () => CalendarState
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const events = get().events.filter((event) => event.id !== id);
    await storageRepository.setItem(STORAGE_KEY, events);
    handleStorageSuccess(set, { events });
  } catch {
    handleStorageError(set, 'Failed to delete event');
  }
};

/**
 * Mark event as completed
 */
export const completeEvent = async (
  id: string,
  get: () => CalendarState,
  updateEvent: (request: UpdateCalendarEventRequest) => Promise<void>
): Promise<void> => {
  await updateEvent({ id, isCompleted: true });
};

/**
 * Mark event as incomplete
 */
export const uncompleteEvent = async (
  id: string,
  get: () => CalendarState,
  updateEvent: (request: UpdateCalendarEventRequest) => Promise<void>
): Promise<void> => {
  await updateEvent({ id, isCompleted: false });
};

/**
 * Clear all events (for testing/reset)
 */
export const clearAllEvents = async (
  set: (state: Partial<CalendarState>) => void
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    await storageRepository.removeItem(STORAGE_KEY);
    handleStorageSuccess(set, { events: [] });
  } catch {
    handleStorageError(set, 'Failed to clear events');
  }
};
