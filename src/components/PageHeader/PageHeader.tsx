'use client';

import { useState, useEffect } from 'react';
import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { toHex } from '@/lib/hex';
import styles from './PageHeader.module.css';

const SEGMENTS = 8;

function getBatteryLevel(date: Date): number {
  const minutesSinceMidnight = date.getHours() * 60 + date.getMinutes();
  return 1 - minutesSinceMidnight / (24 * 60);
}

function renderBattery(level: number): string {
  const filled = Math.round(level * SEGMENTS);
  return '[' + '\u2588'.repeat(filled) + '\u2591'.repeat(SEGMENTS - filled) + ']';
}

function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function StillsuitBattery() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <div className={styles.stillsuit}>
      <span className={styles.stillsuitTime}>{formatTime(now)}</span>
      <span className={styles.stillsuitBattery}>{renderBattery(getBatteryLevel(now))}</span>
    </div>
  );
}

export function PageHeader() {
  const { currentIndex } = useNavigation();
  const currentPage = PAGES[currentIndex];

  return (
    <header className={styles.header}>
      <div className={styles.pageIndicator}>
        <span className={styles.hexIndex}>
          {toHex(currentIndex)}
        </span>
        <span className={styles.separator}>—</span>
        <span className={styles.pageTitle}>{currentPage.title}</span>
      </div>
      <StillsuitBattery />
    </header>
  );
}
