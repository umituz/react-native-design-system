/**
 * Permission Manager
 *
 * Centralized permission handling for media operations.
 */

import * as ImagePicker from "expo-image-picker";
import { MediaLibraryPermission } from "../../domain/entities/Media";
import { mapPermissionStatus } from "./mediaPickerMappers";

/**
 * Permission type for media operations
 */
export type PermissionType = 'camera' | 'mediaLibrary';

/**
 * Permission manager for media operations
 */
export class PermissionManager {
    /**
     * Requests camera permission
     */
    static async requestCameraPermission(): Promise<MediaLibraryPermission> {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            return mapPermissionStatus(status);
        } catch {
            return MediaLibraryPermission.DENIED;
        }
    }

    /**
     * Requests media library permission
     */
    static async requestMediaLibraryPermission(): Promise<MediaLibraryPermission> {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            return mapPermissionStatus(status);
        } catch {
            return MediaLibraryPermission.DENIED;
        }
    }

    /**
     * Gets current camera permission status
     */
    static async getCameraPermissionStatus(): Promise<MediaLibraryPermission> {
        try {
            const { status } = await ImagePicker.getCameraPermissionsAsync();
            return mapPermissionStatus(status);
        } catch {
            return MediaLibraryPermission.DENIED;
        }
    }

    /**
     * Gets current media library permission status
     */
    static async getMediaLibraryPermissionStatus(): Promise<MediaLibraryPermission> {
        try {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            return mapPermissionStatus(status);
        } catch {
            return MediaLibraryPermission.DENIED;
        }
    }

    /**
     * Generic permission request based on type
     */
    static async requestPermission(type: PermissionType): Promise<MediaLibraryPermission> {
        return type === 'camera'
            ? this.requestCameraPermission()
            : this.requestMediaLibraryPermission();
    }

    /**
     * Generic permission status check based on type
     */
    static async getPermissionStatus(type: PermissionType): Promise<MediaLibraryPermission> {
        return type === 'camera'
            ? this.getCameraPermissionStatus()
            : this.getMediaLibraryPermissionStatus();
    }

    /**
     * Checks if permission is granted
     */
    static isPermissionGranted(status: MediaLibraryPermission): boolean {
        return status === MediaLibraryPermission.GRANTED || status === MediaLibraryPermission.LIMITED;
    }
}
