'use client';

import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { toHex } from '@/lib/hex';
import styles from './PageHeader.module.css';

export function PageHeader() {
  const { currentIndex, totalPages } = useNavigation();
  const currentPage = PAGES[currentIndex];

  return (
    <header className={styles.header}>
      <div className={styles.pageIndicator}>
        <span className={styles.hexIndex}>
          {toHex(currentIndex)} / {toHex(totalPages)}
        </span>
        <span className={styles.separator}>—</span>
        <span className={styles.pageTitle}>{currentPage.title}</span>
      </div>
    </header>
  );
}
