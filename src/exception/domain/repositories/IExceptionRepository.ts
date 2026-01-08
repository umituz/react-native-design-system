/**
 * Exception Repository Interface
 * Defines the contract for exception data persistence
 */

import type { ExceptionEntity, ErrorLog } from '../entities/ExceptionEntity';

export interface ExceptionRepositoryError {
    code: string;
    message: string;
}

export type ExceptionResult<T> =
    | { success: true; data: T }
    | { success: false; error: ExceptionRepositoryError };

export interface IExceptionRepository {
    /**
     * Save an exception to storage
     */
    save(exception: ExceptionEntity): Promise<ExceptionResult<void>>;

    /**
     * Get all stored exceptions
     */
    getAll(): Promise<ExceptionResult<ExceptionEntity[]>>;

    /**
     * Clear all stored exceptions
     */
    clear(): Promise<ExceptionResult<void>>;

    /**
     * Log an error
     */
    log(errorLog: ErrorLog): Promise<ExceptionResult<void>>;
}
