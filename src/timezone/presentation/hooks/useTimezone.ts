/**
 * useTimezone Hook
 *
 * React hook for timezone operations with automatic locale integration
 * Integrates with localization package for locale-aware date/time formatting
 */

import { useMemo, useCallback } from 'react';
import { useLocalization } from '@umituz/react-native-localization';
import { timezoneService } from '../../infrastructure/services/TimezoneService';
import type { TimezoneInfo, CalendarDay } from '../../domain/entities/Timezone';

export interface UseTimezoneReturn {
  timezone: string;
  timezoneInfo: TimezoneInfo;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  getCalendarDays: (year: number, month: number) => CalendarDay[];
  isToday: (date: Date) => boolean;
  isSameDay: (date1: Date, date2: Date) => boolean;
  addDays: (date: Date, days: number) => Date;
  startOfDay: (date: Date) => Date;
  endOfDay: (date: Date) => Date;
  formatDateToString: (date: Date) => string;
  getCurrentISOString: () => string;
  formatToISOString: (date: Date) => string;
  formatRelativeTime: (date: Date) => string;
  formatDateTime: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  getTimezones: () => TimezoneInfo[];
  isValid: (date: Date) => boolean;
  getAge: (birthDate: Date) => number;
  isBetween: (date: Date, start: Date, end: Date) => boolean;
  min: (dates: Date[]) => Date;
  max: (dates: Date[]) => Date;
  getWeek: (date: Date) => number;
  getQuarter: (date: Date) => number;
  getTimezoneOffsetFor: (timezone: string, date?: Date) => number;
  convertTimezone: (date: Date, fromTimezone: string, toTimezone: string) => Date;
  formatDuration: (milliseconds: number) => string;
  isWeekend: (date: Date) => boolean;
  addBusinessDays: (date: Date, days: number) => Date;
  isFirstDayOfMonth: (date: Date) => boolean;
  isLastDayOfMonth: (date: Date) => boolean;
  getDaysInMonth: (date: Date) => number;
  getDateRange: (start: Date, end: Date) => Date[];
  areRangesOverlapping: (start1: Date, end1: Date, start2: Date, end2: Date) => boolean;
  clampDate: (date: Date, min: Date, max: Date) => Date;
  areSameHour: (date1: Date, date2: Date) => boolean;
  areSameMinute: (date1: Date, date2: Date) => boolean;
  getMiddleOfDay: (date: Date) => Date;
  fromNow: (date: Date) => string;
}

export const useTimezone = (): UseTimezoneReturn => {
  const { currentLanguage } = useLocalization();
  const timezoneInfo = useMemo(() => timezoneService.getTimezoneInfo(), []);

  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions) =>
    timezoneService.formatDate(date, currentLanguage, options), [currentLanguage]);

  const formatTime = useCallback((date: Date, options?: Intl.DateTimeFormatOptions) =>
    timezoneService.formatTime(date, currentLanguage, options), [currentLanguage]);

  const formatDateTime = useCallback((date: Date, options?: Intl.DateTimeFormatOptions) =>
    timezoneService.formatDateTime(date, currentLanguage, options), [currentLanguage]);

  const formatRelativeTime = useCallback((date: Date) =>
    timezoneService.formatRelativeTime(date, currentLanguage), [currentLanguage]);

  const fromNow = useCallback((date: Date) =>
    timezoneService.fromNow(date, currentLanguage), [currentLanguage]);

  const getCalendarDays = useCallback((year: number, month: number) =>
    timezoneService.getCalendarDays(year, month), []);

  const isToday = useCallback((date: Date) => timezoneService.isToday(date), []);
  const isSameDay = useCallback((date1: Date, date2: Date) => timezoneService.isSameDay(date1, date2), []);
  const addDays = useCallback((date: Date, days: number) => timezoneService.addDays(date, days), []);
  const startOfDay = useCallback((date: Date) => timezoneService.startOfDay(date), []);
  const endOfDay = useCallback((date: Date) => timezoneService.endOfDay(date), []);
  const formatDateToString = useCallback((date: Date) => timezoneService.formatDateToString(date), []);
  const getCurrentISOString = useCallback(() => timezoneService.getCurrentISOString(), []);
  const formatToISOString = useCallback((date: Date) => timezoneService.formatToISOString(date), []);
  const getTimezones = useCallback(() => timezoneService.getTimezones(), []);
  const isValid = useCallback((date: Date) => timezoneService.isValid(date), []);
  const getAge = useCallback((birthDate: Date) => timezoneService.getAge(birthDate), []);
  const isBetween = useCallback((date: Date, start: Date, end: Date) =>
    timezoneService.isBetween(date, start, end), []);
  const min = useCallback((dates: Date[]) => timezoneService.min(dates), []);
  const max = useCallback((dates: Date[]) => timezoneService.max(dates), []);
  const getWeek = useCallback((date: Date) => timezoneService.getWeek(date), []);
  const getQuarter = useCallback((date: Date) => timezoneService.getQuarter(date), []);
  const getTimezoneOffsetFor = useCallback((timezone: string, date?: Date) =>
    timezoneService.getTimezoneOffsetFor(timezone, date), []);
  const convertTimezone = useCallback((date: Date, fromTimezone: string, toTimezone: string) =>
    timezoneService.convertTimezone(date, fromTimezone, toTimezone), []);
  const formatDuration = useCallback((milliseconds: number) => timezoneService.formatDuration(milliseconds), []);
  const isWeekend = useCallback((date: Date) => timezoneService.isWeekend(date), []);
  const addBusinessDays = useCallback((date: Date, days: number) =>
    timezoneService.addBusinessDays(date, days), []);
  const isFirstDayOfMonth = useCallback((date: Date) => timezoneService.isFirstDayOfMonth(date), []);
  const isLastDayOfMonth = useCallback((date: Date) => timezoneService.isLastDayOfMonth(date), []);
  const getDaysInMonth = useCallback((date: Date) => timezoneService.getDaysInMonth(date), []);
  const getDateRange = useCallback((start: Date, end: Date) => timezoneService.getDateRange(start, end), []);
  const areRangesOverlapping = useCallback((start1: Date, end1: Date, start2: Date, end2: Date) =>
    timezoneService.areRangesOverlapping(start1, end1, start2, end2), []);
  const clampDate = useCallback((date: Date, min: Date, max: Date) =>
    timezoneService.clampDate(date, min, max), []);
  const areSameHour = useCallback((date1: Date, date2: Date) =>
    timezoneService.areSameHour(date1, date2), []);
  const areSameMinute = useCallback((date1: Date, date2: Date) =>
    timezoneService.areSameMinute(date1, date2), []);
  const getMiddleOfDay = useCallback((date: Date) => timezoneService.getMiddleOfDay(date), []);

  return {
    timezone: timezoneInfo.timezone || '',
    timezoneInfo,
    formatDate,
    formatTime,
    getCalendarDays,
    isToday,
    isSameDay,
    addDays,
    startOfDay,
    endOfDay,
    formatDateToString,
    getCurrentISOString,
    formatToISOString,
    formatRelativeTime,
    formatDateTime,
    getTimezones,
    isValid,
    getAge,
    isBetween,
    min,
    max,
    getWeek,
    getQuarter,
    getTimezoneOffsetFor,
    convertTimezone,
    formatDuration,
    isWeekend,
    addBusinessDays,
    isFirstDayOfMonth,
    isLastDayOfMonth,
    getDaysInMonth,
    getDateRange,
    areRangesOverlapping,
    clampDate,
    areSameHour,
    areSameMinute,
    getMiddleOfDay,
    fromNow,
  };
};
