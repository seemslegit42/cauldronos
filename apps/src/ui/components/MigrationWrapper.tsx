import React from 'react';
import { Button as AntButton, Card as AntCard, Modal as AntModal } from 'antd';
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';
import { createMigratedComponent } from '../utils/migrationUtils';

/**
 * Pre-configured migrated components
 * These components will render either the original Ant Design component or the enhanced component
 * based on the migration feature flags.
 */

// Migrated Button component
export const MigratedButton = createMigratedComponent(
  AntButton,
  Button,
  'useEnhancedButtons'
);

// Migrated Card component
export const MigratedCard = createMigratedComponent(
  AntCard,
  Card,
  'useEnhancedCards'
);

// Migrated Modal component
export const MigratedModal = createMigratedComponent(
  AntModal,
  Modal,
  'useEnhancedModals'
);

/**
 * Migration wrapper component
 * This component can be used to wrap any component with migration utilities
 * 
 * @example
 * // Wrap a component with migration utilities
 * import { MigrationWrapper } from '@/ui/components/MigrationWrapper';
 * import { Table } from 'antd';
 * import { EnhancedTable } from '@/ui/components/EnhancedTable';
 * 
 * const MigratedTable = MigrationWrapper(Table, EnhancedTable, 'useEnhancedTables');
 */
export function MigrationWrapper<P>(
  OriginalComponent: React.ComponentType<P>,
  EnhancedComponent: React.ComponentType<P>,
  flagName: string
): React.FC<P> {
  return createMigratedComponent(
    OriginalComponent,
    EnhancedComponent,
    flagName as any
  );
}

export default {
  Button: MigratedButton,
  Card: MigratedCard,
  Modal: MigratedModal,
  Wrapper: MigrationWrapper,
};