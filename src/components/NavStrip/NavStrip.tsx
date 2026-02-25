'use client';

import { useState } from 'react';
import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { toHex } from '@/lib/hex';
import styles from './NavStrip.module.css';

export function NavStrip() {
  const { currentIndex, goTo, goToNull } = useNavigation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  function handleClick(index: number) {
    if (index === 0 && currentIndex === 0) {
      goToNull();
    } else {
      goTo(index);
    }
  }

  const displayPage = PAGES[hoveredIndex ?? currentIndex];

  return (
    <nav className={styles.nav} aria-label="Page navigation">
      <div className={styles.navHint}>
        <span>{displayPage.title}</span>
        {hoveredIndex !== null && (
          <span
            className={styles.processState}
            data-state={displayPage.processState}
          >
            {displayPage.processState}
          </span>
        )}
      </div>
      <ul className={styles.navList}>
        {PAGES.map((page, index) => (
          <li key={page.key}>
            <button
              className={styles.navItem}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              aria-current={index === currentIndex ? 'page' : undefined}
              aria-label={`Go to ${page.title}`}
            >
              {toHex(index)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
