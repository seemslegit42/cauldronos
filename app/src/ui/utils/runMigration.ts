import { enableAllMigrationFeatures } from './migrationUtils';

/**
 * Run the UI migration
 * This function enables all enhanced UI components
 * 
 * @returns A promise that resolves when the migration is complete
 */
export const runMigration = async (): Promise<void> => {
  console.log('Starting UI migration...');
  
  // Enable all migration features
  enableAllMigrationFeatures();
  
  // Log migration complete
  console.log('UI migration complete. All enhanced components are now enabled.');
  
  return Promise.resolve();
};

/**
 * Check if the UI is fully migrated
 * 
 * @returns A boolean indicating if all migration features are enabled
 */
export const isFullyMigrated = (): boolean => {
  // Import here to avoid circular dependencies
  const { useUIStore } = require('../store/uiStore');
  
  const { migrationFlags } = useUIStore.getState();
  
  if (!migrationFlags) return false;
  
  // Check if all flags are enabled
  return Object.values(migrationFlags).every(Boolean);
};

export default runMigration;