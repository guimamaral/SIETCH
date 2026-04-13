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
    x: process.env.NEXT_PUBLIC_X_URL ?? '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? '',
    wyzant: process.env.NEXT_PUBLIC_WYZANT_URL ?? '',
    spotify: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? '',
    sos: process.env.NEXT_PUBLIC_SOS_URL ?? '',
  },

  location: process.env.NEXT_PUBLIC_LOCATION ?? '',
  currentlyReading: process.env.NEXT_PUBLIC_CURRENTLY_READING ?? '',
};

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'theme',
} as const;
