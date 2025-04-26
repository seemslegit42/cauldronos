// Export migration utilities
export { default as runMigration, isFullyMigrated } from '../utils/runMigration';
export { migrateUI, useMigrationStatus } from '../utils/migrateUI';
export { 
  enableAllMigrationFeatures, 
  disableAllMigrationFeatures,
  updateMigrationFlags,
  useMigrationFlags,
  createMigratedComponent,
  withMigration
} from '../utils/migrationUtils';

// Export migration components
export { default as MigrationSettings } from '../components/settings/MigrationSettings';
export { default as UIMigrationStatus } from '../components/UIMigrationStatus';
export { default as MigrationWrapper } from '../components/MigrationWrapper';

// Export migration types
export type { MigrationFeatureFlags } from '../utils/migrationUtils';

/**
 * UI Migration Module
 * 
 * This module provides utilities and components for migrating to the enhanced UI system.
 * 
 * Usage:
 * 
 * ```tsx
 * // Run the migration programmatically
 * import { runMigration } from '@/ui/migration';
 * 
 * // Run the migration
 * runMigration().then(() => {
 *   console.log('Migration complete');
 * });
 * 
 * // Check if the UI is fully migrated
 * import { isFullyMigrated } from '@/ui/migration';
 * 
 * if (isFullyMigrated()) {
 *   console.log('UI is fully migrated');
 * }
 * 
 * // Display migration status
 * import { UIMigrationStatus } from '@/ui/migration';
 * 
 * const App = () => (
 *   <div>
 *     <UIMigrationStatus />
 *   </div>
 * );
 * 
 * // Access migration status in a component
 * import { useMigrationStatus } from '@/ui/migration';
 * 
 * const MigrationInfo = () => {
 *   const { migrationProgress, isFullyMigrated } = useMigrationStatus();
 *   
 *   return (
 *     <div>
 *       <p>Migration progress: {migrationProgress}%</p>
 *       <p>Fully migrated: {isFullyMigrated ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * };
 * ```
 */