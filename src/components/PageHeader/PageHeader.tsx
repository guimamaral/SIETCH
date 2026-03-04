'use client';

import { useState, useEffect } from 'react';
import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { toHex } from '@/lib/hex';
import styles from './PageHeader.module.css';

const SEGMENTS = 8;

function randomHex32(): string {
  return Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0');
}

function StackCanary() {
  const [canary, setCanary] = useState<string | null>(null);

  useEffect(() => {
    setCanary('00007fff' + randomHex32());
  }, []);

  if (!canary) return null;

  return (
    <div className={styles.canary}>
      <span className={styles.canaryLabel}>CANARY</span>
      <span className={styles.canaryValue}>0x{canary}</span>
    </div>
  );
}

function getBatteryLevel(date: Date): number {
  const minutesSinceMidnight = date.getHours() * 60 + date.getMinutes();
  return 1 - minutesSinceMidnight / (24 * 60);
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

  const filled = Math.round(getBatteryLevel(now) * SEGMENTS);
  const blocks = '\u2588'.repeat(filled) + '\u2591'.repeat(SEGMENTS - filled);

  return (
    <div className={styles.stillsuit}>
      <span className={styles.stillsuitTime}>{formatTime(now)}</span>
      <span className={styles.stillsuitBattery}>
        <span className={styles.batteryBracket}>[</span>
        {blocks}
        <span className={styles.batteryBracket}>]</span>
      </span>
    </div>
  );
}

const PDOOM_ENTRIES = [
  'p(doom) = 12.%',
  'p(doom) (optimism) = 1.0%',
  'p(doom) (pessimism) = 28.9%',
];

function PDoom() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % PDOOM_ENTRIES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.pdoom}>
      <span className={styles.pdoomValue}>{PDOOM_ENTRIES[index]}</span>
    </div>
  );
}

export function PageHeader() {
  const { currentIndex } = useNavigation();
  const currentPage = PAGES[currentIndex];

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.pageIndicator}>
          <span className={styles.hexIndex}>
            {toHex(currentIndex)}
          </span>
          <span className={styles.separator}>—</span>
          <span className={styles.pageTitle}>{currentPage.title}</span>
        </div>
        <StackCanary key={currentIndex} />
      </div>
      <PDoom />
      <StillsuitBattery />
    </header>
  );
}
