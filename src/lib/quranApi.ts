const BASE_URL = 'https://api.alquran.cloud/v1';

export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface AyahData {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  surah?: SurahInfo;
}

interface PageResponse {
  number: number;
  ayahs: AyahData[];
}

export interface SurahResponse {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: AyahData[];
}

export const TOTAL_PAGES = 604;

export async function getPage(pageNumber: number, retries = 2): Promise<PageResponse> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${BASE_URL}/page/${pageNumber}/ar`, {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
    if (attempt < retries) {
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error(`Failed to fetch page ${pageNumber}`);
}

interface EditionMap {
  [key: string]: string;
}

const editionMap: EditionMap = {
  en: 'en.sahih',
  id: 'id.indonesian',
};

export async function getPageTranslation(pageNumber: number, locale: string): Promise<PageResponse | null> {
  const edition = editionMap[locale];
  if (!edition) return null;

  const res = await fetch(`${BASE_URL}/page/${pageNumber}/${edition}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function getSurah(surahNum: number): Promise<SurahResponse> {
  const res = await fetch(`${BASE_URL}/surah/${surahNum}/ar`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch surah ${surahNum}`);
  const json = await res.json();
  if (!json.data) throw new Error(json.data?.error || 'Unknown error');
  return json.data;
}

export async function getSurahTranslation(surahNum: number, locale: string): Promise<PageResponse | null> {
  const edition = editionMap[locale];
  if (!edition) return null;
  const res = await fetch(`${BASE_URL}/surah/${surahNum}/${edition}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export function isValidPage(page: number): boolean {
  return page >= 1 && page <= TOTAL_PAGES;
}

export const TOTAL_SURAHS = 114;

export interface SurahListItem {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export async function getAllSurahs(): Promise<SurahListItem[]> {
  const res = await fetch(`${BASE_URL}/surah`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error('Failed to fetch surah list');
  const json = await res.json();
  return json.data || [];
}
