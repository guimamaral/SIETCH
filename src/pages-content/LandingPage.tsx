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
        John Connor / Ted Kaczynski hybrid
      </p>
      <div className={styles.heroIntro}>
        <p><strong>Academically,</strong> I am a senior at the University of Texas at Austin studying computer science.</p>
        <p><strong>Professionally,</strong> I am an incoming System Software Engineer at NVIDIA. I also tutor on the side.</p>
        <p><strong>Fundamentally,</strong> I hate bullies and tyrants (with a passion).</p>
      </div>
      <p className={styles.heroHint}>
        Use arrow keys to navigate
      </p>
    </section>
  );
}
