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
  // TODO: Replace with your projects
  {
    name: 'SecureVault',
    link: 'https://github.com/yourusername/securevault',
    description: 'End-to-end encrypted password manager with zero-knowledge architecture.',
    tags: ['Rust', 'Cryptography', 'WebAssembly'],
    highlights: ['Featured on Hacker News', '500+ GitHub stars'],
  },
  {
    name: 'NetGuard',
    link: 'https://github.com/yourusername/netguard',
    description: 'Network intrusion detection system using machine learning.',
    tags: ['Python', 'TensorFlow', 'Network Security'],
  },
  {
    name: 'AuthKit',
    description: 'Open-source authentication library with OAuth2 and OIDC support.',
    tags: ['TypeScript', 'Node.js', 'OAuth'],
    highlights: ['Used by 50+ companies'],
  },
  {
    name: 'CryptoChat',
    description: 'Decentralized messaging app with perfect forward secrecy.',
    tags: ['Go', 'libp2p', 'Signal Protocol'],
  },
];

export function ProjectsPage() {
  return (
    <section className={styles.page}>
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
    </section>
  );
}
