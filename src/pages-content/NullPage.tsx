'use client';

import styles from './pages.module.css';

export function NullPage() {
  return (
    <section className={styles.nullPage}>
      <p className={styles.nullIntro}>
        You have just dereferenced a pointer with value NULL. Your reward is the following knowledge bite from renowned British computer scientist, Sir Tony Hoare.
      </p>

      <blockquote className={styles.nullQuote}>
        &quot;I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn&apos;t resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.&quot;
      </blockquote>

      <span className={styles.nullAttribution}>&mdash; Tony Hoare</span>
    </section>
  );
}
