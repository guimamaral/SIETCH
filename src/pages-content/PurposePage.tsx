'use client';

import styles from './pages.module.css';

export function PurposePage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>Lisan al-Gaib</span>
        <span className={styles.siteDefinition}>the Fremen term for their offworld prophet or messiah</span>
      </div>
      <h2 className={styles.sectionTitle}>PURPOSE</h2>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Interests</h3>
        <ul className={styles.list}>
          <li>Building secure, performant, and mission-critical systems</li>
          <li>Analyzing fragile geopolitical relationships</li>
          <li>Navigating a less than humane world in the presence of superintelligent AI systems</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Aspirations</h3>
        <ul className={styles.list}>
          <li>Work on frontier AI Safety problems</li>
          <li>Complete a postgraduate degree (in what?)</li>
          <li>Live a fulfilling life (whatever that means)</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Now</h3>
        <p className={styles.paragraph}>
          Currently, I am focused on learning as much as I can about the technical, strategic, and ethical challenges 
          that arise when living in a world caught in the technological Singularity. My hope is that I can build great resilience for myself
          and my loved ones by creating and maintaining different income streams. 
        </p>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;The mystery of life isn&apos;t a problem to solve, but a reality to experience.&quot;</span>
        <span className={styles.quoteAttribution}>—  Jamis</span>
      </div>
    </section>
  );
}
