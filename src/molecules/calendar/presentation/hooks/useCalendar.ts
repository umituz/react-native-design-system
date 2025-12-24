/**
 * useCalendar Hook
 *
 * Main hook for calendar functionality.
 * Provides calendar state, events, and actions.
 *
 * Usage:
 * ```tsx
 * const {
 *   days,
 *   events,
 *   selectedDate,
 *   viewMode,
 *   actions
 * } = useCalendar();
 *
 * // Navigate calendar
 * actions.navigateMonth('next');
 *
 * // Add event
 * actions.addEvent({
 *   title: 'Team Meeting',
 *   date: '2024-10-30',
 *   time: '14:00',
 * });
 * ```
 */

import { useMemo, useEffect, useState, useCallback } from 'react';
import { useCalendarStore, type CalendarViewMode } from '../../infrastructure/storage/CalendarStore';
import { CalendarService } from '../../infrastructure/services/CalendarService';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';
import type {
  CalendarEvent,
  SystemCalendar,
  CalendarPermissionResult,
} from '../../domain/entities/CalendarEvent.entity';

/**
 * Calendar hook return type
 */
export interface UseCalendarReturn {
  // Calendar data
  days: CalendarDay[];
  events: CalendarEvent[];
  selectedDate: Date;
  currentMonth: Date;
  viewMode: CalendarViewMode;

  // Computed data
  selectedDateEvents: CalendarEvent[];
  currentMonthEvents: CalendarEvent[];

  // State
  isLoading: boolean;
  error: string | null;

  // Actions
  actions: {
    loadEvents: () => Promise<void>;
    addEvent: (request: any) => Promise<void>;
    updateEvent: (request: any) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    completeEvent: (id: string) => Promise<void>;
    uncompleteEvent: (id: string) => Promise<void>;
    setSelectedDate: (date: Date) => void;
    goToToday: () => void;
    navigateMonth: (direction: 'prev' | 'next') => void;
    navigateWeek: (direction: 'prev' | 'next') => void;
    setCurrentMonth: (date: Date) => void;
    setViewMode: (mode: CalendarViewMode) => void;
    getEventsForDate: (date: Date) => CalendarEvent[];
    getEventsForMonth: (year: number, month: number) => CalendarEvent[];
    clearError: () => void;
    clearAllEvents: () => Promise<void>;
  };
}

/**
 * Main calendar hook
 */
export const useCalendar = (): UseCalendarReturn => {
  const {
    events,
    selectedDate,
    currentMonth,
    viewMode,
    isLoading,
    error,
    actions,
  } = useCalendarStore((state) => state);

  // Load events on mount
  useEffect(() => {
    actions.loadEvents();
  }, []);

  // Generate calendar days for current month
  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return CalendarService.getMonthDays(year, month, events);
  }, [currentMonth, events]);

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    return actions.getEventsForDate(selectedDate);
  }, [selectedDate, events]);

  // Get events for current month
  const currentMonthEvents = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return actions.getEventsForMonth(year, month);
  }, [currentMonth, events]);

  return {
    days,
    events,
    selectedDate,
    currentMonth,
    viewMode,
    selectedDateEvents,
    currentMonthEvents,
    isLoading,
    error,
    actions,
  };
};

/**
 * Hook for calendar navigation
 * Lightweight hook for just navigation actions
 */
export const useCalendarNavigation = () => {
  const {
    selectedDate,
    currentMonth,
    actions: { setSelectedDate, navigateMonth, goToToday, setCurrentMonth },
  } = useCalendarStore((state) => state);

  return {
    selectedDate,
    currentMonth,
    setSelectedDate,
    navigateMonth,
    goToToday,
    setCurrentMonth,
  };
};

/**
 * Hook for calendar events only
 * Lightweight hook for just event operations
 */
export const useCalendarEvents = () => {
  const {
    events,
    isLoading,
    error,
    actions: {
      loadEvents,
      addEvent,
      updateEvent,
      deleteEvent,
      completeEvent,
      uncompleteEvent,
      clearError,
    },
  } = useCalendarStore((state) => state);

  return {
    events,
    isLoading,
    error,
    loadEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    completeEvent,
    uncompleteEvent,
    clearError,
  };
};

/**
 * Hook for system calendar integration (expo-calendar)
 *
 * USAGE:
 * ```tsx
 * const {
 *   systemCalendars,
 *   permission,
 *   requestPermission,
 *   syncEventToCalendar,
 *   updateSyncedEvent,
 *   deleteSyncedEvent,
 * } = useSystemCalendar();
 *
 * // Request permission
 * const granted = await requestPermission();
 *
 * // Sync event to device calendar
 * await syncEventToCalendar(event);
 * ```
 */
export const useSystemCalendar = () => {
  const [systemCalendars, setSystemCalendars] = useState<SystemCalendar[]>([]);
  const [permission, setPermission] = useState<CalendarPermissionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { actions } = useCalendarStore((state) => state);

  /**
   * Request calendar permissions
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await CalendarService.requestPermissions();
      setPermission(result);
      return result.granted;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Load system calendars
   */
  const loadSystemCalendars = useCallback(async () => {
    setIsLoading(true);
    try {
      const calendars = await CalendarService.getSystemCalendars();
      setSystemCalendars(calendars);
    } catch {
      setSystemCalendars([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Sync event to system calendar
   */
  const syncEventToCalendar = useCallback(
    async (event: CalendarEvent): Promise<boolean> => {
      setIsLoading(true);
      try {
        const result = await CalendarService.syncToSystemCalendar(event);

        if (result.success && result.eventId && result.calendarId) {
          // Update event with system calendar info
          await actions.updateEvent({
            id: event.id,
            systemCalendar: {
              eventId: result.eventId,
              calendarId: result.calendarId,
              lastSyncedAt: new Date(),
            },
          });
          return true;
        }

        return false;
      } catch {
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [actions]
  );

  /**
   * Update synced event in system calendar
   */
  const updateSyncedEvent = useCallback(async (event: CalendarEvent): Promise<boolean> => {
    if (!event.systemCalendar) return false;

    setIsLoading(true);
    try {
      const result = await CalendarService.updateSystemCalendarEvent(event);

      if (result.success) {
        // Update last synced timestamp
        await actions.updateEvent({
          id: event.id,
          systemCalendar: {
            ...event.systemCalendar,
            lastSyncedAt: new Date(),
          },
        });
        return true;
      }

      return false;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [actions]);

  /**
   * Delete synced event from system calendar
   */
  const deleteSyncedEvent = useCallback(
    async (event: CalendarEvent): Promise<boolean> => {
      if (!event.systemCalendar) return false;

      setIsLoading(true);
      try {
        const result = await CalendarService.removeFromSystemCalendar(
          event.systemCalendar.eventId
        );

        if (result.success) {
          // Remove system calendar info from event
          await actions.updateEvent({
            id: event.id,
            systemCalendar: undefined,
          });
          return true;
        }

        return false;
      } catch {
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [actions]
  );

  // Load calendars when permission is granted
  useEffect(() => {
    if (permission?.granted) {
      loadSystemCalendars();
    }
  }, [permission, loadSystemCalendars]);

  return {
    systemCalendars,
    permission,
    isLoading,
    requestPermission,
    loadSystemCalendars,
    syncEventToCalendar,
    updateSyncedEvent,
    deleteSyncedEvent,
  };
};
