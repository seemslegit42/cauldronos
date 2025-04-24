/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * API response interface
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

/**
 * API error interface
 */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

/**
 * API client for making HTTP requests
 */
export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout || 30000;
  }

  /**
   * Set authorization token
   * @param token JWT token
   */
  setAuthToken(token: string): void {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authorization token
   */
  clearAuthToken(): void {
    delete this.headers['Authorization'];
  }

  /**
   * Make a GET request
   * @param path API endpoint path
   * @param params Query parameters
   * @returns Promise with response data
   */
  async get<T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, params);
    return this.request<T>('GET', url);
  }

  /**
   * Make a POST request
   * @param path API endpoint path
   * @param data Request body
   * @returns Promise with response data
   */
  async post<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    return this.request<T>('POST', url, data);
  }

  /**
   * Make a PUT request
   * @param path API endpoint path
   * @param data Request body
   * @returns Promise with response data
   */
  async put<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    return this.request<T>('PUT', url, data);
  }

  /**
   * Make a PATCH request
   * @param path API endpoint path
   * @param data Request body
   * @returns Promise with response data
   */
  async patch<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    return this.request<T>('PATCH', url, data);
  }

  /**
   * Make a DELETE request
   * @param path API endpoint path
   * @returns Promise with response data
   */
  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    return this.request<T>('DELETE', url);
  }

  /**
   * Build URL with query parameters
   * @param path API endpoint path
   * @param params Query parameters
   * @returns Full URL
   */
  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Make an HTTP request
   * @param method HTTP method
   * @param url Request URL
   * @param data Request body
   * @returns Promise with response data
   */
  private async request<T>(
    method: string,
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: this.headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await response.json();
      const responseHeaders: Record<string, string> = {};
      
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      if (!response.ok) {
        throw {
          message: responseData.message || 'API request failed',
          status: response.status,
          code: responseData.code,
          details: responseData.details,
        };
      }

      return {
        data: responseData,
        status: response.status,
        headers: responseHeaders,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
          code: 'REQUEST_TIMEOUT',
        };
      }
      
      throw error;
    }
  }
}

/**
 * Create an API client instance
 * @param config API client configuration
 * @returns API client instance
 */
export const createApiClient = (config: ApiClientConfig): ApiClient => {
  return new ApiClient(config);
};