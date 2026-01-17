'use client';

import { useThemeContext } from '@/context/ThemeContext';

/**
 * Hook to access and toggle the current theme
 */
export function useTheme() {
  return useThemeContext();
}
