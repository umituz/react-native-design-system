/**
 * Data Validators
 * Common validation functions for data types
 */

/**
 * Email validation result
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address
 *
 * @param email - Email string to validate
 * @returns Validation result with error message if invalid
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * URL validation regex pattern
 */
const URL_REGEX = /^https?:\/\/.+/;

/**
 * Validates a URL
 *
 * @param url - URL string to validate
 * @returns Validation result with error message if invalid
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  if (!URL_REGEX.test(url)) {
    return { isValid: false, error: 'Please enter a valid URL (must start with http:// or https://)' };
  }

  return { isValid: true };
}

/**
 * Validates a required field
 *
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns Validation result with error message if invalid
 */
export function validateRequired(value: any, fieldName: string = 'Field'): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (typeof value === 'string' && value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validates multiple fields and returns all errors
 *
 * @param validations - Object containing field names and their validation results
 * @returns Object with field names as keys and error messages as values
 */
export function validateMultiple(
  validations: Record<string, ValidationResult>
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(validations).forEach(([field, result]) => {
    if (!result.isValid && result.error) {
      errors[field] = result.error;
    }
  });

  return errors;
}

/**
 * Checks if there are any validation errors
 *
 * @param errors - Validation errors object
 * @returns True if there are errors
 */
export function hasValidationErrors(errors: Record<string, string>): boolean {
  return Object.keys(errors).length > 0;
}
