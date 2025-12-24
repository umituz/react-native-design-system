/**
 * Clipboard Utilities
 * 
 * Simple wrapper around expo-clipboard for copy/paste functionality
 * 
 * Usage:
 * ```typescript
 * import { ClipboardUtils } from '@umituz/react-native-design-system';
 * 
 * // Copy text
 * await ClipboardUtils.copyToClipboard('Hello World');
 * 
 * // Paste text
 * const text = await ClipboardUtils.getFromClipboard();
 * 
 * // Check if clipboard has content
 * const hasContent = await ClipboardUtils.hasContent();
 * ```
 */

import * as Clipboard from 'expo-clipboard';

export class ClipboardUtils {
    /**
     * Copy text to clipboard
     */
    static async copyToClipboard(text: string): Promise<void> {
        try {
            await Clipboard.setStringAsync(text);
        } catch (error) {
            console.error('[ClipboardUtils] Failed to copy to clipboard:', error);
            throw error;
        }
    }

    /**
     * Get text from clipboard
     */
    static async getFromClipboard(): Promise<string> {
        try {
            return await Clipboard.getStringAsync();
        } catch (error) {
            console.error('[ClipboardUtils] Failed to get from clipboard:', error);
            throw error;
        }
    }

    /**
     * Check if clipboard has content
     */
    static async hasContent(): Promise<boolean> {
        try {
            return await Clipboard.hasStringAsync();
        } catch (error) {
            console.error('[ClipboardUtils] Failed to check clipboard:', error);
            return false;
        }
    }

    /**
     * Clear clipboard
     */
    static async clear(): Promise<void> {
        try {
            await Clipboard.setStringAsync('');
        } catch (error) {
            console.error('[ClipboardUtils] Failed to clear clipboard:', error);
            throw error;
        }
    }
}
