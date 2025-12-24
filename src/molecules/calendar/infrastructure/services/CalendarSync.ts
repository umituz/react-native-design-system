/**
 * Calendar Sync Service
 *
 * Handles synchronization with system calendar.
 *
 * SOLID: Single Responsibility - Only sync operations
 * DRY: Centralized sync logic
 * KISS: Simple sync interface
 */

import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';
import { CalendarPermissions } from './CalendarPermissions';
import type { CalendarEvent, SystemCalendar } from '../../domain/entities/CalendarEvent.entity';

export class CalendarSync {
  /**
   * Sync event to system calendar
   */
  static async syncToSystemCalendar(
    event: CalendarEvent
  ): Promise<{
    success: boolean;
    eventId?: string;
    calendarId?: string;
    error?: string;
  }> {
    try {
      if (Platform.OS === 'web') {
        return { success: false, error: 'Calendar sync not supported on web' };
      }

      const permission = await CalendarPermissions.requestPermissions();
      if (!permission.granted) {
        return { success: false, error: 'Calendar permission not granted' };
      }

      const primaryCal = await this.getPrimaryCalendar();
      if (!primaryCal) {
        return { success: false, error: 'No writable calendar found' };
      }

      const eventData = this.buildSystemEventData(event);
      const systemEventId = await Calendar.createEventAsync(primaryCal.id, eventData);

      return {
        success: true,
        eventId: systemEventId,
        calendarId: primaryCal.id
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sync to calendar'
      };
    }
  }

  /**
   * Update system calendar event
   */
  static async updateSystemCalendarEvent(
    event: CalendarEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (Platform.OS === 'web' || !event.systemCalendar) {
        return { success: false, error: 'No system calendar data' };
      }

      const permission = await CalendarPermissions.requestPermissions();
      if (!permission.granted) {
        return { success: false, error: 'Calendar permission not granted' };
      }

      const eventData = this.buildSystemEventData(event);
      await Calendar.updateEventAsync(event.systemCalendar.eventId, eventData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update event'
      };
    }
  }

  /**
   * Remove event from system calendar
   */
  static async removeFromSystemCalendar(
    eventId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (Platform.OS === 'web') {
        return { success: false, error: 'Calendar sync not supported on web' };
      }

      const permission = await CalendarPermissions.requestPermissions();
      if (!permission.granted) {
        return { success: false, error: 'Calendar permission not granted' };
      }

      await Calendar.deleteEventAsync(eventId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove from calendar'
      };
    }
  }

  /**
   * Get primary writable calendar
   */
  static async getPrimaryCalendar(): Promise<SystemCalendar | null> {
    try {
      if (Platform.OS === 'web') {
        return null;
      }

      const calendars = await Calendar.getCalendarsAsync();
      const writableCalendars = calendars.filter((cal: Calendar.Calendar) =>
        cal.allowsModifications &&
        (cal.source.type === 'local' || cal.source.type === 'caldav')
      );

      // Prefer default calendar, fallback to first writable
      const primaryCal = writableCalendars.find((cal: Calendar.Calendar) => cal.isPrimary) || writableCalendars[0];
      if (!primaryCal) return null;

      return {
        id: primaryCal.id,
        title: primaryCal.title,
        color: primaryCal.color,
        allowsModifications: primaryCal.allowsModifications,
        source: primaryCal.source.name,
        isPrimary: primaryCal.isPrimary || false
      };
    } catch {
      return null;
    }
  }

  /**
   * Get all system calendars
   */
  static async getSystemCalendars(): Promise<SystemCalendar[]> {
    try {
      if (Platform.OS === 'web') {
        return [];
      }

      const calendars = await Calendar.getCalendarsAsync();
      return calendars.map((cal: Calendar.Calendar) => ({
        id: cal.id,
        title: cal.title,
        color: cal.color,
        allowsModifications: cal.allowsModifications,
        source: cal.source.name,
        isPrimary: cal.isPrimary || false
      }));
    } catch {
      return [];
    }
  }

  /**
   * Build system calendar event data
   */
  private static buildSystemEventData(event: CalendarEvent) {
    const [year, month, day] = event.date.split('-').map(Number);
    let startDate = new Date(year, month - 1, day);
    let endDate = new Date(startDate);

    // Set time if provided
    if (event.time) {
      const [hours, minutes] = event.time.split(':').map(Number);
      startDate.setHours(hours, minutes, 0, 0);
      endDate.setHours(hours, minutes, 0, 0);
    }

    // Set duration
    if (event.duration) {
      endDate.setMinutes(endDate.getMinutes() + event.duration);
    } else {
      endDate.setHours(endDate.getHours() + 1); // Default 1 hour
    }

    // Create reminders
    const alarms = event.reminders?.map(minutesBefore => ({
      relativeOffset: -minutesBefore
    }));

    return {
      title: event.title,
      startDate,
      endDate,
      notes: event.description,
      location: event.location,
      alarms,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
}
