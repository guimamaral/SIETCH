import { PageConfig } from '@/types';
import {
  LandingPage,
  PurposePage,
  ExperiencePage,
  ProjectsPage,
  SkillsPage,
  TutoringPage,
  BlogPage,
  ReviewsPage,
  YouTubePage,
  ResumePage,
  ContactPage,
} from '@/pages-content';

/**
 * Pages registry - Single source of truth for all navigation
 * The array order defines the navigation order.
 */
export const PAGES: PageConfig[] = [
  { key: 'landing', title: 'LANDING', component: LandingPage },
  { key: 'purpose', title: 'PURPOSE', component: PurposePage },
  { key: 'work', title: 'EXPERIENCE', component: ExperiencePage },
  { key: 'projects', title: 'PROJECTS', component: ProjectsPage },
  { key: 'skills', title: 'SKILLS', component: SkillsPage },
  { key: 'tutoring', title: 'TUTORING', component: TutoringPage },
  { key: 'blog', title: 'BLOG', component: BlogPage },
  { key: 'reviews', title: 'REVIEWS', component: ReviewsPage },
  { key: 'youtube', title: 'YOUTUBE', component: YouTubePage },
  { key: 'resume', title: 'RESUME', component: ResumePage },
  { key: 'contact', title: 'CONTACT', component: ContactPage },
];

export const TOTAL_PAGES = PAGES.length;

/**
 * Get page config by index
 */
export function getPageByIndex(index: number): PageConfig | undefined {
  return PAGES[index];
}

/**
 * Get page config by key
 */
export function getPageByKey(key: string): { page: PageConfig; index: number } | undefined {
  const index = PAGES.findIndex((p) => p.key === key);
  if (index === -1) return undefined;
  return { page: PAGES[index], index };
}
