'use client';

import { YouTubeVideo } from '@/types';
import { CHANNEL_URL } from '@/lib/youtube';
import { formatDate } from '@/lib/format';
import styles from './pages.module.css';

interface YouTubePageProps {
  videos?: YouTubeVideo[];
}

export function YouTubePage({ videos = [] }: YouTubePageProps) {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>HOLTZMAN EFFECT</span>
        <span className={styles.siteDefinition}>the field-generating technology behind personal shields, suspensors, and foldspace engines that shaped warfare and travel across the known universe</span>
      </div>
      <h2 className={styles.sectionTitle}>YOUTUBE</h2>

      <div className={styles.youtubeChannel}>
        <h3 className={styles.subsectionTitle}>DoomerDiaries</h3>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.youtubeChannelLink}
        >
          VIEW CHANNEL
        </a>
      </div>

      {videos.length === 0 ? (
        <p className={styles.emptyState}>No videos available. Check back soon.</p>
      ) : (
        <div className={styles.youtubeGrid}>
          {videos.map((video) => (
            <article key={video.videoId} className={styles.youtubeCard}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                className={styles.youtubeEmbed}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              <h4 className={styles.youtubeVideoTitle}>{video.title}</h4>
              <span className={styles.youtubeVideoDate}>{formatDate(video.publishedAt)}</span>
            </article>
          ))}
        </div>
      )}

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;There is no escape—we pay for the violence of our ancestors.&quot;</span>
        <span className={styles.quoteAttribution}>— Paul Atreides</span>
      </div>
    </section>
  );
}
