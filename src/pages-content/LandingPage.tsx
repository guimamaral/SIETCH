'use client';

import styles from './pages.module.css';

export function LandingPage() {
  return (
    <section className={styles.landing}>
      <h1 className={styles.heroName}>
        {/* TODO: Replace with your name */}
        Your Name
      </h1>
      <p className={styles.heroSubtitle}>
        {/* TODO: Replace with your subtitle */}
        Software Engineer • Security • Systems
      </p>
      <p className={styles.heroHint}>
        Use arrow keys to navigate
      </p>
    </section>
  );
}
