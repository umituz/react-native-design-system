/**
 * Calendar Events Service
 *
 * Handles CRUD operations for calendar events.
 *
 * SOLID: Single Responsibility - Only event operations
 * DRY: Centralized event management
 * KISS: Simple event interface
 */

import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';
import { DateUtilities } from '../utils/DateUtilities';
import { CalendarPermissions } from './CalendarPermissions';
import type { CalendarEvent, SystemCalendar } from '../../domain/entities/CalendarEvent.entity';

export class CalendarEvents {
  /**
   * Create event in system calendar
   */
  static async createEvent(
    event: CalendarEvent,
    calendar: SystemCalendar
  ): Promise<{ success: boolean; eventId?: string; error?: string }> {
    try {
      if (Platform.OS === 'web') {
        return { success: false, error: 'Calendar sync not supported on web' };
      }

      const permission = await CalendarPermissions.requestPermissions();
      if (!permission.granted) {
        return { success: false, error: 'Calendar permission not granted' };
      }

      const eventData = this.buildEventData(event);
      const systemEventId = await Calendar.createEventAsync(calendar.id, eventData);

      return {
        success: true,
        eventId: systemEventId
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create event'
      };
    }
  }

  /**
   * Update event in system calendar
   */
  static async updateEvent(
    event: CalendarEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (Platform.OS === 'web' || !event.systemCalendar?.eventId) {
        return { success: false, error: 'No system calendar data' };
      }

      const permission = await CalendarPermissions.requestPermissions();
      if (!permission.granted) {
        return { success: false, error: 'Calendar permission not granted' };
      }

      const eventData = this.buildEventData(event);
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
   * Delete event from system calendar
   */
  static async deleteEvent(
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
        error: error instanceof Error ? error.message : 'Failed to delete event'
      };
    }
  }

  /**
   * Get events from system calendar
   */
  static async getSystemEvents(
    calendarId: string,
    startDate: Date,
    endDate: Date
  ): Promise<CalendarEvent[]> {
    try {
      if (Platform.OS === 'web') {
        return [];
      }

      const permission = await CalendarPermissions.hasPermissions();
      if (!permission) {
        return [];
      }

      const systemEvents = await Calendar.getEventsAsync(
        [calendarId],
        startDate,
        endDate
      );

      return systemEvents.map((event: Calendar.Event) => this.mapSystemEventToCalendarEvent(event));
    } catch {
      return [];
    }
  }

  /**
   * Build event data for system calendar
   */
  private static buildEventData(event: CalendarEvent) {
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
      timeZone: DateUtilities.getCurrentTimezone()
    };
  }

  /**
   * Map system calendar event to domain event
   */
  private static mapSystemEventToCalendarEvent(systemEvent: any): CalendarEvent {
    return {
      id: systemEvent.id,
      title: systemEvent.title || '',
      description: systemEvent.notes || '',
      date: DateUtilities.formatDateToString(systemEvent.startDate),
      time: DateUtilities.formatTimeToString(systemEvent.startDate),
      duration: systemEvent.endDate && systemEvent.startDate
        ? (systemEvent.endDate.getTime() - systemEvent.startDate.getTime()) / (1000 * 60)
        : undefined,
      location: systemEvent.location || '',
      reminders: systemEvent.alarms?.map((alarm: any) => -alarm.relativeOffset) || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      systemCalendar: {
        calendarId: systemEvent.calendarId,
        eventId: systemEvent.id,
        lastSyncedAt: new Date()
      }
    };
  }
}
