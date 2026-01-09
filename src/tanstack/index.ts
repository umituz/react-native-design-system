/**
 * @umituz/react-native-tanstack
 * TanStack Query configuration and utilities for React Native apps
 *
 * General-purpose package for hundreds of React Native apps
 */

// Domain - Constants
export {
  TIME_MS as QUERY_TIME_MS,
  DEFAULT_STALE_TIME,
  DEFAULT_GC_TIME,
  DEFAULT_RETRY,
  DEFAULT_REFETCH_INTERVAL,
} from './domain/constants/CacheDefaults';

// Domain - Types
export {
  CacheStrategyType,
  type CacheConfig as QueryCacheConfig,
  type QueryConfig,
  type MutationConfig,
} from './domain/types/CacheStrategy';

// Domain - Utils
export {
  createQueryKeyFactory,
  createPaginatedQueryKey,
  createInfiniteQueryKey,
  createScopedQueryKey,
  matchQueryKey,
} from './domain/utils/QueryKeyFactory';

// Domain - Type Utilities
export type {
  ExtractQueryDataType,
  ExtractQueryErrorType,
  ExtractMutationDataType,
  ExtractMutationErrorType,
  ExtractMutationVariables,
  ExtractInfiniteDataType,
  ExtractInfinitePageType,
  RequireKeys,
  OptionalKeys,
  DeepPartial,
  DeepRequired,
} from './domain/utils/TypeUtilities';

// Domain - Error Helpers
export {
  isQueryError,
  isMutationError,
  isNetworkError,
  isAbortError,
  getErrorMessage,
  getUserFriendlyMessage,
  parseErrorResponse,
  getValidationErrors,
  getErrorCode,
  logError,
  type ErrorResponse,
} from './domain/utils/ErrorHelpers';

// Domain - Repositories
export {
  BaseRepository,
  type CreateParams,
  type UpdateParams,
  type ListParams,
  type RepositoryOptions,
} from './domain/repositories/BaseRepository';

export { RepositoryFactory } from './domain/repositories/RepositoryFactory';

// Infrastructure - Config
export {
  CacheStrategies,
  createQueryClient,
  getCacheStrategy,
  type QueryClientFactoryOptions,
} from './infrastructure/config/QueryClientConfig';

export {
  createPersister,
  clearPersistedCache,
  getPersistedCacheSize,
  type PersisterFactoryOptions,
} from './infrastructure/config/PersisterConfig';

export {
  getGlobalQueryClient,
  hasGlobalQueryClient,
  setGlobalQueryClient,
  clearGlobalQueryClient,
} from './infrastructure/config/QueryClientSingleton';

// Infrastructure - Monitoring
export {
  DevMonitor,
  type QueryMetrics,
  type CacheStats as QueryCacheStats,
  type DevMonitorOptions,
} from './infrastructure/monitoring/DevMonitor';

// Infrastructure - Providers
export { TanstackProvider, type TanstackProviderProps } from './infrastructure/providers/TanstackProvider';

// Presentation - Hooks
export {
  useInvalidateQueries,
  useInvalidateMultipleQueries,
  useRemoveQueries,
  useResetQueries,
} from './presentation/hooks/useInvalidateQueries';

export {
  useCursorPagination,
  useOffsetPagination,
  type CursorPageParam,
  type OffsetPageParam,
  type CursorPaginatedResponse,
  type OffsetPaginatedResponse,
} from './presentation/hooks/usePaginatedQuery';

export {
  useOptimisticUpdate,
  useOptimisticListUpdate,
  type OptimisticUpdateConfig,
} from './presentation/hooks/useOptimisticUpdate';

export {
  usePrefetchQuery,
  usePrefetchInfiniteQuery,
  usePrefetchOnMount,
  usePrefetchMultiple,
  type PrefetchOptions,
} from './presentation/hooks/usePrefetch';

// Presentation - Utils
export {
  createConditionalRetry,
  createQuotaAwareRetry,
  type RetryFunction,
  type ErrorChecker,
} from './presentation/utils/RetryHelpers';

// Re-export TanStack Query core for convenience
export {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  useIsFetching,
  useIsMutating,
  type UseQueryResult,
  type UseMutationResult,
  type UseInfiniteQueryResult,
  type InfiniteData,
  type QueryKey,
  type QueryClient,
} from '@tanstack/react-query';
