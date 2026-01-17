'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { NavigationContextValue } from '@/types';
import { TOTAL_PAGES } from '@/lib/pages';
import { toHex, fromHex } from '@/lib/hex';

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  initialIndex?: number;
}

export function NavigationProvider({ children, initialIndex = 0 }: NavigationProviderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Parse hash on mount and handle browser navigation
  useEffect(() => {
    function parseHashAndNavigate() {
      const hash = window.location.hash.slice(1); // Remove '#'

      if (!hash) {
        // No hash, update URL to current index
        window.history.replaceState(null, '', `#${toHex(currentIndex)}`);
        return;
      }

      const index = fromHex(hash);

      if (index !== null && index >= 0 && index < TOTAL_PAGES) {
        setCurrentIndex(index);
      } else {
        // Invalid hash, reset to first page
        setCurrentIndex(0);
        window.history.replaceState(null, '', `#${toHex(0)}`);
      }
    }

    // Parse on mount
    parseHashAndNavigate();

    // Handle browser back/forward
    window.addEventListener('hashchange', parseHashAndNavigate);
    return () => window.removeEventListener('hashchange', parseHashAndNavigate);
  }, []); // Only run on mount

  // Update hash when index changes (but not on initial mount)
  useEffect(() => {
    const hash = `#${toHex(currentIndex)}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_PAGES) {
      setCurrentIndex(index);
    }
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_PAGES);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  const goFirst = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goLast = useCallback(() => {
    setCurrentIndex(TOTAL_PAGES - 1);
  }, []);

  const value: NavigationContextValue = {
    currentIndex,
    totalPages: TOTAL_PAGES,
    goTo,
    goNext,
    goPrev,
    goFirst,
    goLast,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
}
