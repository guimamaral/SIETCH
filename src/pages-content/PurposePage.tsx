'use client';

import styles from './pages.module.css';

export function PurposePage() {
  return (
    <section className={styles.page}>
      <h2 className={styles.sectionTitle}>PURPOSE</h2>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Current Ventures</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your current ventures */}
          <li>Building secure distributed systems</li>
          <li>Contributing to open-source security tools</li>
          <li>Researching novel cryptographic protocols</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Aspirations</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your aspirations */}
          <li>Make security accessible and usable for everyone</li>
          <li>Bridge the gap between research and practical implementation</li>
          <li>Mentor the next generation of security engineers</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Now</h3>
        <p className={styles.paragraph}>
          {/* TODO: Replace with what you're focused on this month */}
          Currently focused on learning Rust for systems programming and exploring
          zero-knowledge proofs. Reading "Cryptography Engineering" by Ferguson,
          Schneier, and Kohno.
        </p>
      </div>
    </section>
  );
}
