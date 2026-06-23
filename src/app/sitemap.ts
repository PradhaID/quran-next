import type { MetadataRoute } from 'next';
import { TOTAL_SURAHS } from '@/lib/quranApi';
import { buildLessons as buildLevel1 } from '@/lib/iqra/iqra1';
import { buildLessons as buildLevel2 } from '@/lib/iqra/iqra2';
import { buildLessons as buildLevel3 } from '@/lib/iqra/iqra3';
import { buildLessons as buildLevel4 } from '@/lib/iqra/iqra4';
import { buildLessons as buildLevel5 } from '@/lib/iqra/iqra5';
import { buildLessons as buildLevel6 } from '@/lib/iqra/iqra6';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://quran.pradha.id';

const LEVELS: { slug: string; build: (lang: string) => { id: string }[] }[] = [
  { slug: 'iqra-1', build: buildLevel1 },
  { slug: 'iqra-2', build: buildLevel2 },
  { slug: 'iqra-3', build: buildLevel3 },
  { slug: 'iqra-4', build: buildLevel4 },
  { slug: 'iqra-5', build: buildLevel5 },
  { slug: 'iqra-6', build: buildLevel6 },
];

const staticPages = [
  '',
  '/about',
  '/how-to',
  '/contact',
  '/terms',
  '/learning',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const addEntry = (url: string, enUrl: string, idUrl: string) => {
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: enUrl,
          id: idUrl,
        },
      },
    });
  };

  for (const page of staticPages) {
    addEntry(
      `${BASE}${page}`,
      `${BASE}${page}`,
      `${BASE}/id${page}`,
    );
    addEntry(
      `${BASE}/id${page}`,
      `${BASE}${page}`,
      `${BASE}/id${page}`,
    );
  }

  for (const level of LEVELS) {
    const lessons = level.build('en');
    for (const lesson of lessons) {
      const page = `/learning/${level.slug}/${lesson.id}`;
      addEntry(
        `${BASE}${page}`,
        `${BASE}${page}`,
        `${BASE}/id${page}`,
      );
      addEntry(
        `${BASE}/id${page}`,
        `${BASE}${page}`,
        `${BASE}/id${page}`,
      );
    }
  }

  for (let surah = 1; surah <= TOTAL_SURAHS; surah++) {
    entries.push({
      url: `${BASE}/${surah}:1`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${BASE}/${surah}:1`,
          id: `${BASE}/id/${surah}:1`,
        },
      },
    });
    entries.push({
      url: `${BASE}/id/${surah}:1`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${BASE}/${surah}:1`,
          id: `${BASE}/id/${surah}:1`,
        },
      },
    });
  }

  return entries;
}
