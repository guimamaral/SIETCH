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
        <a
          href="https://github.com/guimamaral"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GITHUB
        </a>
        <span className={styles.linkSeparator}>•</span>
        <a
          href="https://www.linkedin.com/in/guimamaral/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LINKEDIN
        </a>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} GUILHERME AMARAL. ALL RIGHTS RESERVED.
      </div>

      <div className={styles.disclaimer}>
        Disclaimer: All content and opinions expressed here are solely my own.
      </div>
    </footer>
  );
}
