'use client';

import styles from './pages.module.css';

export function TutoringPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SIETCH</span>
        <span className={styles.siteDefinition}>the Fremen term for a community or village</span>
      </div>
      <h2 className={styles.sectionTitle}>TUTORING</h2>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>What I Teach</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your tutoring topics */}
          <li>Computer Science fundamentals (Data Structures, Algorithms)</li>
          <li>Systems Programming (C, Rust, Operating Systems)</li>
          <li>Security concepts and practices</li>
          <li>Technical interview preparation (FAANG-style)</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Who It&apos;s For</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your target audience */}
          <li>University students (CS majors, all levels)</li>
          <li>Career changers entering tech</li>
          <li>Engineers preparing for technical interviews</li>
          <li>Self-taught developers looking to solidify fundamentals</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Track Record</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your metrics */}
          <li>200+ hours of 1-on-1 tutoring</li>
          <li>15+ students placed at top tech companies</li>
          <li>4.9/5.0 average rating</li>
        </ul>
      </div>

      <div className={styles.ctaSection}>
        <p className={styles.paragraph}>
          Interested in working together?
        </p>
        <a
          href="mailto:your.email@example.com?subject=Tutoring Inquiry"
          className={styles.ctaButton}
        >
          {/* TODO: Update email */}
          Get in Touch →
        </a>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Quote goes here.&quot;</span>
        <span className={styles.quoteAttribution}>— Author</span>
      </div>
    </section>
  );
}
