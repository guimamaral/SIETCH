'use client';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hints}>
        <span className={styles.hint}>USE ARROW KEYS TO NAVIGATE</span>
        <span className={styles.hintSeparator}>•</span>
        <span className={styles.hint}>SPACE TO TOGGLE THEME</span>
      </div>

      <div className={styles.links}>
        {/* TODO: Update these links with your actual URLs */}
        <a
          href="mailto:your.email@example.com"
          className={styles.link}
        >
          EMAIL
        </a>
        <span className={styles.linkSeparator}>•</span>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GITHUB
        </a>
        <span className={styles.linkSeparator}>•</span>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LINKEDIN
        </a>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} GUILHERME AMARAL
      </div>
    </footer>
  );
}
