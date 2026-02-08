/**
 * Number Formatter Utility
 * Number, currency, and percentage formatting functions
 */

/**
 * Number formatting options
 */
export interface NumberFormatOptions {
  decimals?: number;
  locale?: string;
  compact?: boolean;
}

/**
 * Formats a number according to the specified options
 *
 * @param num - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export function formatNumber(num: number, options: NumberFormatOptions = {}): string {
  const {
    decimals = 0,
    locale = 'en-US',
    compact = false,
  } = options;

  if (isNaN(num)) {
    return '0';
  }

  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  };

  if (compact) {
    formatOptions.notation = 'compact';
    formatOptions.compactDisplay = 'short';
  }

  return new Intl.NumberFormat(locale, formatOptions).format(num);
}

/**
 * Currency formatting options
 */
export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  decimals?: number;
  symbol?: string;
}

/**
 * Formats a currency amount
 *
 * @param amount - Amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    decimals = 2,
    symbol,
  } = options;

  if (isNaN(amount)) {
    return `${symbol || currency} 0.00`;
  }

  if (symbol) {
    return `${symbol}${formatNumber(amount, { decimals, locale })}`;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Percentage formatting options
 */
export interface PercentFormatOptions {
  decimals?: number;
  locale?: string;
  includeSymbol?: boolean;
}

/**
 * Formats a number as a percentage
 *
 * @param value - Value to format (0-1 or 0-100)
 * @param options - Formatting options
 * @param isDecimal - Whether the value is already in decimal form (0-1)
 * @returns Formatted percentage string
 */
export function formatPercent(
  value: number,
  options: PercentFormatOptions = {},
  isDecimal: boolean = true
): string {
  const {
    decimals = 1,
    locale = 'en-US',
    includeSymbol = true,
  } = options;

  if (isNaN(value)) {
    return '0%';
  }

  const displayValue = isDecimal ? value * 100 : value;

  if (includeSymbol) {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(isDecimal ? value : value / 100);
  }

  return `${formatNumber(displayValue, { decimals, locale })}%`;
}
