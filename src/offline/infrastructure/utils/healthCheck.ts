/**
 * Connection Health Check
 * Periodically checks real internet connectivity by pinging a reliable endpoint
 */

import type { OfflineConfig } from '../../types';

const DEFAULT_HEALTH_CHECK_URL = 'https://www.google.com/favicon.ico';
const DEFAULT_TIMEOUT = 5000;

export class HealthCheck {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private isChecking = false;
  private config: Required<OfflineConfig>;

  constructor(config: OfflineConfig = {}) {
    this.config = {
      persist: config.persist ?? false,
      debug: config.debug ?? false,
      healthCheckInterval: config.healthCheckInterval ?? 0,
      healthCheckTimeout: config.healthCheckTimeout ?? DEFAULT_TIMEOUT,
      healthCheckUrl: config.healthCheckUrl ?? DEFAULT_HEALTH_CHECK_URL,
    };
  }

  /**
   * Perform a single health check
   */
  async check(): Promise<boolean> {
    if (this.isChecking) {
      return false;
    }

    this.isChecking = true;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.healthCheckTimeout);

      const response = await fetch(this.config.healthCheckUrl, {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache',
      });

      clearTimeout(timeoutId);

      const isHealthy = response.ok;

      if (this.config.debug) {
        // eslint-disable-next-line no-console
        console.log('[HealthCheck] Result:', isHealthy ? 'HEALTHY' : 'UNHEALTHY');
      }

      return isHealthy;
    } catch (error) {
      if (this.config.debug) {
        // eslint-disable-next-line no-console
        console.warn('[HealthCheck] Failed:', error);
      }

      return false;
    } finally {
      this.isChecking = false;
    }
  }

  /**
   * Start periodic health checks
   */
  start(callback: (isHealthy: boolean) => void): void {
    if (this.config.healthCheckInterval === 0) {
      if (this.config.debug) {
        // eslint-disable-next-line no-console
        console.log('[HealthCheck] Disabled (interval = 0)');
      }
      return;
    }

    if (this.intervalId) {
      this.stop();
    }

    if (this.config.debug) {
      // eslint-disable-next-line no-console
      console.log('[HealthCheck] Starting (interval:', this.config.healthCheckInterval + 'ms)');
    }

    this.intervalId = setInterval(async () => {
      const isHealthy = await this.check();
      callback(isHealthy);
    }, this.config.healthCheckInterval);
  }

  /**
   * Stop health checks
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;

      if (this.config.debug) {
        // eslint-disable-next-line no-console
        console.log('[HealthCheck] Stopped');
      }
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stop();
  }
}
