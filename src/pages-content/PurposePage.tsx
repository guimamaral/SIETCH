'use client';

import styles from './pages.module.css';

export function PurposePage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SIETCH</span>
        <span className={styles.siteDefinition}>the Fremen term for a community or village</span>
      </div>
      <h2 className={styles.sectionTitle}>PURPOSE</h2>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Interests</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your current ventures */}
          <li>Building secure, performant, and mission-critical systems</li>
          <li>Analyzing fragile geopolitical relationships</li>
          <li>Navigating a less than humane world in the presence of superintelligent AI systems</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Aspirations</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your aspirations */}
          <li>Work on frontier AI Safety problems</li>
          <li>Complete a postgraduate degree (in what?)</li>
          <li>Live a fulfilling life (whatever that means)</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Now</h3>
        <p className={styles.paragraph}>
          {/* TODO: Replace with what you're focused on this month */}
          Currently focused on building a monolithic kernel 
          for the AArch64 architecture targeted at a Raspberry Pi 4b.
        </p>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Quote goes here.&quot;</span>
        <span className={styles.quoteAttribution}>— Author</span>
      </div>
    </section>
  );
}
