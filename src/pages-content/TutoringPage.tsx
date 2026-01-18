'use client';

import styles from './pages.module.css';

export function TutoringPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SHAI-HULUD</span>
        <span className={styles.siteDefinition}>the Fremen term for the sandworm of Arrakis</span>
      </div>
      <h2 className={styles.sectionTitle}>TUTORING</h2>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>What I Teach</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your tutoring topics */}
          <li>AP Computer Science A (Java)</li>
          <li>AP Computer Science Principles</li>
          <li>IB Computer Science</li>
          <li>Introductory Programming (Python, Java, C/C++)</li>
          <li>Data Structures & Algorithms</li>
          <li>Systems Programming (C/C++)</li>
          <li>Operating Systems (C/C++)</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Who It&apos;s For</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your target audience */}
          <li>High-School students</li>
          <li>University students</li>
          <li>Engineers preparing for technical interviews</li>
          <li>Self-taught developers looking to solidify fundamentals</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Track Record</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your metrics */}
          <li>1,000+ hours tutored (660+ on Wyzant)</li>
          <li>60+ students</li>
          <li>5.0 Star Rating</li>
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
        <span className={styles.quoteText}>&quot;Proper teaching is recognized with ease. 
                                                You can know it without fail because it awakens within you that sensation which tells you this is something you have always known.&quot;</span>
        <span className={styles.quoteAttribution}>— Frank Herbert</span>
      </div>
    </section>
  );
}
