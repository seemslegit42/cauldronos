# CauldronOS Monorepo Migration Guide

This document outlines the migration from the previous project structure to the new monorepo architecture.

## Migration Summary

### Old Structure ➡️ New Structure

| Old Path | New Path | Description |
|----------|----------|-------------|
| `app/` | `apps/cauldron-core/` | Main application |
| `blog/` | `blog/` | Documentation blog (unchanged) |
| `e2e-tests/` | `e2e-tests/` | End-to-end tests (unchanged) |
| `app/src/ui/` | `packages/ui/` | UI component library |
| `app/src/ui/hooks/` | `packages/hooks/` | Shared React hooks |
| `app/src/shared/utils/` | `packages/utils/` | Utility functions |
| `app/src/ai/` | `packages/agents/` | AI agent code |
| `app/src/api/` | `packages/api/` | API client and services |
| `app/src/ui/components/` | `packages/ui/src/atoms/`, `packages/ui/src/molecules/`, etc. | UI components organized by atomic design |

## Migration Steps

1. **Create New Directory Structure**
   - Created the new monorepo structure with apps, packages, and configs directories

2. **Configure Monorepo Tools**
   - Updated pnpm-workspace.yaml to include the new directories
   - Enhanced turbo.json with improved pipeline configuration
   - Created shared configurations for TypeScript, ESLint, and Tailwind CSS

3. **Create Package Templates**
   - Set up the basic structure for each shared package
   - Created package.json, tsconfig.json, and README.md files
   - Implemented initial component examples in the UI package

4. **Create Migration Scripts**
   - Created scripts to help with package creation and component migration
   - Implemented a file migration utility for moving code to the new structure

## Next Steps

1. **Migrate UI Components**
   - Move components from `app/src/ui/components/` to the appropriate directories in `packages/ui/`
   - Organize components according to atomic design principles
   - Update imports in all files that use these components

2. **Migrate Hooks and Utilities**
   - Move hooks from `app/src/ui/hooks/` to `packages/hooks/`
   - Move utilities from `app/src/shared/utils/` to `packages/utils/`
   - Update imports in all files that use these hooks and utilities

3. **Migrate AI and API Code**
   - Move AI-related code from `app/src/ai/` to `packages/agents/`
   - Move API-related code from `app/src/api/` to `packages/api/`
   - Update imports in all files that use these modules

4. **Create New Apps**
   - Set up the admin-dashboard and client-portal apps
   - Configure routing and shared components
   - Implement app-specific features

5. **Update Build and Test Configurations**
   - Configure CI/CD pipelines for the new structure
   - Update test configurations to work with the monorepo
   - Ensure all scripts and commands work correctly

## Migration Commands

Use these commands to help with the migration process:

```bash
# Create a new package
node scripts/create-package.js <package-name> <package-type>

# Create a new UI component
node scripts/create-component.js <component-name> <component-type>

# Migrate files from old structure to new structure
node scripts/migrate-files.js <source-path> <destination-path>
```

## Benefits of the New Structure

- **Improved Developer Experience**: Clear separation of concerns and modular architecture
- **Better Build Performance**: Optimized build pipeline with Turborepo
- **Enhanced Reusability**: Shared packages for UI components, hooks, and utilities
- **Easier Maintenance**: Consistent configuration and structure across all packages
- **Scalable Architecture**: Ready for future growth with additional apps and packages