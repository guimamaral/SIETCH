'use client';

import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { toHex } from '@/lib/hex';
import styles from './NavStrip.module.css';

export function NavStrip() {
  const { currentIndex, goTo, goToNull } = useNavigation();

  function handleClick(index: number) {
    if (index === 0 && currentIndex === 0) {
      goToNull();
    } else {
      goTo(index);
    }
  }

  return (
    <nav className={styles.nav} aria-label="Page navigation">
      <ul className={styles.navList}>
        {PAGES.map((page, index) => (
          <li key={page.key}>
            <button
              className={styles.navItem}
              onClick={() => handleClick(index)}
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
