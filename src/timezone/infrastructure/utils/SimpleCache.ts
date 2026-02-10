/**
 * SimpleCache
 *
 * Lightweight in-memory cache for performance optimization
 * No external dependencies - pure TypeScript implementation
 */

interface CacheEntry<T> {
  value: T;
  expires: number;
}

export class SimpleCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private defaultTTL: number;
  private cleanupTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(defaultTTL: number = 60000) {
    this.defaultTTL = defaultTTL;
    this.scheduleCleanup();
  }

  /**
   * Destroy the cache and stop cleanup timer
   */
  destroy(): void {
    if (this.cleanupTimeout) {
      clearTimeout(this.cleanupTimeout);
      this.cleanupTimeout = null;
    }
    this.cache.clear();
  }

  set(key: string, value: T, ttl?: number): void {
    const expires = Date.now() + (ttl ?? this.defaultTTL);
    this.cache.set(key, { value, expires });
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires) {
        this.cache.delete(key);
      }
    }
  }

  private scheduleCleanup(): void {
    if (this.cleanupTimeout) {
      clearTimeout(this.cleanupTimeout);
    }

    this.cleanup();

    this.cleanupTimeout = setTimeout(() => {
      this.scheduleCleanup();
    }, 60000);
  }
}
