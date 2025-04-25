/**
 * CauldronOS UI Package
 * 
 * This package exports all UI components, themes, and styles for CauldronOS.
 * 
 * Usage:
 * ```tsx
 * // Import components
 * import { Button, Card, Modal } from '@/ui';
 * 
 * // Import enhanced components
 * import { Button, Card, Modal } from '@/ui/components/enhanced';
 * 
 * // Import specific categories
 * import { ZodForm, ZodFormItem } from '@/ui/components/form';
 * ```
 */

// Export all components
export * from './components';

// Export theme
export * from './theme';

// Export animations
export * from './animations';

// Export hooks
export * from './hooks';

// Export utilities
export * from './utils';

// Export store
export { default as useUIStore } from './store/uiStore';