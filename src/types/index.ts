import { ComponentType } from 'react';

export type ProcessState =
  | 'RUNNING'
  | 'SLEEPING'
  | 'WAITING'
  | 'STOPPED'
  | 'IDLE'
  | 'ZOMBIE'
  | 'DAEMON';

export interface PageConfig {
  key: string;
  title: string;
  component: ComponentType<PageProps>;
  processState: ProcessState;
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
  nullptrActive: boolean;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  goFirst: () => void;
  goLast: () => void;
  goToNull: () => void;
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
