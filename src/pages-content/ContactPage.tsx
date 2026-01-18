'use client';

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
          {/* TODO: Replace with your contact message */}
          The best way to reach me is via email. I typically respond within 24 - 48 hours.
        </p>

        <div className={styles.contactLinks}>
          <a
            href="mailto:your.email@example.com"
            className={styles.contactLink}
          >
            {/* TODO: Update email */}
            guim.amaral2004@gmail.com
          </a>

          <div className={styles.socialLinks}>
            <a
              href="https://github.com/guimamaral"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {/* TODO: Update GitHub */}
              GitHub
            </a>
            <span className={styles.separator}>•</span>
            <a
              href="https://linkedin.com/in/guimamaral"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {/* TODO: Update LinkedIn */}
              LinkedIn
            </a>
          </div>
        </div>

        <p className={styles.location}>
          {/* TODO: Update location (optional) */}
          Based in Austin, TX
        </p>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Survival is the ability to swim in strange water.&quot;</span>
        <span className={styles.quoteAttribution}>— Lady Jessica</span>
      </div>
    </section>
  );
}
