/**
 * Alert Service
 */

import { generateUUID } from '../../uuid';
import { Alert, AlertType, AlertMode, AlertOptions, AlertPosition } from './AlertTypes';
import { useAlertStore } from './AlertStore';

export class AlertService {
    /**
     * Creates a base Alert object with defaults
     */
    static createAlert(
        type: AlertType,
        defaultMode: AlertMode,
        title: string,
        message?: string,
        options?: AlertOptions
    ): Alert {
        const id = generateUUID();
        const mode = options?.mode || defaultMode;

        // Default position based on mode
        const defaultPosition = mode === AlertMode.BANNER ? AlertPosition.TOP : AlertPosition.TOP;

        return {
            id,
            type,
            mode,
            title,
            message,
            position: options?.position || defaultPosition,
            icon: options?.icon,
            actions: options?.actions?.map(action => ({
                id: generateUUID(),
                ...action,
            })) || [],
            dismissible: options?.dismissible ?? true,
            duration: options?.duration,
            onDismiss: options?.onDismiss,
            testID: options?.testID,
            createdAt: Date.now(),
        };
    }

    static createSuccessAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.SUCCESS, AlertMode.TOAST, title, message, options);
    }

    static createErrorAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.ERROR, AlertMode.TOAST, title, message, options);
    }

    static createWarningAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.WARNING, AlertMode.TOAST, title, message, options);
    }

    static createInfoAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.INFO, AlertMode.TOAST, title, message, options);
    }

    /**
     * Convenience methods to show alerts directly from outside React components
     * These access the Zustand store directly without requiring hooks
     */
    static success(title: string, message?: string, options?: AlertOptions): string {
        const alert = this.createSuccessAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    }

    static error(title: string, message?: string, options?: AlertOptions): string {
        const alert = this.createErrorAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    }

    static warning(title: string, message?: string, options?: AlertOptions): string {
        const alert = this.createWarningAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    }

    static info(title: string, message?: string, options?: AlertOptions): string {
        const alert = this.createInfoAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    }

    static show(type: AlertType, mode: AlertMode, title: string, message?: string, options?: AlertOptions): string {
        const alert = this.createAlert(type, mode, title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    }

    static dismiss(id: string): void {
        useAlertStore.getState().dismissAlert(id);
    }

    static clear(): void {
        useAlertStore.getState().clearAlerts();
    }
}
