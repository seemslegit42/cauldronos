# UI Component Migration Guide

This guide explains how to gradually migrate existing components to the new UI system with cyberpunk styling.

## Migration Utilities

We've provided several utilities to make the migration process as smooth as possible:

### 1. Pre-configured Migrated Components

For the most common components, we've created pre-configured migrated versions that you can use directly:

```tsx
import { MigratedButton, MigratedCard, MigratedModal } from '@/ui/components';

function MyComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  return (
    <MigratedCard title="My Card">
      <p>This card will automatically use the enhanced version if enabled.</p>
      
      <MigratedButton 
        type="primary" 
        onClick={() => setIsModalVisible(true)}
        // Enhanced props (only applied when enhanced button is enabled)
        variant="cyber"
        glowOnHover
      >
        Open Modal
      </MigratedButton>
      
      <MigratedModal
        title="My Modal"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        // Enhanced props (only applied when enhanced modal is enabled)
        variant="cyber"
        glowEffect
      >
        <p>Modal content</p>
      </MigratedModal>
    </MigratedCard>
  );
}
```

### 2. Migration Wrapper for Custom Components

For other components, you can use the `MigrationWrapper` to create your own migrated components:

```tsx
import { MigrationWrapper } from '@/ui/components';
import { Table } from 'antd';
import { EnhancedTable } from '@/ui/components/EnhancedTable';

// Create a migrated table component
const MigratedTable = MigrationWrapper(
  Table,
  EnhancedTable,
  'useEnhancedTables'
);

function MyComponent() {
  return (
    <MigratedTable
      columns={columns}
      dataSource={data}
      // Enhanced props (only applied when enhanced table is enabled)
      variant="cyber"
      glowEffect
    />
  );
}
```

### 3. Direct Use of Migration Utilities

For more complex scenarios, you can use the migration utilities directly:

```tsx
import { createMigratedComponent, useMigrationFlags } from '@/ui/utils';
import { Dropdown } from 'antd';
import { EnhancedDropdown } from '@/ui/components/EnhancedDropdown';

// Create a migrated dropdown component
const MigratedDropdown = createMigratedComponent(
  Dropdown,
  EnhancedDropdown,
  'useEnhancedDropdowns'
);

function MyComponent() {
  // Access migration flags directly
  const migrationFlags = useMigrationFlags();
  
  return (
    <div>
      {migrationFlags.useEnhancedDropdowns ? (
        <p>Using enhanced dropdowns</p>
      ) : (
        <p>Using original dropdowns</p>
      )}
      
      <MigratedDropdown menu={menu}>
        <a onClick={(e) => e.preventDefault()}>
          Hover me
        </a>
      </MigratedDropdown>
    </div>
  );
}
```

## Migration Settings

Users can control which enhanced components are enabled through the Migration Settings panel:

1. Navigate to `/ui/demo` in the application
2. Go to the "Settings" section and select the "Migration Settings" tab
3. Toggle the switches to enable or disable specific enhanced components
4. Use the "Enable All" or "Disable All" buttons to quickly toggle all components

## TypeScript Considerations

When using migrated components with TypeScript, you may encounter type errors for the enhanced props. There are a few ways to handle this:

### Option 1: Type Assertions

```tsx
<MigratedButton
  type="primary"
  // Use type assertion for enhanced props
  {...{
    variant: 'cyber',
    glowOnHover: true
  } as any}
>
  Click Me
</MigratedButton>
```

### Option 2: Conditional Props

```tsx
import { useMigrationFlags } from '@/ui/utils';

function MyComponent() {
  const { useEnhancedButtons } = useMigrationFlags();
  
  // Create props object conditionally
  const buttonProps = {
    type: 'primary',
    ...(useEnhancedButtons && {
      variant: 'cyber',
      glowOnHover: true
    })
  };
  
  return (
    <MigratedButton {...buttonProps}>
      Click Me
    </MigratedButton>
  );
}
```

### Option 3: Create Type-Safe Wrappers

```tsx
import { Button as AntButton } from 'antd';
import { Button, ButtonProps } from '@/ui/components/Button';
import { useMigrationFlags } from '@/ui/utils';

// Create a type-safe wrapper component
function SafeMigratedButton(props: ButtonProps & { antProps?: React.ComponentProps<typeof AntButton> }) {
  const { useEnhancedButtons } = useMigrationFlags();
  const { antProps, ...restProps } = props;
  
  if (useEnhancedButtons) {
    return <Button {...restProps} />;
  }
  
  return <AntButton {...antProps} />;
}
```

## Best Practices

1. **Start with isolated components**: Begin by migrating components that are relatively isolated and don't have complex interactions with other components.

2. **Test thoroughly**: After migrating a component, test it thoroughly to ensure it works correctly in both the original and enhanced modes.

3. **Use feature flags**: Use the migration feature flags to control which components are enhanced, allowing for gradual adoption.

4. **Document enhanced props**: Clearly document which props are only available in the enhanced version of a component.

5. **Consider performance**: Monitor performance before and after migration to ensure the enhanced components don't negatively impact performance.

6. **Maintain API compatibility**: Ensure that the enhanced components maintain API compatibility with the original components to minimize migration effort.

7. **Provide fallbacks**: For enhanced features that don't have equivalents in the original components, provide fallbacks or graceful degradation.

## Troubleshooting

### Component doesn't change when I toggle the feature flag

Make sure you're using the migrated component correctly. The component should be created using `createMigratedComponent` or `MigrationWrapper`, and the feature flag name should match one of the flags in the `MigrationFeatureFlags` interface.

### TypeScript errors for enhanced props

See the "TypeScript Considerations" section above for ways to handle type errors for enhanced props.

### Component looks wrong or has styling issues

Check that the global styles are properly imported and that there are no CSS conflicts. You may need to add specific styles for the enhanced component.

### Need to revert a migration

If you need to revert a migration, you can either:

1. Toggle off the feature flag in the Migration Settings panel
2. Replace the migrated component with the original component in your code

## Getting Help

If you encounter any issues during the migration process, please contact the UI team for assistance.