// Re-export UI components from the shared UI package
// This maintains backward compatibility while using the shared components
export { default as PageTransition } from './PageTransition';
export { default as InsightCard } from './InsightCard';
export { default as AISearchBar } from './AISearchBar';
export { default as GestureCard } from './GestureCard';
export { default as PredictiveForm } from './PredictiveForm';

// For new code, it's recommended to import directly from @cauldronos/ui
