/**
 * Calendar Store Types
 * Type definitions for calendar store
 */

import type { CalendarEvent, CreateCalendarEventRequest, UpdateCalendarEventRequest } from '../../domain/entities/CalendarEvent.entity';

/**
 * Calendar view mode
 */
export type CalendarViewMode = 'month' | 'week' | 'day' | 'list';

/**
 * Calendar state (data only)
 */
export interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date;
  currentMonth: Date;
  viewMode: CalendarViewMode;
  isLoading: boolean;
  error: string | null;
}

/**
 * Calendar actions
 */
export interface CalendarActions {
  // Event CRUD
  loadEvents: () => Promise<void>;
  addEvent: (request: CreateCalendarEventRequest) => Promise<void>;
  updateEvent: (request: UpdateCalendarEventRequest) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  completeEvent: (id: string) => Promise<void>;
  uncompleteEvent: (id: string) => Promise<void>;

  // Navigation
  setSelectedDate: (date: Date) => void;
  goToToday: () => void;
  navigateMonth: (direction: 'prev' | 'next') => void;
  navigateWeek: (direction: 'prev' | 'next') => void;
  setCurrentMonth: (date: Date) => void;

  // View mode
  setViewMode: (mode: CalendarViewMode) => void;

  // Utilities
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForMonth: (year: number, month: number) => CalendarEvent[];
  clearError: () => void;
  clearAllEvents: () => Promise<void>;
}

/**
 * Initial state
 */
export const initialState: CalendarState = {
  events: [],
  selectedDate: new Date(),
  currentMonth: new Date(),
  viewMode: 'month',
  isLoading: false,
  error: null,
};
