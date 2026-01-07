/**
 * Calendar Store - Combined Hook
 * Convenience hook that combines all calendar stores
 */

import { useMemo } from 'react';
import { useCalendarEvents } from '../stores/useCalendarEvents';
import { useCalendarNavigation } from '../stores/useCalendarNavigation';
import { useCalendarView } from '../stores/useCalendarView';
import { CalendarService } from '../services/CalendarService';

// Export individual stores
export { useCalendarEvents } from '../stores/useCalendarEvents';
export { useCalendarNavigation } from '../stores/useCalendarNavigation';
export { useCalendarView } from '../stores/useCalendarView';

// Export types
export type { CalendarViewMode } from '../stores/useCalendarView';

/**
 * Combined calendar hook
 * Use this for convenience, or use individual stores for fine-grained control
 */
export const useCalendar = () => {
  const events = useCalendarEvents();
  const navigation = useCalendarNavigation();
  const view = useCalendarView();

  // Utility functions for backward compatibility
  const getEventsForDate = (date: Date) => {
    return events.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventsForMonth = (year: number, month: number) => {
    return events.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  return {
    // Events state and actions
    events: events.events,
    isLoading: events.isLoading,
    error: events.error,
    loadEvents: events.loadEvents,
    addEvent: events.addEvent,
    updateEvent: events.updateEvent,
    deleteEvent: events.deleteEvent,
    completeEvent: events.completeEvent,
    uncompleteEvent: events.uncompleteEvent,
    clearError: events.clearError,
    clearAllEvents: events.clearAllEvents,

    // Navigation state and actions
    selectedDate: navigation.selectedDate,
    currentMonth: navigation.currentMonth,
    setSelectedDate: navigation.setSelectedDate,
    goToToday: navigation.goToToday,
    navigateMonth: navigation.navigateMonth,
    setCurrentMonth: navigation.setCurrentMonth,

    // View state and actions
    viewMode: view.viewMode,
    setViewMode: view.setViewMode,

    // Utility functions
    getEventsForDate,
    getEventsForMonth,
  };
};

/**
 * Legacy alias for backward compatibility
 * @deprecated Use useCalendar instead
 */
export const useCalendarStore = () => {
  const calendar = useCalendar();

  const days = useMemo(() => {
    const year = calendar.currentMonth.getFullYear();
    const month = calendar.currentMonth.getMonth();
    return CalendarService.getMonthDays(year, month, calendar.events);
  }, [calendar.currentMonth, calendar.events]);

  return {
    events: calendar.events,
    selectedDate: calendar.selectedDate,
    currentMonth: calendar.currentMonth,
    viewMode: calendar.viewMode,
    isLoading: calendar.isLoading,
    error: calendar.error,
    actions: {
      loadEvents: calendar.loadEvents,
      addEvent: calendar.addEvent,
      updateEvent: calendar.updateEvent,
      deleteEvent: calendar.deleteEvent,
      completeEvent: calendar.completeEvent,
      uncompleteEvent: calendar.uncompleteEvent,
      setSelectedDate: calendar.setSelectedDate,
      goToToday: calendar.goToToday,
      navigateMonth: calendar.navigateMonth,
      setCurrentMonth: calendar.setCurrentMonth,
      setViewMode: calendar.setViewMode,
      getEventsForDate: calendar.getEventsForDate,
      getEventsForMonth: calendar.getEventsForMonth,
      clearError: calendar.clearError,
      clearAllEvents: calendar.clearAllEvents,
    },
    days,
  };
};
