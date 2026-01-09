/**
 * Exception Logger Service
 *
 * Handles local logging and persistence of exceptions.
 *
 * SOLID: Single Responsibility - Only exception logging/persistence
 * DRY: Centralized logging logic
 * KISS: Simple logging interface
 */

import type { ExceptionEntity } from '../../domain/entities/ExceptionEntity';
import { ExceptionHandler } from './ExceptionHandler';
import { storageRepository } from '@storage';

export class ExceptionLogger {
  private static readonly STORAGE_KEY = '@exceptions';
  private maxStoredExceptions = 100;

  /**
   * Log exception locally
   */
  async logException(exception: ExceptionEntity): Promise<void> {
    try {
      const sanitizedException = ExceptionHandler.sanitizeException(exception);
      const existingExceptions = await this.getStoredExceptions();

      // Add new exception
      existingExceptions.unshift(sanitizedException);

      // Limit storage size
      if (existingExceptions.length > this.maxStoredExceptions) {
        existingExceptions.splice(this.maxStoredExceptions);
      }

      await storageRepository.setString(ExceptionLogger.STORAGE_KEY, JSON.stringify(existingExceptions));
    } catch (error) {
      // Fallback to console if storage fails
      console.error('Failed to log exception:', error);
    }
  }

  /**
   * Get stored exceptions
   */
  async getStoredExceptions(): Promise<ExceptionEntity[]> {
    try {
      const result = await storageRepository.getString(ExceptionLogger.STORAGE_KEY, '[]');
      if (result.success) {
        return JSON.parse(result.data);
      }
      return [];
    } catch (error) {
      console.warn('Failed to get stored exceptions:', error);
      return [];
    }
  }

  /**
   * Clear all stored exceptions
   */
  async clearStoredExceptions(): Promise<void> {
    try {
      await storageRepository.setString(ExceptionLogger.STORAGE_KEY, '[]');
    } catch (error) {
      console.warn('Failed to clear stored exceptions:', error);
    }
  }

  /**
   * Get exceptions by category
   */
  async getExceptionsByCategory(category: ExceptionEntity['category']): Promise<ExceptionEntity[]> {
    const exceptions = await this.getStoredExceptions();
    return exceptions.filter(ex => ex.category === category);
  }

  /**
   * Get exceptions by severity
   */
  async getExceptionsBySeverity(severity: ExceptionEntity['severity']): Promise<ExceptionEntity[]> {
    const exceptions = await this.getStoredExceptions();
    return exceptions.filter(ex => ex.severity === severity);
  }

  /**
   * Get recent exceptions (last N days)
   */
  async getRecentExceptions(days: number = 7): Promise<ExceptionEntity[]> {
    const exceptions = await this.getStoredExceptions();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return exceptions.filter(ex => new Date(ex.timestamp) >= cutoffDate);
  }

  /**
   * Get exception statistics
   */
  async getExceptionStats(): Promise<{
    total: number;
    bySeverity: Record<ExceptionEntity['severity'], number>;
    byCategory: Record<ExceptionEntity['category'], number>;
  }> {
    const exceptions = await this.getStoredExceptions();

    const bySeverity: Record<ExceptionEntity['severity'], number> = {
      fatal: 0,
      error: 0,
      warning: 0,
      info: 0,
    };

    const byCategory: Record<ExceptionEntity['category'], number> = {
      network: 0,
      validation: 0,
      authentication: 0,
      authorization: 0,
      'business-logic': 0,
      system: 0,
      storage: 0,
      unknown: 0,
    };

    exceptions.forEach(ex => {
      bySeverity[ex.severity]++;
      byCategory[ex.category]++;
    });

    return {
      total: exceptions.length,
      bySeverity,
      byCategory,
    };
  }

  /**
   * Update max stored exceptions limit
   */
  setMaxStoredExceptions(limit: number): void {
    this.maxStoredExceptions = Math.max(1, limit);
  }
}
