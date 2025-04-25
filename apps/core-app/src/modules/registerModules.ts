import { useEffect } from 'react';
import { useModules } from './ModuleRegistry';

// Import module registrations
import crmModule from './example-crm';
// Import other modules here

/**
 * Hook to register all modules with the ModuleRegistry
 */
export const useRegisterModules = () => {
  const { registerModule } = useModules();

  useEffect(() => {
    // Register all modules
    registerModule(crmModule);
    // Register other modules here
  }, [registerModule]);
};import { useEffect } from 'react';
import { useModules } from './ModuleRegistry';

// Import module registrations
import crmModule from './example-crm';
// Import other modules here

/**
 * Hook to register all modules with the ModuleRegistry
 */
export const useRegisterModules = () => {
  const { registerModule } = useModules();

  useEffect(() => {
    // Register all modules
    registerModule(crmModule);
    // Register other modules here
  }, [registerModule]);
};