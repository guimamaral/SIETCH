'use client';

import styles from './pages.module.css';

export function ResumePage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>MENTAT</span>
        <span className={styles.siteDefinition}>a person trained to mimic the cognitive and analytical ability of computers, serving as combative strategists and advisors to the great houses</span>
      </div>
      <h2 className={styles.sectionTitle}>RESUME</h2>

      <div className={styles.resumeContent}>
        <iframe
          src="/Resume_LaTeX_Compute.pdf"
          className={styles.resumeEmbed}
          title="Resume"
        />
        <a
          href="Resume_LaTeX_Compute.pdf"
          download
          className={styles.resumeDownload}
        >
          DOWNLOAD PDF
        </a>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;No more terrible disaster could befall your people than for them to fall into the hands of a Hero.&quot;</span>
        <span className={styles.quoteAttribution}>— Pardot Kynes</span>
      </div>
    </section>
  );
}
