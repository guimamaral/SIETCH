'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Theme, ThemeContextValue } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with null to avoid hydration mismatch
  // The actual theme is set by the blocking script in layout.tsx
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Sync with actual theme on mount
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
    if (currentTheme) {
      setTheme(currentTheme);
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';

      // Update DOM
      document.documentElement.setAttribute('data-theme', newTheme);

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEYS.theme, newTheme);
      } catch (e) {
        // localStorage might not be available
      }

      return newTheme;
    });
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
      if (!storedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
