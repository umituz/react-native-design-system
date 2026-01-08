/**
 * Timezone Domain Entities
 *
 * Core timezone types and interfaces for device timezone detection
 * and date/time manipulation
 *
 * Features:
 * - Auto-detects device timezone
 * - Locale-aware date/time formatting
 * - Calendar utilities
 * - Date manipulation helpers
 *
 * Zero external dependencies - uses native Intl API
 */

/**
 * Timezone information from device
 */
export interface TimezoneInfo {
  /** IANA timezone identifier (e.g., "America/New_York", "Europe/Istanbul") */
  timezone: string;

  /** UTC offset in minutes (negative for west, positive for east) */
  offset: number;

  /** Human-readable timezone display name */
  displayName: string;
}

/**
 * Calendar day representation
 * Generic structure - can be extended by apps for app-specific data
 */
export interface TimezoneCalendarDay {
  /** Date object for this day */
  date: Date;

  /** Day of month (1-31) */
  day: number;

  /** Day of week (0 = Sunday, 6 = Saturday) */
  dayOfWeek: number;

  /** Month (0-11, 0 = January) */
  month: number;

  /** Year (e.g., 2024) */
  year: number;

  /** Whether this day is in the current month */
  isCurrentMonth: boolean;

  /** Whether this day is today */
  isToday: boolean;

  /** ISO date string (YYYY-MM-DD) */
  isoDate: string;
}

/**
 * Timezone Service Interface
 * Defines contract for timezone operations
 */
export interface ITimezoneService {
  /** Get current device timezone (IANA identifier) */
  getCurrentTimezone(): string;

  /** Get timezone offset in minutes */
  getTimezoneOffset(): number;

  /** Get complete timezone information */
  getTimezoneInfo(): TimezoneInfo;

  /** Format date with locale support */
  formatDate(
    date: Date | string | number,
    locale?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string;

  /** Format time with locale support */
  formatTime(
    date: Date | string | number,
    locale?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string;

  /** Get calendar days for a month */
  getCalendarDays(year: number, month: number): TimezoneCalendarDay[];

  /** Check if date is today */
  isToday(date: Date | string | number): boolean;

  /** Check if two dates are the same day */
  isSameDay(date1: Date | string | number, date2: Date | string | number): boolean;

  /** Add days to a date */
  addDays(date: Date | string | number, days: number): Date;

  /** Get start of day (00:00:00) */
  startOfDay(date: Date | string | number): Date;

  /** Get end of day (23:59:59.999) */
  endOfDay(date: Date | string | number): Date;

  /** Format date to ISO string (YYYY-MM-DD) */
  formatDateToString(date: Date | string | number): string;

  /** Format to display date string (DD.MM.YYYY) */
  formatToDisplayDate(date: Date | string | number): string;

  /** Format to display date time string (DD.MM.YYYY HH:mm) */
  formatToDisplayDateTime(date: Date | string | number): string;

  /** Get current date as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ) */
  getCurrentISOString(): string;

  /** Get current date object */
  getNow(): Date;

  /** Parse input to Date object */
  parse(date: Date | string | number): Date;

  /** Check if date is in the future */
  isFuture(date: Date | string | number): boolean;

  /** Check if date is in the past */
  isPast(date: Date | string | number): boolean;

  /** Get days until a future date (returns 0 if past) */
  getDaysUntil(date: Date | string | number): number;

  /** Get difference in days between two dates */
  getDifferenceInDays(date1: Date | string | number, date2: Date | string | number): number;

  /** Format date to ISO datetime string (YYYY-MM-DDTHH:mm:ss.sssZ) */
  formatToISOString(date: Date | string | number): string;

  /** Get list of common timezones for selection */
  getTimezones(): TimezoneInfo[];

  /** Check if date is valid */
  isValid(date: Date | string | number): boolean;

  /** Calculate age from birth date */
  getAge(birthDate: Date | string | number): number;

  /** Check if date is between two dates (inclusive) */
  isBetween(
    date: Date | string | number,
    start: Date | string | number,
    end: Date | string | number,
  ): boolean;

  /** Get earliest date from array */
  min(dates: Array<Date | string | number>): Date;

  /** Get latest date from array */
  max(dates: Array<Date | string | number>): Date;

  /** Get ISO week number (1-53) */
  getWeek(date: Date | string | number): number;

  /** Get quarter (1-4) */
  getQuarter(date: Date | string | number): number;

  /** Get timezone offset for specific timezone in minutes */
  getTimezoneOffsetFor(timezone: string, date?: Date | string | number): number;

  /** Convert date from one timezone to another */
  convertTimezone(
    date: Date | string | number,
    fromTimezone: string,
    toTimezone: string,
  ): Date;

  /** Format duration in milliseconds to human readable string */
  formatDuration(milliseconds: number): string;

  /** Check if date is on weekend */
  isWeekend(date: Date | string | number): boolean;

  /** Add business days (skip weekends) */
  addBusinessDays(date: Date | string | number, days: number): Date;

  /** Check if date is first day of month */
  isFirstDayOfMonth(date: Date | string | number): boolean;

  /** Check if date is last day of month */
  isLastDayOfMonth(date: Date | string | number): boolean;

  /** Get number of days in month */
  getDaysInMonth(date: Date | string | number): number;

  /** Get array of dates in range */
  getDateRange(
    start: Date | string | number,
    end: Date | string | number,
  ): Date[];

  /** Check if two date ranges overlap */
  areRangesOverlapping(
    start1: Date | string | number,
    end1: Date | string | number,
    start2: Date | string | number,
    end2: Date | string | number,
  ): boolean;

  /** Clamp date to range */
  clampDate(
    date: Date | string | number,
    min: Date | string | number,
    max: Date | string | number,
  ): Date;

  /** Check if two dates are same hour */
  areSameHour(date1: Date | string | number, date2: Date | string | number): boolean;

  /** Check if two dates are same minute */
  areSameMinute(date1: Date | string | number, date2: Date | string | number): boolean;

  /** Get middle of day (12:00:00) */
  getMiddleOfDay(date: Date | string | number): Date;

  /** Get relative time from now ("5 minutes ago", "in 2 hours") */
  fromNow(date: Date | string | number, locale?: string): string;
}
