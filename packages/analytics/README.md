# @cauldronos/analytics

Analytics package for CauldronOS applications.

## Features

- Analytics tracking and reporting
- Support for multiple analytics providers (Google Analytics, Plausible, etc.)
- Custom event tracking
- User behavior analysis
- Performance monitoring

## Usage

```tsx
import { 
  AnalyticsProvider, 
  useAnalytics, 
  trackEvent, 
  trackPageView 
} from '@cauldronos/analytics';

// Wrap your app with the provider
<AnalyticsProvider providers={['google', 'plausible']}>
  <App />
</AnalyticsProvider>

// Use the hook in components
const { trackEvent, trackPageView } = useAnalytics();

// Track events
trackEvent('button_click', { buttonId: 'submit', page: 'checkout' });

// Track page views
trackPageView('/dashboard');
```