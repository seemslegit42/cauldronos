/**
 * CauldronOS Analytics Package
 * Analytics tracking and reporting for CauldronOS applications
 */

// Export components
export { default as AnalyticsProvider } from './providers/AnalyticsProvider';

// Export hooks
export { default as useAnalytics } from './hooks/useAnalytics';

// Export utility functions
export { trackEvent, trackPageView, trackError } from './utils/tracking';

// Export provider-specific utilities
export { default as googleAnalytics } from './providers/googleAnalytics';
export { default as plausibleAnalytics } from './providers/plausibleAnalytics';

// Export types
export * from './types';

// Export package info
export const CauldronAnalytics = {
  version: '0.1.0',
  name: 'CauldronOS Analytics'
};