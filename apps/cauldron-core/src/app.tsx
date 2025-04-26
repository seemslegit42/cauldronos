import React from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from './ui/theme/ThemeProvider';
import ModuleProvider from './modules/ModuleRegistry';
import AppRoutes from './routes';
import { AuthProvider } from 'wasp/client/auth';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Main App component
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <ConfigProvider>
        <ThemeProvider>
          <ModuleProvider>
            <AppRoutes />
          </ModuleProvider>
        </ThemeProvider>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
