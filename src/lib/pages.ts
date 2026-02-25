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
  { key: 'landing',  title: 'LANDING',    component: LandingPage,    processState: 'RUNNING'  },
  { key: 'purpose',  title: 'PURPOSE',    component: PurposePage,    processState: 'RUNNING'  },
  { key: 'work',     title: 'EXPERIENCE', component: ExperiencePage, processState: 'SLEEPING' },
  { key: 'projects', title: 'PROJECTS',   component: ProjectsPage,   processState: 'SLEEPING' },
  { key: 'skills',   title: 'SKILLS',     component: SkillsPage,     processState: 'RUNNING'  },
  { key: 'tutoring', title: 'TUTORING',   component: TutoringPage,   processState: 'WAITING'  },
  { key: 'blog',     title: 'BLOG',       component: BlogPage,       processState: 'SLEEPING' },
  { key: 'reviews',  title: 'REVIEWS',    component: ReviewsPage,    processState: 'IDLE'     },
  { key: 'youtube',  title: 'YOUTUBE',    component: YouTubePage,    processState: 'DAEMON'   },
  { key: 'resume',   title: 'RESUME',     component: ResumePage,     processState: 'STOPPED'  },
  { key: 'contact',  title: 'CONTACT',    component: ContactPage,    processState: 'WAITING'  },
];

export const TOTAL_PAGES = PAGES.length;
