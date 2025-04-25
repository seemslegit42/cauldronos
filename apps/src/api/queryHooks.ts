import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey
} from '@tanstack/react-query';
import apiClient, { ApiError, ApiRequestOptions } from './apiClient';

/**
 * Custom hook for making GET requests with React Query
 * @param queryKey The query key for caching
 * @param endpoint The API endpoint
 * @param options The request options
 * @param queryOptions The React Query options
 * @returns The React Query result
 */
export function useApiQuery<TData>(
  queryKey: QueryKey,
  endpoint: string,
  options?: ApiRequestOptions,
  queryOptions?: Omit<UseQueryOptions<TData, ApiError, TData, QueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, ApiError>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<TData>(endpoint, options);
      return response.data;
    },
    ...queryOptions,
  });
}

/**
 * Custom hook for making POST requests with React Query
 * @param queryKey The query key for invalidation
 * @param endpoint The API endpoint
 * @param mutationOptions The React Query mutation options
 * @returns The React Query mutation result
 */
export function useApiMutation<TData, TVariables>(
  queryKey: QueryKey,
  endpoint: string,
  mutationOptions?: Omit<UseMutationOptions<TData, ApiError, TVariables, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const response = await apiClient.post<TData>(endpoint, variables);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate the query key to refetch the data
      queryClient.invalidateQueries({ queryKey });
      
      // Call the onSuccess callback if provided
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}

/**
 * Custom hook for making PUT requests with React Query
 * @param queryKey The query key for invalidation
 * @param endpoint The API endpoint
 * @param mutationOptions The React Query mutation options
 * @returns The React Query mutation result
 */
export function useApiPutMutation<TData, TVariables>(
  queryKey: QueryKey,
  endpoint: string,
  mutationOptions?: Omit<UseMutationOptions<TData, ApiError, TVariables, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const response = await apiClient.put<TData>(endpoint, variables);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate the query key to refetch the data
      queryClient.invalidateQueries({ queryKey });
      
      // Call the onSuccess callback if provided
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}

/**
 * Custom hook for making PATCH requests with React Query
 * @param queryKey The query key for invalidation
 * @param endpoint The API endpoint
 * @param mutationOptions The React Query mutation options
 * @returns The React Query mutation result
 */
export function useApiPatchMutation<TData, TVariables>(
  queryKey: QueryKey,
  endpoint: string,
  mutationOptions?: Omit<UseMutationOptions<TData, ApiError, TVariables, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const response = await apiClient.patch<TData>(endpoint, variables);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate the query key to refetch the data
      queryClient.invalidateQueries({ queryKey });
      
      // Call the onSuccess callback if provided
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}

/**
 * Custom hook for making DELETE requests with React Query
 * @param queryKey The query key for invalidation
 * @param endpoint The API endpoint
 * @param mutationOptions The React Query mutation options
 * @returns The React Query mutation result
 */
export function useApiDeleteMutation<TData, TVariables>(
  queryKey: QueryKey,
  endpoint: string,
  mutationOptions?: Omit<UseMutationOptions<TData, ApiError, TVariables, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const response = await apiClient.delete<TData>(`${endpoint}${variables ? `/${variables}` : ''}`);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate the query key to refetch the data
      queryClient.invalidateQueries({ queryKey });
      
      // Call the onSuccess callback if provided
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}
