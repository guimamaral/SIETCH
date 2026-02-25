'use client';

import styles from './pages.module.css';

const REGS = `\
 rip: 0x0000000000000000   rsp: 0x00007fff5fbff8a0
 rax: 0x00000000deadbeef   rbx: 0x0000000000000000
 rcx: 0x00007f4a2b1c0000   rdx: 0x0000000000000000
 rsi: 0x0000000000000001   rdi: 0x0000000000000000
 rbp: 0x00007fff5fbff8c0    r8: 0x0000000000000000
  r9: 0x00007f4a2b0fffff   r10: 0x0000000000000246
 r11: 0x0000000000000246   r12: 0x00000000cafebabe
 r13: 0xffffffffffffffff   r14: 0x00007f4a2b1c4000
 r15: 0x0000000000000000`;

export function NullPage() {
  return (
    <section className={styles.nullPage}>
      <div className={styles.crashDump}>
        <span className={styles.crashSignal}>*** SIGSEGV (Segmentation fault) received ***</span>
        <pre className={styles.crashRegs}>{REGS}</pre>
        <span className={styles.crashFault}>Segmentation fault (core dumped)</span>
      </div>

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
