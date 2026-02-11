'use client';

import styles from './pages.module.css';

interface Project {
  name: string;
  link?: string;
  description: string;
  tags: string[];
  highlights?: string[];
}

const projects: Project[] = [
  {
    name: 'gheithOS',
    link: 'https://github.com/yourusername/securevault',
    description: 'a monolithic kernel for the AArch64 architecture targeted at a Raspberry Pi 4b',
    tags: ['Rust', 'C++', 'AArch64'],
    highlights: ['cool features'],
  },
];

export function ProjectsPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>BUTLERIAN JIHAD</span>
        <span className={styles.siteDefinition}>the crusade against computers, thinking machines, and conscious robots</span>
      </div>
      <h2 className={styles.sectionTitle}>PROJECTS</h2>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <article key={index} className={styles.project}>
            <h3 className={styles.projectName}>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.name} →
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.tagList}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            {project.highlights && (
              <ul className={styles.projectHighlights}>
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;The people who can destroy a thing, they control it.&quot;</span>
        <span className={styles.quoteAttribution}>— Paul Atreides</span>
      </div>
    </section>
  );
}
