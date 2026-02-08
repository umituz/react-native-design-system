/**
 * Date Formatter Utility
 * Date and time formatting functions
 */

/**
 * Date formatting options
 */
export interface DateFormatOptions {
  format?: 'short' | 'medium' | 'long' | 'full' | 'relative';
  locale?: string;
  includeTime?: boolean;
}

/**
 * Formats a date according to the specified options
 *
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, options: DateFormatOptions = {}): string {
  const {
    format = 'medium',
    locale = 'en-US',
    includeTime = false,
  } = options;

  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Relative date formatting for recent dates
  if (format === 'relative') {
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays === -1) return 'Tomorrow';
    if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} days from now`;
    if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  }

  const dateStyle = format === 'short' ? 'short' :
                    format === 'long' ? 'long' :
                    format === 'full' ? 'full' : 'medium';

  if (includeTime) {
    return new Intl.DateTimeFormat(locale, {
      dateStyle,
      timeStyle: 'short',
    }).format(dateObj);
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
  }).format(dateObj);
}
