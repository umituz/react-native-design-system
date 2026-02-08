/**
 * String Validators
 * Validation functions for string-based inputs
 */

import type { ValidationResult } from './dataValidators';

/**
 * String length validation options
 */
export interface StringLengthValidationOptions {
  min?: number;
  max?: number;
  trimWhitespace?: boolean;
}

/**
 * Validates a string length
 *
 * @param value - String value to validate
 * @param options - Validation options
 * @returns Validation result with error message if invalid
 */
export function validateStringLength(
  value: string,
  options: StringLengthValidationOptions = {}
): ValidationResult {
  const { trimWhitespace = true } = options;
  const strValue = trimWhitespace ? value.trim() : value;

  if (!strValue) {
    return { isValid: false, error: 'Value is required' };
  }

  const { min, max } = options;

  if (min !== undefined && strValue.length < min) {
    return { isValid: false, error: `Value must be at least ${min} characters` };
  }

  if (max !== undefined && strValue.length > max) {
    return { isValid: false, error: `Value must be at most ${max} characters` };
  }

  return { isValid: true };
}

/**
 * Phone number validation options
 */
export interface PhoneValidationOptions {
  countryCode?: string;
  allowLandline?: boolean;
}

/**
 * Validates a phone number
 *
 * @param phone - Phone number string to validate
 * @param options - Validation options
 * @returns Validation result with error message if invalid
 */
export function validatePhone(
  phone: string,
  _options: PhoneValidationOptions = {}
): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-numeric characters
  const cleanedPhone = phone.replace(/\D/g, '');

  // Check minimum length (at least 10 digits for most countries)
  if (cleanedPhone.length < 10) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  // Check maximum length (maximum 15 digits for international numbers)
  if (cleanedPhone.length > 15) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true };
}
