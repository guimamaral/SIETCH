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
    role: 'Senior Software Engineer',
    company: 'Example Corp',
    dates: 'Jan 2022 – Present',
    bullets: [
      'Led security architecture for cloud-native platform serving 10M+ users',
      'Implemented zero-trust networking reducing attack surface by 60%',
      'Mentored team of 5 engineers on secure development practices',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Startup Inc',
    dates: 'Jun 2019 – Dec 2021',
    bullets: [
      'Built authentication microservice handling 1M+ daily requests',
      'Designed and implemented end-to-end encryption for messaging feature',
      'Reduced API response time by 40% through query optimization',
    ],
  },
  {
    role: 'Security Intern',
    company: 'Big Tech Co',
    dates: 'May 2018 – Aug 2018',
    bullets: [
      'Conducted security audits on internal tooling',
      'Developed automated vulnerability scanning pipeline',
    ],
  },
];

export function WorkExperiencePage() {
  return (
    <section className={styles.page}>
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
    </section>
  );
}
