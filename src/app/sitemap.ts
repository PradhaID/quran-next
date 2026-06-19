import type { MetadataRoute } from 'next';
import { TOTAL_SURAHS } from '@/lib/quranApi';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://quran.pradha.id';

const staticPages = ['', '/about', '/how-to'];

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
  }

  return entries;
}
