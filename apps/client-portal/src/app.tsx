import React from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create mock components for ThemeProvider and AIProvider
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Export the app runtime config
export const runtime = {
  onAppConfig: ({ config }: { config: any }) => {
    return {
      ...config,
      title: 'CauldronOS Client Portal',
      theme: {
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 4,
        },
        algorithm: 'dark',
      },
    };
  },
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
            <AIProvider>
              {container}
            </AIProvider>
          </ThemeProvider>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}