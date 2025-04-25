import { useUIStore } from '../store/uiStore';

/**
 * Feature flags for controlling component migration
 * These can be toggled in the UI settings or via the store
 */
export interface MigrationFeatureFlags {
  useEnhancedButtons: boolean;
  useEnhancedCards: boolean;
  useEnhancedModals: boolean;
  useEnhancedForms: boolean;
  useEnhancedInputs: boolean;
  useEnhancedTables: boolean;
  useEnhancedMenus: boolean;
  useEnhancedLayouts: boolean;
  useCyberpunkTheme: boolean;
}

/**
 * Hook to access migration feature flags
 * This allows components to conditionally render the enhanced or original versions
 */
export const useMigrationFlags = (): MigrationFeatureFlags => {
  const { 
    migrationFlags = {
      useEnhancedButtons: true,
      useEnhancedCards: true,
      useEnhancedModals: true,
      useEnhancedForms: true,
      useEnhancedInputs: true,
      useEnhancedTables: false,
      useEnhancedMenus: false,
      useEnhancedLayouts: false,
      useCyberpunkTheme: true,
    }
  } = useUIStore();
  
  return migrationFlags;
};

/**
 * Higher-order component that conditionally renders the enhanced or original component
 * based on the migration feature flags
 * 
 * @param OriginalComponent The original component to render if the flag is off
 * @param EnhancedComponent The enhanced component to render if the flag is on
 * @param flagName The name of the feature flag to check
 */
export function withMigration<P>(
  OriginalComponent: React.ComponentType<P>,
  EnhancedComponent: React.ComponentType<P>,
  flagName: keyof MigrationFeatureFlags
): React.FC<P> {
  return (props: P) => {
    const flags = useMigrationFlags();
    
    if (flags[flagName]) {
      return <EnhancedComponent {...props} />;
    }
    
    return <OriginalComponent {...props} />;
  };
}

/**
 * Creates a component that can be used during the migration period
 * It will render either the original or enhanced component based on the feature flag
 * 
 * @example
 * // Create a migrated button component
 * import { Button as AntButton } from 'antd';
 * import { Button as EnhancedButton } from '@/ui/components/Button';
 * import { createMigratedComponent } from '@/ui/utils/migrationUtils';
 * 
 * export const Button = createMigratedComponent(
 *   AntButton,
 *   EnhancedButton,
 *   'useEnhancedButtons'
 * );
 */
export function createMigratedComponent<P>(
  OriginalComponent: React.ComponentType<P>,
  EnhancedComponent: React.ComponentType<P>,
  flagName: keyof MigrationFeatureFlags
): React.FC<P> {
  return withMigration(OriginalComponent, EnhancedComponent, flagName);
}

/**
 * Updates the UI store with new migration flag values
 * This can be used to toggle features on or off
 * 
 * @param flags Partial migration feature flags to update
 */
export const updateMigrationFlags = (flags: Partial<MigrationFeatureFlags>): void => {
  const { setMigrationFlags } = useUIStore.getState();
  const currentFlags = useUIStore.getState().migrationFlags || {};
  
  setMigrationFlags({
    ...currentFlags,
    ...flags,
  });
};

/**
 * Enables all migration features
 * This can be used to fully migrate to the new UI system
 */
export const enableAllMigrationFeatures = (): void => {
  const { setMigrationFlags } = useUIStore.getState();
  
  setMigrationFlags({
    useEnhancedButtons: true,
    useEnhancedCards: true,
    useEnhancedModals: true,
    useEnhancedForms: true,
    useEnhancedInputs: true,
    useEnhancedTables: true,
    useEnhancedMenus: true,
    useEnhancedLayouts: true,
    useCyberpunkTheme: true,
  });
};

/**
 * Disables all migration features
 * This can be used to revert to the original UI system
 */
export const disableAllMigrationFeatures = (): void => {
  const { setMigrationFlags } = useUIStore.getState();
  
  setMigrationFlags({
    useEnhancedButtons: false,
    useEnhancedCards: false,
    useEnhancedModals: false,
    useEnhancedForms: false,
    useEnhancedInputs: false,
    useEnhancedTables: false,
    useEnhancedMenus: false,
    useEnhancedLayouts: false,
    useCyberpunkTheme: false,
  });
};