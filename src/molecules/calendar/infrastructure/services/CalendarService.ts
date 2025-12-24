/**
 * Calendar Service
 *
 * Facade for calendar operations using composition.
 * Delegates to specialized services for specific operations.
 *
 * SOLID: Facade pattern - Single entry point, delegates to specialists
 * DRY: Avoids code duplication by composing smaller services
 * KISS: Simple interface, complex operations delegated
 */

import type { CalendarDay, CalendarWeek } from '../../domain/entities/CalendarDay.entity';
import type { CalendarEvent, SystemCalendar } from '../../domain/entities/CalendarEvent.entity';
import { CalendarGeneration } from './CalendarGeneration';
import { CalendarPermissions } from './CalendarPermissions';
// CalendarEvents is not used in this facade
// import { CalendarEvents } from './CalendarEvents';
import { CalendarSync } from './CalendarSync';
import { DateUtilities } from '../utils/DateUtilities';

/**
 * Calendar Service Implementation
 *
 * Facade that delegates to specialized services.
 * Follows SOLID principles with composition over inheritance.
 */
export class CalendarService {
  /**
   * Generate calendar days for a specific month
   */
  static getMonthDays(
    year: number,
    month: number,
    events: CalendarEvent[] = []
  ): CalendarDay[] {
    return CalendarGeneration.generateMonthDays(year, month, events);
  }

  /**
   * Generate calendar week
   */
  static getWeek(date: Date, events: CalendarEvent[] = []): CalendarWeek {
    const startDate = DateUtilities.getStartOfWeek(date);
    const endDate = DateUtilities.getEndOfWeek(date);
    const days = CalendarGeneration.generateWeekDays(startDate, events);

    return {
      startDate,
      endDate,
      days
    };
  }

  /**
   * Navigate to previous month
   */
  static getPreviousMonth(currentDate: Date): Date {
    return CalendarGeneration.getPreviousMonth(currentDate);
  }

  /**
   * Navigate to next month
   */
  static getNextMonth(currentDate: Date): Date {
    return CalendarGeneration.getNextMonth(currentDate);
  }

  /**
   * Navigate to previous week
   */
  static getPreviousWeek(currentDate: Date): Date {
    return CalendarGeneration.getPreviousWeek(currentDate);
  }

  /**
   * Navigate to next week
   */
  static getNextWeek(currentDate: Date): Date {
    return CalendarGeneration.getNextWeek(currentDate);
  }

  /**
   * Request calendar permissions
   */
  static async requestPermissions() {
    return CalendarPermissions.requestPermissions();
  }

  /**
   * Check if permissions are granted
   */
  static async hasPermissions(): Promise<boolean> {
    return CalendarPermissions.hasPermissions();
  }

  /**
   * Sync event to system calendar
   */
  static async syncToSystemCalendar(event: CalendarEvent) {
    return CalendarSync.syncToSystemCalendar(event);
  }

  /**
   * Update system calendar event
   */
  static async updateSystemCalendarEvent(event: CalendarEvent) {
    return CalendarSync.updateSystemCalendarEvent(event);
  }

  /**
   * Remove event from system calendar
   */
  static async removeFromSystemCalendar(eventId: string) {
    return CalendarSync.removeFromSystemCalendar(eventId);
  }

  /**
   * Get system calendars
   */
  static async getSystemCalendars(): Promise<SystemCalendar[]> {
    return CalendarSync.getSystemCalendars();
  }

  /**
   * Get events for a specific date
   */
  static getEventsForDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
    return CalendarGeneration.getEventsForDate(date, events);
  }

  /**
   * Get events in date range
   */
  static getEventsInRange(
    startDate: Date,
    endDate: Date,
    events: CalendarEvent[]
  ): CalendarEvent[] {
    return CalendarGeneration.getEventsInRange(startDate, endDate, events);
  }

  /**
   * Get weekday names
   */
  static getWeekdayNames(): string[] {
    const weekdays: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i);
      weekdays.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return weekdays;
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return DateUtilities.isSameDay(date1, date2);
  }
}