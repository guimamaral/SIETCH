'use client';

import styles from './pages.module.css';

/* ─── Interfaces ─── */

interface ReviewBase {
  title: string;
  rating: number; // 1-10
  notes?: string;
}

interface BookReview extends ReviewBase {
  author: string;
  genre: string;
  pages: number;
}

interface MovieReview extends ReviewBase {
  director: string;
  runtime: string;
}

interface TelevisionReview extends ReviewBase {
  executiveProducer: string;
  seasons: number;
  episodes: number;
}

/* ─── Inline SVG Icons ─── */

function BookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function MovieIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="12" />
      <line x1="7" y1="2" x2="2" y2="7" />
      <line x1="17" y1="2" x2="12" y2="7" />
      <line x1="22" y1="2" x2="17" y2="7" />
    </svg>
  );
}

function TelevisionIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="15" rx="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

/* ─── Metadata Renderers ─── */

function renderBookMeta(entry: BookReview) {
  return (
    <>
      <span>{entry.author}</span>
      <span className={styles.reviewMetaSep}>&bull;</span>
      <span>{entry.genre}</span>
      <span className={styles.reviewMetaSep}>&bull;</span>
      <span>{entry.pages} pages</span>
    </>
  );
}

function renderMovieMeta(entry: MovieReview) {
  return (
    <>
      <span>{entry.director}</span>
      <span className={styles.reviewMetaSep}>&bull;</span>
      <span>{entry.runtime}</span>
    </>
  );
}

function renderTvMeta(entry: TelevisionReview) {
  return (
    <>
      <span>{entry.executiveProducer}</span>
      <span className={styles.reviewMetaSep}>&bull;</span>
      <span>{entry.seasons} seasons</span>
      <span className={styles.reviewMetaSep}>&bull;</span>
      <span>{entry.episodes} episodes</span>
    </>
  );
}

/* ─── Data ─── */

const books: BookReview[] = [
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    pages: 688,
    rating: 10,
    notes: 'The litany against fear is real.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    pages: 328,
    rating: 9,
    notes: 'Big Brother is watching.',
  },
];

const movies: MovieReview[] = [
  {
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    runtime: '2h 44m',
    rating: 9,
    notes: 'A meditation on what it means to be human.',
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    runtime: '2h 49m',
    rating: 9,
    notes: 'Love is the one thing that transcends time and space.',
  },
];

const television: TelevisionReview[] = [
  {
    title: 'Mr. Robot',
    executiveProducer: 'Sam Esmail',
    seasons: 4,
    episodes: 45,
    rating: 10,
    notes: 'The most technically accurate portrayal of hacking on television.',
  },
  {
    title: 'Breaking Bad',
    executiveProducer: 'Vince Gilligan',
    seasons: 5,
    episodes: 62,
    rating: 10,
    notes: 'The transformation of Walter White is unlike anything else.',
  },
];

/* ─── Categories ─── */

interface ReviewCategoryConfig {
  name: string;
  dataAttr: string;
  icon: React.ReactNode;
  entries: ReviewBase[];
  renderMeta: (entry: never) => React.ReactNode;
}

const categories: ReviewCategoryConfig[] = [
  { name: 'Books', dataAttr: 'books', icon: <BookIcon />, entries: books, renderMeta: renderBookMeta as (entry: never) => React.ReactNode },
  { name: 'Movies', dataAttr: 'movies', icon: <MovieIcon />, entries: movies, renderMeta: renderMovieMeta as (entry: never) => React.ReactNode },
  { name: 'Television', dataAttr: 'television', icon: <TelevisionIcon />, entries: television, renderMeta: renderTvMeta as (entry: never) => React.ReactNode },
];

/* ─── Component ─── */

export function ReviewsPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>CALADAN</span>
        <span className={styles.siteDefinition}>A lush, oceanic planet with a wet, temperate climate, Caladan had served as the Atreides’ home for at least twenty-six generations</span>
      </div>
      <h2 className={styles.sectionTitle}>REVIEWS</h2>

      <div className={styles.reviewCategories}>
        {categories.map((category) => (
          <div key={category.name} className={styles.reviewCategory} data-category={category.dataAttr}>
            <h3 className={styles.reviewCategoryHeader}>
              <span className={styles.reviewCategoryIcon} aria-hidden="true">
                {category.icon}
              </span>
              {category.name}
            </h3>

            {category.entries.length === 0 ? (
              <p className={styles.emptyState}>No reviews yet.</p>
            ) : (
              <div className={styles.reviewList}>
                {category.entries.map((entry, index) => (
                  <article key={index} className={styles.reviewEntry}>
                    <header className={styles.reviewEntryHeader}>
                      <span className={styles.reviewTitle}>{entry.title}</span>
                      <span className={styles.reviewRating}>
                        {entry.rating}<span className={styles.reviewRatingMax}>/10</span>
                      </span>
                    </header>
                    <div className={styles.reviewMeta}>
                      {category.renderMeta(entry as never)}
                    </div>
                    {entry.notes && (
                      <p className={styles.reviewNotes}>&quot;{entry.notes}&quot;</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic.&quot;</span>
        <span className={styles.quoteAttribution}>— Frank Herbert</span>
      </div>
    </section>
  );
}
