/**
 * Base Repository
 * Domain layer - Abstract repository for data operations
 *
 * Provides generic CRUD operations with TanStack Query integration.
 * Subclass this for specific entities to get type-safe data operations.
 *
 * @example
 * ```typescript
 * class UserRepository extends BaseRepository<User, CreateUserVars, UpdateUserVars> {
 *   constructor() {
 *     super('users');
 *   }
 *
 *   async fetchAll(): Promise<User[]> {
 *     return api.get('/users');
 *   }
 *
 *   async fetchById(id: string): Promise<User> {
 *     return api.get(`/users/${id}`);
 *   }
 *
 *   async create(data: CreateUserVars): Promise<User> {
 *     return api.post('/users', data);
 *   }
 *
 *   async update(id: string, data: UpdateUserVars): Promise<User> {
 *     return api.put(`/users/${id}`, data);
 *   }
 *
 *   async remove(id: string): Promise<void> {
 *     return api.delete(`/users/${id}`);
 *   }
 * }
 * ```
 */

import type { QueryClient, QueryKey } from '@tanstack/react-query';
import { getGlobalQueryClient } from '../../infrastructure/config/QueryClientSingleton';
import { CacheStrategies } from '../../infrastructure/config/QueryClientConfig';
import { createQueryKeyFactory } from '../utils/QueryKeyFactory';
import type {
  CreateParams,
  UpdateParams,
  ListParams,
  RepositoryOptions,
} from './RepositoryTypes';

/**
 * Base repository for CRUD operations
 *
 * @template TData - Entity type
 * @template TCreateVariables - Variables for create mutation
 * @template TUpdateVariables - Variables for update mutation
 */
export abstract class BaseRepository<
  TData,
  TCreateVariables = unknown,
  TUpdateVariables = Partial<TData>,
> {
  protected readonly resource: string;
  protected readonly options: RepositoryOptions;

  /**
   * Query key factory for this repository
   */
  public readonly keys: ReturnType<typeof createQueryKeyFactory>;

  constructor(resource: string, options: RepositoryOptions = {}) {
    this.resource = resource;
    this.options = {
      cacheStrategy: options.cacheStrategy ?? CacheStrategies.PUBLIC_DATA,
      ...options,
    };

    this.keys = createQueryKeyFactory(this.resource);
  }

  /**
   * Get query client instance
   */
  protected getClient(): QueryClient {
    return getGlobalQueryClient();
  }

  /**
   * Get cache options for queries
   */
  protected getCacheOptions(): { staleTime: number; gcTime: number } {
    return {
      staleTime: this.options.staleTime ?? (this.options.cacheStrategy?.staleTime ?? CacheStrategies.PUBLIC_DATA.staleTime),
      gcTime: this.options.gcTime ?? (this.options.cacheStrategy?.gcTime ?? CacheStrategies.PUBLIC_DATA.gcTime),
    };
  }

  /**
   * Fetch all items - to be implemented by subclass
   */
  abstract fetchAll(params?: ListParams): Promise<TData[]>;

  /**
   * Fetch item by ID - to be implemented by subclass
   */
  abstract fetchById(id: string | number): Promise<TData>;

  /**
   * Create item - to be implemented by subclass
   */
  abstract create(params: CreateParams<TCreateVariables>): Promise<TData>;

  /**
   * Update item - to be implemented by subclass
   */
  abstract update(params: UpdateParams<TUpdateVariables>): Promise<TData>;

  /**
   * Delete item - to be implemented by subclass
   */
  abstract remove(id: string | number): Promise<void>;

  /**
   * Query all items with caching
   */
  async queryAll(params?: ListParams): Promise<TData[]> {
    const client = this.getClient();
    const queryKey = params ? this.keys.list(params as Record<string, unknown>) : this.keys.lists();
    const cacheOptions = this.getCacheOptions();

    return client.fetchQuery({
      queryKey: queryKey as QueryKey,
      queryFn: () => this.fetchAll(params),
      ...cacheOptions,
    });
  }

  /**
   * Query item by ID with caching
   */
  async queryById(id: string | number): Promise<TData | undefined> {
    const client = this.getClient();
    const queryKey = this.keys.detail(id);
    const cacheOptions = this.getCacheOptions();

    try {
      return client.fetchQuery({
        queryKey: queryKey as QueryKey,
        queryFn: () => this.fetchById(id),
        ...cacheOptions,
      });
    } catch {
      return undefined;
    }
  }

  /**
   * Prefetch all items
   */
  async prefetchAll(params?: ListParams): Promise<void> {
    const client = this.getClient();
    const queryKey = params ? this.keys.list(params as Record<string, unknown>) : this.keys.lists();
    const cacheOptions = this.getCacheOptions();

    await client.prefetchQuery({
      queryKey: queryKey as QueryKey,
      queryFn: () => this.fetchAll(params),
      ...cacheOptions,
    });
  }

  /**
   * Prefetch item by ID
   */
  async prefetchById(id: string | number): Promise<void> {
    const client = this.getClient();
    const queryKey = this.keys.detail(id);
    const cacheOptions = this.getCacheOptions();

    await client.prefetchQuery({
      queryKey: queryKey as QueryKey,
      queryFn: () => this.fetchById(id),
      ...cacheOptions,
    });
  }

  /**
   * Invalidate all queries for this resource
   */
  invalidateAll(): Promise<void> {
    const client = this.getClient();
    return client.invalidateQueries({
      predicate: (query: { queryKey: readonly unknown[] }) => {
        const key = query.queryKey[0] as string;
        return key === this.resource;
      },
    });
  }

  /**
   * Invalidate list queries
   */
  invalidateLists(): Promise<void> {
    const client = this.getClient();
    return client.invalidateQueries({
      queryKey: this.keys.lists(),
    });
  }

  /**
   * Invalidate detail query
   */
  invalidateDetail(id: string | number): Promise<void> {
    const client = this.getClient();
    return client.invalidateQueries({
      queryKey: this.keys.detail(id),
    });
  }

  /**
   * Set query data (optimistic update)
   */
  setData(id: string | number, data: TData): void {
    const client = this.getClient();
    client.setQueryData(this.keys.detail(id), data);
  }

  /**
   * Get query data from cache
   */
  getData(id: string | number): TData | undefined {
    const client = this.getClient();
    return client.getQueryData<TData>(this.keys.detail(id));
  }

  /**
   * Remove query data from cache
   */
  clearData(id: string | number): void {
    const client = this.getClient();
    client.setQueryData(this.keys.detail(id), undefined);
  }
}
