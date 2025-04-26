import React, { createContext, useEffect } from 'react';
import { AnalyticsContextValue, AnalyticsProviderProps } from '../types';
import { useAnalyticsStore } from '../store/analyticsStore';
import { trackEvent, trackPageView, trackError } from '../utils/tracking';

// Create context with default values
export const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackEvent: () => {},
  trackPageView: () => {},
  trackError: () => {},
  isAnalyticsEnabled: false,
  setUserProperties: () => {},
  resetAnalytics: () => {},
});

/**
 * Provider component for analytics
 * Initializes analytics providers and provides tracking methods
 */
const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  config = {
    providers: ['google'],
    debug: false,
    disabled: false,
  },
  children,
}) => {
  const {
    isEnabled,
    setUserId,
    setUserProperties,
    enableAnalytics,
    disableAnalytics,
    resetAnalytics,
  } = useAnalyticsStore();

  // Initialize analytics based on config
  useEffect(() => {
    if (config.disabled) {
      disableAnalytics();
    } else {
      enableAnalytics();
    }

    // Initialize providers
    // This would be replaced with actual initialization code
    if (config.providers.includes('google') && config.googleAnalyticsId) {
      // Initialize Google Analytics
      console.log('Initializing Google Analytics with ID:', config.googleAnalyticsId);
    }

    if (config.providers.includes('plausible') && config.plausibleDomain) {
      // Initialize Plausible
      console.log('Initializing Plausible Analytics for domain:', config.plausibleDomain);
    }

    // Set a random user ID if not already set
    // In a real implementation, this would be the actual user ID
    setUserId(`anonymous-${Math.random().toString(36).substring(2, 15)}`);

    return () => {
      // Cleanup
    };
  }, [config, enableAnalytics, disableAnalytics, setUserId]);

  // Context value
  const value: AnalyticsContextValue = {
    trackEvent,
    trackPageView,
    trackError,
    isAnalyticsEnabled: isEnabled,
    setUserProperties,
    resetAnalytics,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;