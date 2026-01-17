'use client';

import styles from './pages.module.css';

export function LandingPage() {
  return (
    <section className={styles.landing}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SIETCH</span>
        <span className={styles.siteDefinition}>the Fremen term for a community or village</span>
      </div>
      <h1 className={styles.heroName}>
        GUILHERME AMARAL
      </h1>
      <p className={styles.heroSubtitle}>
        {/* TODO: Replace with your subtitle */}
        John Connor / Ted Kaczynski hybrid
      </p>
      <p className={styles.heroHint}>
        Use arrow keys to navigate
      </p>
    </section>
  );
}
