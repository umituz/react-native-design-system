/**
 * Calendar Navigation Actions
 * Navigation and view mode operations for calendar store
 */

import { CalendarService } from '../services/CalendarService';
import type { CalendarState, CalendarViewMode } from './CalendarStore.types';

/**
 * Set selected date
 */
export const setSelectedDate = (
  date: Date,
  set: (state: Partial<CalendarState>) => void
): void => {
  set({ selectedDate: date });
};

/**
 * Go to today's date
 */
export const goToToday = (
  set: (state: Partial<CalendarState>) => void
): void => {
  const today = new Date();
  set({
    selectedDate: today,
    currentMonth: today,
  });
};

/**
 * Navigate to previous/next month
 */
export const navigateMonth = (
  direction: 'prev' | 'next',
  set: (state: Partial<CalendarState>) => void,
  get: () => CalendarState
): void => {
  const currentMonth = get().currentMonth;
  const newMonth =
    direction === 'prev'
      ? CalendarService.getPreviousMonth(currentMonth)
      : CalendarService.getNextMonth(currentMonth);

  set({ currentMonth: newMonth });
};

/**
 * Navigate to previous/next week
 */
export const navigateWeek = (
  direction: 'prev' | 'next',
  set: (state: Partial<CalendarState>) => void,
  get: () => CalendarState
): void => {
  const selectedDate = get().selectedDate;
  const newDate =
    direction === 'prev'
      ? CalendarService.getPreviousWeek(selectedDate)
      : CalendarService.getNextWeek(selectedDate);

  set({ selectedDate: newDate });
};

/**
 * Set current month directly
 */
export const setCurrentMonth = (
  date: Date,
  set: (state: Partial<CalendarState>) => void
): void => {
  set({ currentMonth: date });
};

/**
 * Set view mode
 */
export const setViewMode = (
  mode: CalendarViewMode,
  set: (state: Partial<CalendarState>) => void
): void => {
  set({ viewMode: mode });
};

/**
 * Get events for a specific date
 */
export const getEventsForDate = (
  date: Date,
  get: () => CalendarState
): ReturnType<typeof CalendarService.getEventsForDate> => {
  const events = get().events;
  return CalendarService.getEventsForDate(date, events);
};

/**
 * Get events for a specific month
 */
export const getEventsForMonth = (
  year: number,
  month: number,
  get: () => CalendarState
): ReturnType<typeof CalendarService.getEventsInRange> => {
  const events = get().events;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return CalendarService.getEventsInRange(firstDay, lastDay, events);
};

/**
 * Clear error state
 */
export const clearError = (
  set: (state: Partial<CalendarState>) => void
): void => {
  set({ error: null });
};
