/**
 * Analytics package types
 */

export type AnalyticsProvider = 'google' | 'plausible' | 'custom';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface PageViewEvent {
  path: string;
  title?: string;
  referrer?: string;
  properties?: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface ErrorEvent {
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface AnalyticsConfig {
  providers: AnalyticsProvider[];
  googleAnalyticsId?: string;
  plausibleDomain?: string;
  customEndpoint?: string;
  debug?: boolean;
  disabled?: boolean;
  anonymizeIp?: boolean;
  excludePaths?: string[];
  includeUtm?: boolean;
  sampleRate?: number;
}

export interface AnalyticsProviderProps {
  config?: AnalyticsConfig;
  children: React.ReactNode;
}

export interface AnalyticsContextValue {
  trackEvent: (name: string, properties?: Record<string, any>) => void;
  trackPageView: (path: string, properties?: Record<string, any>) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  isAnalyticsEnabled: boolean;
  setUserProperties: (properties: Record<string, any>) => void;
  resetAnalytics: () => void;
}

export interface AnalyticsState {
  userId?: string;
  sessionId?: string;
  userProperties?: Record<string, any>;
  isEnabled: boolean;
  events: AnalyticsEvent[];
  pageViews: PageViewEvent[];
  errors: ErrorEvent[];
}

export interface AnalyticsActions {
  trackEvent: (name: string, properties?: Record<string, any>) => void;
  trackPageView: (path: string, properties?: Record<string, any>) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  setUserProperties: (properties: Record<string, any>) => void;
  setUserId: (userId: string) => void;
  resetAnalytics: () => void;
  enableAnalytics: () => void;
  disableAnalytics: () => void;
}

export interface AnalyticsStore extends AnalyticsState, AnalyticsActions {}