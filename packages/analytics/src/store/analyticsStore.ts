import { create } from 'zustand';
import {
  AnalyticsStore,
  AnalyticsEvent,
  PageViewEvent,
  ErrorEvent,
} from '../types';

/**
 * Analytics store using Zustand
 * Manages analytics state and provides tracking methods
 */
export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  userId: undefined,
  sessionId: `session-${Math.random().toString(36).substring(2, 15)}`,
  userProperties: {},
  isEnabled: true,
  events: [],
  pageViews: [],
  errors: [],

  trackEvent: (name: string, properties?: Record<string, any>) => {
    const { userId, sessionId, isEnabled } = get();

    if (!isEnabled) {
      return;
    }

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      userId,
      sessionId,
    };

    // In a real implementation, this would send the event to analytics providers
    console.log('Tracking event:', event);

    set(state => ({
      events: [...state.events, event],
    }));
  },

  trackPageView: (path: string, properties?: Record<string, any>) => {
    const { userId, sessionId, isEnabled } = get();

    if (!isEnabled) {
      return;
    }

    const pageView: PageViewEvent = {
      path,
      title: document.title,
      referrer: document.referrer,
      properties,
      timestamp: Date.now(),
      userId,
      sessionId,
    };

    // In a real implementation, this would send the page view to analytics providers
    console.log('Tracking page view:', pageView);

    set(state => ({
      pageViews: [...state.pageViews, pageView],
    }));
  },

  trackError: (error: Error, context?: Record<string, any>) => {
    const { userId, sessionId, isEnabled } = get();

    if (!isEnabled) {
      return;
    }

    const errorEvent: ErrorEvent = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now(),
      userId,
      sessionId,
    };

    // In a real implementation, this would send the error to analytics providers
    console.log('Tracking error:', errorEvent);

    set(state => ({
      errors: [...state.errors, errorEvent],
    }));
  },

  setUserProperties: (properties: Record<string, any>) => {
    set(state => ({
      userProperties: {
        ...state.userProperties,
        ...properties,
      },
    }));
  },

  setUserId: (userId: string) => {
    set({ userId });
  },

  resetAnalytics: () => {
    set({
      userId: undefined,
      sessionId: `session-${Math.random().toString(36).substring(2, 15)}`,
      userProperties: {},
      events: [],
      pageViews: [],
      errors: [],
    });
  },

  enableAnalytics: () => {
    set({ isEnabled: true });
  },

  disableAnalytics: () => {
    set({ isEnabled: false });
  },
}));