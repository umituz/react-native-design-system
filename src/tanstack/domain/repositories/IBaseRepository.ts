/**
 * Base Repository Interface
 * Defines the contract for repository implementations
 */

import type { QueryClient } from '@tanstack/react-query';
import type { QueryKeyFactory } from '../utils/QueryKeyFactory';
import type {
  CreateParams,
  UpdateParams,
  ListParams,
  RepositoryOptions,
} from './RepositoryTypes';

export interface IBaseRepository<TData, TCreateVariables, TUpdateVariables> {
  /** Query client instance */
  getClient(): QueryClient;

  /** Resource name */
  readonly resource: string;

  /** Query key factory */
  readonly keys: QueryKeyFactory;

  /** Cache options */
  getCacheOptions(): RepositoryOptions;

  /** Abstract methods to be implemented by subclasses */
  fetchAll(params?: ListParams): Promise<TData[]>;
  fetchById(id: string | number): Promise<TData>;
  create(data: CreateParams<TCreateVariables>): Promise<TData>;
  update(id: string | number, data: UpdateParams<TUpdateVariables>): Promise<TData>;
  remove(id: string | number): Promise<void>;
}
