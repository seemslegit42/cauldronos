import { message } from 'antd';
import { handleError } from '@cauldronos/utils';

// Define the base API URL
const API_BASE_URL = '/api';

// Define the API error type
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

// Define the API response type
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Define the API request options
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

/**
 * Creates a URL with query parameters
 * @param url The base URL
 * @param params The query parameters
 * @returns The URL with query parameters
 */
const createUrl = (url: string, params?: Record<string, string | number | boolean | undefined>): string => {
  if (!params) return url;
  
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};

// Using the imported handleError function from @cauldronos/utils

/**
 * Makes a GET request to the API
 * @param endpoint The API endpoint
 * @param options The request options
 * @returns A promise that resolves to the API response
 */
export const get = async <T>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  try {
    const url = createUrl(`${API_BASE_URL}${endpoint}`, options?.params);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: options?.withCredentials ? 'include' : 'same-origin',
      signal: options?.signal,
    });
    
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: await response.json(),
        },
      };
    }
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Makes a POST request to the API
 * @param endpoint The API endpoint
 * @param body The request body
 * @param options The request options
 * @returns A promise that resolves to the API response
 */
export const post = async <T>(
  endpoint: string,
  body: any,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  try {
    const url = createUrl(`${API_BASE_URL}${endpoint}`, options?.params);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
      credentials: options?.withCredentials ? 'include' : 'same-origin',
      signal: options?.signal,
    });
    
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: await response.json(),
        },
      };
    }
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Makes a PUT request to the API
 * @param endpoint The API endpoint
 * @param body The request body
 * @param options The request options
 * @returns A promise that resolves to the API response
 */
export const put = async <T>(
  endpoint: string,
  body: any,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  try {
    const url = createUrl(`${API_BASE_URL}${endpoint}`, options?.params);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
      credentials: options?.withCredentials ? 'include' : 'same-origin',
      signal: options?.signal,
    });
    
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: await response.json(),
        },
      };
    }
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Makes a PATCH request to the API
 * @param endpoint The API endpoint
 * @param body The request body
 * @param options The request options
 * @returns A promise that resolves to the API response
 */
export const patch = async <T>(
  endpoint: string,
  body: any,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  try {
    const url = createUrl(`${API_BASE_URL}${endpoint}`, options?.params);
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
      credentials: options?.withCredentials ? 'include' : 'same-origin',
      signal: options?.signal,
    });
    
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: await response.json(),
        },
      };
    }
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Makes a DELETE request to the API
 * @param endpoint The API endpoint
 * @param options The request options
 * @returns A promise that resolves to the API response
 */
export const del = async <T>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  try {
    const url = createUrl(`${API_BASE_URL}${endpoint}`, options?.params);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: options?.withCredentials ? 'include' : 'same-origin',
      signal: options?.signal,
    });
    
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: await response.json(),
        },
      };
    }
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    throw handleError(error);
  }
};

// Export the API client
const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default apiClient;
