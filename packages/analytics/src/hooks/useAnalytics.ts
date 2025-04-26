import { useContext } from 'react';
import { AnalyticsContext } from '../providers/AnalyticsProvider';

/**
 * Hook for using analytics in components
 * Provides methods for tracking events, page views, and errors
 */
const useAnalytics = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }

  return context;
};

export default useAnalytics;