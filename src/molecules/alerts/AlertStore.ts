/**
 * Alert Store
 */

import { create } from 'zustand';
import { Alert } from './AlertTypes';

interface AlertState {
    alerts: Alert[];
    addAlert: (alert: Alert) => void;
    dismissAlert: (id: string) => void;
    clearAlerts: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    alerts: [],
    addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
    dismissAlert: (id) => set((state) => ({
        alerts: state.alerts.filter((a) => a.id !== id)
    })),
    clearAlerts: () => set({ alerts: [] }),
}));
