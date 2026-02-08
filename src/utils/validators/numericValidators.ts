/**
 * Numeric Validators
 * Validation functions for numeric inputs
 */

import type { ValidationResult } from './dataValidators';

/**
 * Password validation options
 */
export interface PasswordValidationOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

/**
 * Validates a password
 *
 * @param password - Password string to validate
 * @param options - Validation options
 * @returns Validation result with error message if invalid
 */
export function validatePassword(
  password: string,
  options: PasswordValidationOptions = {}
): ValidationResult {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;

  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (requireNumbers && !/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true };
}

/**
 * Number range validation options
 */
export interface NumberRangeValidationOptions {
  min?: number;
  max?: number;
  allowDecimals?: boolean;
}

/**
 * Validates a number is within a range
 *
 * @param value - Number value to validate
 * @param options - Validation options
 * @returns Validation result with error message if invalid
 */
export function validateNumberRange(
  value: number | string,
  options: NumberRangeValidationOptions = {}
): ValidationResult {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }

  const { min, max, allowDecimals = true } = options;

  if (!allowDecimals && !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Please enter a whole number' };
  }

  if (min !== undefined && numValue < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }

  if (max !== undefined && numValue > max) {
    return { isValid: false, error: `Value must be at most ${max}` };
  }

  return { isValid: true };
}
