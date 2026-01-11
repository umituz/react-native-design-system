/**
 * DateFormatter
 * Handles locale-aware formatting of dates and times
 */
export class DateFormatter {
    formatDate(
        date: Date | string | number,
        locale: string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options,
        };
        return new Intl.DateTimeFormat(locale, defaultOptions).format(this.parse(date));
    }

    formatTime(
        date: Date | string | number,
        locale: string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            ...options,
        };
        return new Intl.DateTimeFormat(locale, defaultOptions).format(this.parse(date));
    }

    formatDateTime(
        date: Date | string | number,
        locale: string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...options,
        };
        return new Intl.DateTimeFormat(locale, defaultOptions).format(this.parse(date));
    }

    formatDateToString(date: Date | string | number): string {
        const d = this.parse(date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    formatToISOString(date: Date | string | number): string {
        return this.parse(date).toISOString();
    }

    formatToDisplayDate(date: Date | string | number): string {
        const d = this.parse(date);
        const day = String(d.getDate()).padStart(2, '0');
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const y = d.getFullYear();
        return `${day}.${m}.${y}`;
    }

    formatToDisplayDateTime(date: Date | string | number): string {
        const d = this.parse(date);
        const day = String(d.getDate()).padStart(2, '0');
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const y = d.getFullYear();
        const th = String(d.getHours()).padStart(2, '0');
        const tm = String(d.getMinutes()).padStart(2, '0');
        return `${day}.${m}.${y} ${th}:${tm}`;
    }

    formatRelativeTime(date: Date | string | number, locale: string): string {
        const d = this.parse(date);
        const now = new Date();
        const diffInMs = d.getTime() - now.getTime();
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

        // Use Intl.RelativeTimeFormat for generic localizable relative time
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

        if (Math.abs(diffInDays) < 7) {
            return rtf.format(diffInDays, 'day');
        }

        // For longer periods, fall back to simple date
        return this.formatDate(d, locale, {
            month: 'short',
            day: 'numeric',
            year: Math.abs(diffInDays) > 365 ? 'numeric' : undefined,
        });
    }

    parse(date: Date | string | number): Date {
        if (date instanceof Date) return new Date(date.getTime());
        return new Date(date);
    }

    formatDuration(milliseconds: number): string {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const parts: string[] = [];

        if (days > 0) {
            parts.push(`${days}d`);
        }

        const remainingHours = hours % 24;
        if (remainingHours > 0) {
            parts.push(`${remainingHours}h`);
        }

        const remainingMinutes = minutes % 60;
        if (remainingMinutes > 0) {
            parts.push(`${remainingMinutes}m`);
        }

        const remainingSeconds = seconds % 60;
        if (remainingSeconds > 0 || parts.length === 0) {
            parts.push(`${remainingSeconds}s`);
        }

        return parts.join(' ');
    }
}
