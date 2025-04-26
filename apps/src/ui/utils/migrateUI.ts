import { enableAllMigrationFeatures } from './migrationUtils';
import { useUIStore } from '../store/uiStore';

/**
 * Utility function to migrate the UI to the enhanced components
 * This function enables all migration features and returns the current migration status
 * 
 * @returns An object containing the migration status
 */
export const migrateUI = () => {
  // Enable all migration features
  enableAllMigrationFeatures();
  
  // Get the current migration flags
  const { migrationFlags } = useUIStore.getState();
  
  // Calculate migration progress
  const enabledCount = migrationFlags 
    ? Object.values(migrationFlags).filter(Boolean).length 
    : 0;
  
  const totalCount = migrationFlags 
    ? Object.keys(migrationFlags).length 
    : 0;
  
  const migrationProgress = totalCount > 0 
    ? Math.round((enabledCount / totalCount) * 100) 
    : 0;
  
  return {
    migrationFlags,
    enabledCount,
    totalCount,
    migrationProgress,
    isFullyMigrated: migrationProgress === 100,
  };
};

/**
 * Hook to access migration status
 * This hook returns the current migration status
 * 
 * @returns An object containing the migration status
 */
export const useMigrationStatus = () => {
  const { migrationFlags } = useUIStore();
  
  // Calculate migration progress
  const enabledCount = migrationFlags 
    ? Object.values(migrationFlags).filter(Boolean).length 
    : 0;
  
  const totalCount = migrationFlags 
    ? Object.keys(migrationFlags).length 
    : 0;
  
  const migrationProgress = totalCount > 0 
    ? Math.round((enabledCount / totalCount) * 100) 
    : 0;
  
  return {
    migrationFlags,
    enabledCount,
    totalCount,
    migrationProgress,
    isFullyMigrated: migrationProgress === 100,
  };
};

export default migrateUI;