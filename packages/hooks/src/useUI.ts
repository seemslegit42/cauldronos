import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing media queries
 * @param query Media query string
 * @returns Boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
};

/**
 * Hook for managing sidebar state
 * @param defaultCollapsed Initial collapsed state
 * @returns Object with collapsed state and toggle function
 */
export const useSidebar = (defaultCollapsed = false) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return { collapsed, toggleSidebar };
};

/**
 * Hook for managing modal state
 * @returns Object with isOpen state and open/close functions
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};