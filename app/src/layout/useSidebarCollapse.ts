import { useState, useEffect } from 'react';

interface UseSidebarCollapseOptions {
  defaultCollapsed?: boolean;
  localStorageKey?: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

/**
 * Custom hook to manage sidebar collapse state with persistence
 */
export const useSidebarCollapse = ({
  defaultCollapsed = false,
  localStorageKey = 'sidebar-collapsed',
  onCollapseChange
}: UseSidebarCollapseOptions = {}) => {
  // Initialize state from localStorage if available
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState !== null ? JSON.parse(savedState) : defaultCollapsed;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(collapsed));
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, localStorageKey, onCollapseChange]);

  // Toggle function
  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  return {
    collapsed,
    setCollapsed,
    toggleCollapsed
  };
};

export default useSidebarCollapse;