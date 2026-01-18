'use client';

import styles from './pages.module.css';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  // TODO: Replace with your skills
  {
    name: 'Languages',
    skills: [
            'AArch64', 
            'RISC-V', 
            'C/C++', 
            'Java', 
            'Python', 
            'Lisp (Clojure, Simply Scheme)'
          ],
  },
  {
    name: 'Systems / Infra',
    skills: [
            'Unix / Linux', 
            'Docker', 
            'EC2'
          ],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Make', 'Valgrind', 'Jira', 'Splunk', 'Gerrit', 'Coverity', 'Jenkins'],
  },
];

export function SkillsPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>THINKING MACHINES</span>
        <span className={styles.siteDefinition}>the artificial intelligence on which humanity came to depend and, 
                                                indeed, become subject to prior to the Butlerian Jihad</span>
      </div>
      <h2 className={styles.sectionTitle}>SKILLS</h2>

      <div className={styles.skillCategories}>
        {skillCategories.map((category) => (
          <div key={category.name} className={styles.skillCategory}>
            <h3 className={styles.skillCategoryName}>{category.name}</h3>
            <div className={styles.skillList}>
              {category.skills.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Arrakis teaches the attitude of the knife - chopping off what&apos;s incomplete and saying: Now, it&apos;s complete because it&apos;s ended here.&quot;</span>
        <span className={styles.quoteAttribution}>— Paul Atreides</span>
      </div>
    </section>
  );
}
