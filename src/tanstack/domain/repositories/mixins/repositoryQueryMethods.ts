/**
 * Repository Query Methods
 * Query methods for repository operations
 */

import type { QueryClient, QueryKey } from '@tanstack/react-query';
import type { ListParams } from '../RepositoryTypes';
import type { BaseRepository } from '../BaseRepository';

/**
 * Query all items with caching
 *
 * @param repository - Repository instance
 * @param params - Optional list parameters
 * @returns Promise of data array
 */
export async function queryAll<TData>(
  repository: BaseRepository<TData, unknown, unknown>,
  params?: ListParams
): Promise<TData[]> {
  const client = (repository as any).getClient() as QueryClient;
  const queryKey = params
    ? repository.keys.list(params as Record<string, unknown>)
    : repository.keys.lists();
  const cacheOptions = (repository as any).getCacheOptions();

  return client.fetchQuery({
    queryKey: queryKey as QueryKey,
    queryFn: () => repository.fetchAll(params),
    ...cacheOptions,
  });
}

/**
 * Query item by ID with caching
 *
 * @param repository - Repository instance
 * @param id - Item ID
 * @returns Promise of data or undefined if not found
 */
export async function queryById<TData>(
  repository: BaseRepository<TData, unknown, unknown>,
  id: string | number
): Promise<TData | undefined> {
  const client = (repository as any).getClient() as QueryClient;
  const queryKey = repository.keys.detail(id);
  const cacheOptions = (repository as any).getCacheOptions();

  try {
    return client.fetchQuery({
      queryKey: queryKey as QueryKey,
      queryFn: () => repository.fetchById(id),
      ...cacheOptions,
    });
  } catch {
    return undefined;
  }
}

/**
 * Prefetch all items
 *
 * @param repository - Repository instance
 * @param params - Optional list parameters
 */
export async function prefetchAll<TData>(
  repository: BaseRepository<TData, unknown, unknown>,
  params?: ListParams
): Promise<void> {
  const client = (repository as any).getClient() as QueryClient;
  const queryKey = params
    ? repository.keys.list(params as Record<string, unknown>)
    : repository.keys.lists();
  const cacheOptions = (repository as any).getCacheOptions();

  await client.prefetchQuery({
    queryKey: queryKey as QueryKey,
    queryFn: () => repository.fetchAll(params),
    ...cacheOptions,
  });
}

/**
 * Prefetch item by ID
 *
 * @param repository - Repository instance
 * @param id - Item ID
 */
export async function prefetchById<TData>(
  repository: BaseRepository<TData, unknown, unknown>,
  id: string | number
): Promise<void> {
  const client = (repository as any).getClient() as QueryClient;
  const queryKey = repository.keys.detail(id);
  const cacheOptions = (repository as any).getCacheOptions();

  await client.prefetchQuery({
    queryKey: queryKey as QueryKey,
    queryFn: () => repository.fetchById(id),
    ...cacheOptions,
  });
}
