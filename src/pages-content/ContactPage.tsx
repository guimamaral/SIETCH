'use client';

import { SITE_CONFIG } from '@/lib/constants';
import styles from './pages.module.css';

export function ContactPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SPICE MELANGE</span>
        <span className={styles.siteDefinition}>a naturally produced awareness spectrum narcotic that formed a fundamental block of commerce and technological development in the known universe for millennia</span>
      </div>
      <h2 className={styles.sectionTitle}>CONTACT</h2>

      <div className={styles.contactContent}>
        <p className={styles.paragraph}>
          The best way to reach me is via email. I typically respond within 24 - 48 hours.
        </p>

        <div className={styles.contactLinks}>
          <span className={styles.contactLink}>
            {SITE_CONFIG.social.email}
          </span>

          <div className={styles.socialLinks}>
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <span className={styles.separator}>•</span>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
          </div>
        </div>

        <p className={styles.location}>
          Based in {SITE_CONFIG.location}
        </p>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Survival is the ability to swim in strange water.&quot;</span>
        <span className={styles.quoteAttribution}>— Lady Jessica</span>
      </div>
    </section>
  );
}
