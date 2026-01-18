'use client';

import styles from './pages.module.css';

export function ContactPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SIETCH</span>
        <span className={styles.siteDefinition}>the Fremen term for a community or village</span>
      </div>
      <h2 className={styles.sectionTitle}>CONTACT</h2>

      <div className={styles.contactContent}>
        <p className={styles.paragraph}>
          {/* TODO: Replace with your contact message */}
          The best way to reach me is via email. I typically respond within 24-48 hours.
        </p>

        <div className={styles.contactLinks}>
          <a
            href="mailto:your.email@example.com"
            className={styles.contactLink}
          >
            {/* TODO: Update email */}
            your.email@example.com
          </a>

          <div className={styles.socialLinks}>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {/* TODO: Update GitHub */}
              GitHub
            </a>
            <span className={styles.separator}>•</span>
            <a
              href="https://linkedin.com/in/yourusername"
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
        <span className={styles.quoteText}>&quot;Quote goes here.&quot;</span>
        <span className={styles.quoteAttribution}>— Author</span>
      </div>
    </section>
  );
}
