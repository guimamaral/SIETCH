'use client';

import styles from './pages.module.css';

interface WorkEntry {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

const workExperience: WorkEntry[] = [
  // TODO: Replace with your work experience
  {
    role: 'System Software Engieer',
    company: 'NVIDIA Corporation',
    dates: 'July 2026',
    bullets: [
      'Incoming :)',
      'RTOS & Hypervisor for Autonomous Vehicles'
    ],
  },
  
  {
    role: 'Private Tutor',
    company: 'N/A',
    dates: 'April 2023 – Present',
    bullets: [
      'https://www.wyzant.com/Tutors/CSHelpByGui'
    ],
  },
  {
    role: 'System Software Engieer Intern',
    company: 'NVIDIA Corporation',
    dates: 'May 2025 – August 2025',
    bullets: [
      'RTOS & Hypervisor for Autonomous Vehicles'
    ],
  },
  {
    role: 'Systems Software Engineer Intern',
    company: 'NVIDIA Corporation',
    dates: 'May 2024 – August 2024',
    bullets: [
      'RTOS & Hypervisor for Autonomous Vehicles',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Futurehouse.ai',
    dates: 'September 2023 – December 2023',
    bullets: [
      'AI-powered Sales & Lead Generation'
    ],
  },
];

export function WorkExperiencePage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>GOM JABBAR</span>
        <span className={styles.siteDefinition}>a poisoned needle used by the Bene Gesserit to test if someone possesses the human ability to overcome instinct and fear</span>
      </div>
      <h2 className={styles.sectionTitle}>WORK EXPERIENCE</h2>

      <div className={styles.entryList}>
        {workExperience.map((entry, index) => (
          <article key={index} className={styles.entry}>
            <header className={styles.entryHeader}>
              <span className={styles.entryTitle}>
                {entry.role} — {entry.company}
              </span>
              <span className={styles.entryDates}>{entry.dates}</span>
            </header>
            <ul className={styles.entryBullets}>
              {entry.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Highly organized research is guaranteed to produce nothing new.&quot;</span>
        <span className={styles.quoteAttribution}>— Pardot Kynes</span>
      </div>
    </section>
  );
}
