import { ComponentType } from 'react';

export interface PageConfig {
  key: string;
  title: string;
  component: ComponentType<PageProps>;
}

export interface PageProps {
  posts?: BlogPostMeta[];
  videos?: YouTubeVideo[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  contentHtml: string;
  draft: boolean;
}

export interface YouTubeVideo {
  videoId: string;
  title: string;
  publishedAt: string;
}

export type Theme = 'light' | 'dark';

export interface NavigationContextValue {
  currentIndex: number;
  totalPages: number;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  goFirst: () => void;
  goLast: () => void;
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
