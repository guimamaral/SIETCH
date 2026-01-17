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
    skills: ['Rust', 'Go', 'Python', 'TypeScript', 'C/C++', 'Bash'],
  },
  {
    name: 'Systems / Infra',
    skills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Nginx'],
  },
  {
    name: 'Security',
    skills: [
      'Penetration Testing',
      'Cryptography',
      'Network Security',
      'Incident Response',
      'Threat Modeling',
    ],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Wireshark', 'Burp Suite', 'Ghidra', 'Nmap', 'Metasploit'],
  },
];

export function SkillsPage() {
  return (
    <section className={styles.page}>
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
    </section>
  );
}
