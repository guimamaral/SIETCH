'use client';

import { useEffect } from 'react';
import { useNavigationContext } from '@/context/NavigationContext';
import { useThemeContext } from '@/context/ThemeContext';

/**
 * Hook that handles keyboard navigation
 * Call this once at the top level of your app
 */
export function useKeyboardNavigation() {
  const { goNext, goPrev, goFirst, goLast } = useNavigationContext();
  const { toggleTheme } = useThemeContext();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Guard: Don't capture keys when in form elements
      const activeElement = document.activeElement;
      const tagName = activeElement?.tagName.toLowerCase();

      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        (activeElement as HTMLElement)?.isContentEditable
      ) {
        return; // Let the element handle the key
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          goPrev();
          break;
        case 'Home':
          event.preventDefault();
          goFirst();
          break;
        case 'End':
          event.preventDefault();
          goLast();
          break;
        case ' ': // Space
          event.preventDefault();
          toggleTheme();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, goFirst, goLast, toggleTheme]);
}

/**
 * Hook to access navigation state and actions
 */
export function useNavigation() {
  return useNavigationContext();
}
