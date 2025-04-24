#!/usr/bin/env node

/**
 * UI Migration Script
 * 
 * This script runs the UI migration programmatically.
 * It enables all enhanced UI components and updates the UI store.
 * 
 * Usage:
 * ```
 * npm run migrate-ui
 * ```
 */

import { runMigration, isFullyMigrated } from '../migration';

// Run the migration
const main = async () => {
  console.log('Starting UI migration...');
  
  try {
    // Run the migration
    await runMigration();
    
    // Check if the migration was successful
    if (isFullyMigrated()) {
      console.log('✅ UI migration completed successfully.');
      console.log('All enhanced UI components are now enabled.');
    } else {
      console.warn('⚠️ UI migration completed, but not all components are enabled.');
      console.log('You may need to manually enable some components in the UI settings.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ UI migration failed:', error);
    process.exit(1);
  }
};

// Run the main function
main();