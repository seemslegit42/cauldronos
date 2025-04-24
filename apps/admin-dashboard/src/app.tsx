import React from 'react';
import { ConfigProvider, App as AntApp, message, notification } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './components/ThemeProvider';
import { AIProvider } from './components/AIProvider';
import { RequestConfig } from 'umi';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// API request configuration
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.success,
        errorMessage: resData.message,
      };
    },
  },
  middlewares: [
    async (ctx, next) => {
      const { req } = ctx;
      const { url, options } = req;

      // Add authorization header if token exists
      const token = localStorage.getItem('token');
      if (token) {
        const authHeader = { Authorization: `Bearer ${token}` };
        ctx.req.options = {
          ...options,
          headers: { ...options.headers, ...authHeader },
        };
      }

      await next();
    },
  ],
  requestInterceptors: [
    (url, options) => {
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};

// Get initial state for app (for access control)
export async function getInitialState() {
  // Try to fetch current user info
  const fetchUserInfo = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/currentUser');
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch user info');
    } catch (error) {
      console.error('Error fetching user info:', error);
      return undefined;
    }
  };

  // If user is on login page, don't fetch user info
  if (window.location.pathname === '/login') {
    return {
      fetchUserInfo,
    };
  }

  // Otherwise, fetch user info
  const currentUser = await fetchUserInfo();
  return {
    currentUser,
    fetchUserInfo,
  };
}

// Export the app runtime config
export const runtime = {
  onError: (error: Error) => {
    console.error('App runtime error:', error);
    message.error('An error occurred. Please try again.');
  },
};

// Layout configuration
export const layout = () => {
  return {
    logo: '/logo.svg',
    menu: {
      locale: true,
    },
    logout: () => {
      // Handle logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
    rightRender: () => null, // Custom right content
  };
};

// Export the app layout
export function rootContainer(container: React.ReactNode) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 4,
          },
          algorithm: 'dark',
        }}
      >
        <AntApp>
          <ThemeProvider>
            <AIProvider>{container}</AIProvider>
          </ThemeProvider>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}