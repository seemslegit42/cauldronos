# UI Migration Guide

This guide explains how to migrate to the enhanced UI components in CauldronOS.

## Overview

The UI migration process involves enabling enhanced versions of standard Ant Design components. These enhanced components provide:

- Cyberpunk styling options
- Improved accessibility
- Better integration with the CauldronOS design system
- Zod schema validation for forms
- Animation support with Framer Motion
- State management with Zustand

## Migration Options

There are several ways to migrate to the enhanced UI components:

### 1. Automatic Migration (Recommended)

Run the migration script to automatically enable all enhanced components:

```bash
npm run migrate-ui
```

This script will:
- Enable all enhanced components
- Update the UI store with the new migration flags
- Log the migration status

### 2. Programmatic Migration

You can also run the migration programmatically in your code:

```tsx
import { runMigration } from '@/ui/migration';

// Run the migration
runMigration().then(() => {
  console.log('Migration complete');
});
```

### 3. Manual Migration via UI

The UI includes a migration settings panel that allows you to control which enhanced components are enabled:

```tsx
import { MigrationSettings } from '@/ui/components';

const SettingsPage = () => (
  <div>
    <MigrationSettings />
  </div>
);
```

## Migration Status

You can display the current migration status using the `UIMigrationStatus` component:

```tsx
import { UIMigrationStatus } from '@/ui/components';

const App = () => (
  <div>
    <UIMigrationStatus />
  </div>
);
```

Or check the migration status programmatically:

```tsx
import { useMigrationStatus, isFullyMigrated } from '@/ui/migration';

const MigrationInfo = () => {
  const { migrationProgress, enabledCount, totalCount } = useMigrationStatus();
  
  return (
    <div>
      <p>Migration progress: {migrationProgress}%</p>
      <p>{enabledCount} of {totalCount} components enabled</p>
      <p>Fully migrated: {isFullyMigrated() ? 'Yes' : 'No'}</p>
    </div>
  );
};
```

## Enhanced Components

The following components have enhanced versions:

- **Core Components**
  - Buttons
  - Cards
  - Modals
  - Forms
  - Inputs

- **Advanced Components**
  - Tables
  - Menus
  - Layouts

## Migration Feature Flags

The migration is controlled by feature flags in the UI store:

```tsx
// Migration feature flags
migrationFlags: {
  useEnhancedButtons: true,
  useEnhancedCards: true,
  useEnhancedModals: true,
  useEnhancedForms: true,
  useEnhancedInputs: true,
  useEnhancedTables: true,
  useEnhancedMenus: true,
  useEnhancedLayouts: true,
  useCyberpunkTheme: true,
}
```

You can update these flags programmatically:

```tsx
import { updateMigrationFlags } from '@/ui/migration';

// Enable enhanced buttons
updateMigrationFlags({
  useEnhancedButtons: true,
});

// Enable all features
import { enableAllMigrationFeatures } from '@/ui/migration';
enableAllMigrationFeatures();

// Disable all features
import { disableAllMigrationFeatures } from '@/ui/migration';
disableAllMigrationFeatures();
```

## Creating Migrated Components

You can create your own migrated components using the `MigrationWrapper` or `createMigratedComponent` utilities:

```tsx
import { MigrationWrapper } from '@/ui/components';
import { Table as AntTable } from 'antd';
import { EnhancedTable } from '@/ui/components/EnhancedTable';

// Create a migrated table component
const MigratedTable = MigrationWrapper(AntTable, EnhancedTable, 'useEnhancedTables');

// Or using createMigratedComponent
import { createMigratedComponent } from '@/ui/migration';

const Table = createMigratedComponent(
  AntTable,
  EnhancedTable,
  'useEnhancedTables'
);
```

## Troubleshooting

If you encounter issues during migration:

1. Check the console for error messages
2. Verify that all dependencies are installed
3. Try disabling and re-enabling specific components
4. Refresh the page after enabling new components
5. Check for conflicts with custom styles or components

For persistent issues, try running the migration script again:

```bash
npm run migrate-ui
```