import { useAnalyticsStore } from '../store/analyticsStore';

/**
 * Track an event
 * @param name Event name
 * @param properties Event properties
 */
export const trackEvent = (name: string, properties?: Record<string, any>) => {
  const { isEnabled, trackEvent: storeTrackEvent } = useAnalyticsStore.getState();

  if (!isEnabled) {
    return;
  }

  storeTrackEvent(name, properties);
};

/**
 * Track a page view
 * @param path Page path
 * @param properties Additional properties
 */
export const trackPageView = (path: string, properties?: Record<string, any>) => {
  const { isEnabled, trackPageView: storeTrackPageView } = useAnalyticsStore.getState();

  if (!isEnabled) {
    return;
  }

  storeTrackPageView(path, properties);
};

/**
 * Track an error
 * @param error Error object
 * @param context Additional context
 */
export const trackError = (error: Error, context?: Record<string, any>) => {
  const { isEnabled, trackError: storeTrackError } = useAnalyticsStore.getState();

  if (!isEnabled) {
    return;
  }

  storeTrackError(error, context);
};