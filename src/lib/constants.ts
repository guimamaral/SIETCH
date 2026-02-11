/**
 * Site-wide constants
 */

export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'SIETCH - Guilherme Amaral',
  description: 'Guilherme Amaral\'s Sietch',
  subtitle: 'Software Engineer • Security • Systems',

  social: {
    email: process.env.NEXT_PUBLIC_EMAIL ?? '',
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? '',
  },

  location: process.env.NEXT_PUBLIC_LOCATION ?? '',
};

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'theme',
} as const;
