import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from '../../../core/hooks/useTheme';

// Replace with your actual Clerk publishable key
const publishableKey = process.env.CLERK_PUBLISHABLE_KEY || 'pk_test_your-publishable-key';

interface ClerkProviderWithRoutesProps {
  children: React.ReactNode;
}

export const ClerkProviderWithRoutes: React.FC<ClerkProviderWithRoutesProps> = ({ children }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: isDarkMode ? dark : undefined,
        variables: {
          colorPrimary: theme.colorPrimary,
          colorText: theme.colorText,
          colorBackground: theme.colorBgContainer,
          colorInputBackground: theme.colorBgContainer,
          colorInputText: theme.colorText,
          colorTextOnPrimaryBackground: '#ffffff',
        },
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: theme.colorPrimary,
            colorInfo: theme.colorPrimary,
            colorSuccess: theme.colorSuccess,
            colorWarning: theme.colorWarning,
            colorError: theme.colorError,
            colorTextBase: theme.colorText,
            colorBgBase: theme.colorBgBase,
            borderRadius: 4,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ClerkProvider>
  );
};
