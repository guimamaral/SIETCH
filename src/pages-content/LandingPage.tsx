'use client';

import Image from 'next/image';
import styles from './pages.module.css';

export function LandingPage() {
  return (
    <section className={styles.landing}>
      <div className={styles.landingContent}>
        <div className={styles.landingMain}>
          <div className={styles.siteTitle}>
            <span className={styles.siteName}>SIETCH</span>
            <span className={styles.siteDefinition}>the Fremen term for a community or village</span>
          </div>
          <h1 className={styles.heroName}>
            GUILHERME AMARAL
          </h1>
          <p className={styles.heroSubtitle}>
            Aspiring John Connor
          </p>
          <div className={styles.heroIntro}>
            <p><strong>Academically,</strong> I am a senior at the University of Texas at Austin studying computer science.</p>
            <p><strong>Professionally,</strong> I am an incoming System Software Engineer at NVIDIA. I also tutor on the side.</p>
            <p><strong>Fundamentally,</strong> I hate bullies and tyrants (with a passion).</p>
          </div>
          <p className={styles.heroHint}>
            Use arrow keys to navigate
          </p>
        </div>

        <div className={styles.quoteSection}>
          <span className={styles.quoteText}>&quot;I must not fear. Fear is the mind-killer.
              Fear is the little-death that brings total obliteration.
              I will face my fear. I will permit it to pass over me and through me.
              And when it has gone past I will turn the inner eye to see its path.
              Where the fear has gone there will be nothing.
              Only I will remain.&quot;</span>
          <span className={styles.quoteAttribution}>— Paul Atreides</span>
        </div>
      </div>

      <div className={styles.landingPhoto}>
        <Image
          src="/me-and-bro.png"
          alt="Guilherme and his brother"
          fill
          sizes="42vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
      </div>
    </section>
  );
}
