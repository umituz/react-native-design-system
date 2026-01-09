/**
 * DevMonitor
 * Infrastructure layer - Query performance monitoring (DEV only)
 *
 * Tracks query performance, cache hit rates, and slow queries.
 * Only active in development mode (__DEV__).
 */

import type { Query, QueryClient } from '@tanstack/react-query';

export interface QueryMetrics {
  queryKey: readonly unknown[];
  fetchCount: number;
  totalFetchTime: number;
  averageFetchTime: number;
  slowFetchCount: number;
  lastFetchTime: number | null;
}

export interface CacheStats {
  totalQueries: number;
  activeQueries: number;
  cachedQueries: number;
  staleQueries: number;
  inactiveQueries: number;
}

export interface DevMonitorOptions {
  /**
   * Threshold for slow query detection (in ms)
   * @default 1000
   */
  slowQueryThreshold?: number;

  /**
   * Enable console logging
   * @default true
   */
  enableLogging?: boolean;

  /**
   * Log interval for stats (in ms)
   * @default 30000 (30 seconds)
   */
  statsLogInterval?: number;
}

class DevMonitorClass {
  private metrics: Map<string, QueryMetrics> = new Map();
  private queryClient: QueryClient | null = null;
  private options: Required<DevMonitorOptions>;
  private statsInterval: ReturnType<typeof setInterval> | null = null;
  private isEnabled: boolean;

  constructor(options: DevMonitorOptions = {}) {
    this.isEnabled = __DEV__ ?? false;
    this.options = {
      slowQueryThreshold: options.slowQueryThreshold ?? 1000,
      enableLogging: options.enableLogging ?? true,
      statsLogInterval: options.statsLogInterval ?? 30000,
    };

    if (this.isEnabled) {
      this.init();
    }
  }

  private init(): void {
    if (!this.isEnabled) return;

    if (this.options.enableLogging) {
      
      console.log('[TanStack DevMonitor] Monitoring initialized');
    }

    this.startStatsLogging();
  }

  private getQueryKeyString(queryKey: readonly unknown[]): string {
    return JSON.stringify(queryKey);
  }

  private trackQuery(query: Query): void {
    if (!this.isEnabled) return;

    const queryKeyString = this.getQueryKeyString(query.queryKey);

    if (!this.metrics.has(queryKeyString)) {
      this.metrics.set(queryKeyString, {
        queryKey: query.queryKey,
        fetchCount: 0,
        totalFetchTime: 0,
        averageFetchTime: 0,
        slowFetchCount: 0,
        lastFetchTime: null,
      });
    }

    const metrics = this.metrics.get(queryKeyString)!;
    const fetchTime = Date.now() - (query.state.dataUpdatedAt ?? Date.now());

    metrics.fetchCount++;
    metrics.totalFetchTime += fetchTime;
    metrics.averageFetchTime = metrics.totalFetchTime / metrics.fetchCount;
    metrics.lastFetchTime = fetchTime;

    if (fetchTime > this.options.slowQueryThreshold) {
      metrics.slowFetchCount++;

      if (this.options.enableLogging) {
        
        console.warn(
          `[TanStack DevMonitor] Slow query detected: ${queryKeyString} (${fetchTime}ms)`,
        );
      }
    }
  }

  /**
   * Attach monitor to query client
   */
  attach(queryClient: QueryClient): void {
    if (!this.isEnabled) return;

    this.queryClient = queryClient;

    queryClient.getQueryCache().subscribe((query) => {
      this.trackQuery(query as unknown as Query);
    });

    if (this.options.enableLogging) {
      
      console.log('[TanStack DevMonitor] Attached to QueryClient');
    }
  }

  /**
   * Get all query metrics
   */
  getMetrics(): QueryMetrics[] {
    if (!this.isEnabled) return [];
    return Array.from(this.metrics.values());
  }

  /**
   * Get metrics for specific query
   */
  getQueryMetrics(queryKey: readonly unknown[]): QueryMetrics | undefined {
    if (!this.isEnabled) return undefined;
    const queryKeyString = this.getQueryKeyString(queryKey);
    return this.metrics.get(queryKeyString);
  }

  /**
   * Get slow queries
   */
  getSlowQueries(): QueryMetrics[] {
    if (!this.isEnabled) return [];
    return Array.from(this.metrics.values()).filter((m) => m.slowFetchCount > 0);
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): CacheStats | null {
    if (!this.isEnabled || !this.queryClient) return null;

    const cache = this.queryClient.getQueryCache();
    const queries = cache.getAll();

    return {
      totalQueries: queries.length,
      activeQueries: queries.filter((q) => q.observers.length > 0).length,
      cachedQueries: queries.filter((q) => q.state.data !== undefined).length,
      staleQueries: queries.filter((q) => q.isStale()).length,
      inactiveQueries: queries.filter((q) => q.observers.length === 0).length,
    };
  }

  /**
   * Log performance report
   */
  logReport(): void {
    if (!this.isEnabled || !this.options.enableLogging) return;

    const stats = this.getCacheStats();
    const slowQueries = this.getSlowQueries();

    
    console.group('[TanStack DevMonitor] Performance Report');

    if (stats) {
      
      console.table({
        'Total Queries': stats.totalQueries,
        'Active Queries': stats.activeQueries,
        'Cached Queries': stats.cachedQueries,
        'Stale Queries': stats.staleQueries,
        'Inactive Queries': stats.inactiveQueries,
      });
    }

    if (slowQueries.length > 0) {
      
      console.warn(`Found ${slowQueries.length} slow queries:`);
      
      console.table(
        slowQueries.map((m) => ({
          queryKey: JSON.stringify(m.queryKey),
          fetchCount: m.fetchCount,
          avgTime: `${m.averageFetchTime.toFixed(2)}ms`,
          slowCount: m.slowFetchCount,
        })),
      );
    }

    
    console.groupEnd();
  }

  /**
   * Start periodic stats logging
   */
  private startStatsLogging(): void {
    if (!this.isEnabled || this.statsInterval !== null) return;

    this.statsInterval = setInterval(() => {
      this.logReport();
    }, this.options.statsLogInterval);
  }

  /**
   * Stop periodic stats logging
   */
  stopStatsLogging(): void {
    if (this.statsInterval !== null) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    if (!this.isEnabled) return;
    this.metrics.clear();

    if (this.options.enableLogging) {
      
      console.log('[TanStack DevMonitor] Metrics cleared');
    }
  }

  /**
   * Reset monitor
   */
  reset(): void {
    if (!this.isEnabled) return;
    this.stopStatsLogging();
    this.clear();
    this.queryClient = null;

    if (this.options.enableLogging) {
      
      console.log('[TanStack DevMonitor] Reset');
    }
  }
}

/**
 * Global dev monitor instance
 */
export const DevMonitor = new DevMonitorClass();
