import clientPromise from '@/lib/mongodb';

export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  translationName?: string;
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
  translationName?: string;
}

export const TOTAL_PAGES = 604;
export const TOTAL_SURAHS = 114;

interface SurahDoc {
  _id?: string;
  number: number;
  name: string;
  name_latin: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  text: Record<string, string>;
  pages: Record<string, number>;
  juzs: Record<string, number>;
  translations?: {
    en?: { name: string; text: Record<string, string> };
    id?: { name: string; text: Record<string, string> };
  };
}

function docToSurahInfo(doc: SurahDoc, locale?: string): SurahInfo {
  const info: SurahInfo = {
    number: doc.number,
    name: doc.name,
    englishName: doc.englishName,
    englishNameTranslation: doc.englishNameTranslation,
    numberOfAyahs: doc.numberOfAyahs,
    revelationType: doc.revelationType,
  };
  if (locale && doc.translations) {
    const lang = locale === 'id' ? 'id' : 'en';
    info.translationName = doc.translations[lang]?.name || doc.englishNameTranslation;
  }
  return info;
}

function docToAyahs(doc: SurahDoc): AyahData[] {
  const info = docToSurahInfo(doc);
  return Object.entries(doc.text).map(([numStr, text]) => {
    const numberInSurah = parseInt(numStr, 10);
    return {
      number: numberInSurah,
      text,
      numberInSurah,
      juz: doc.juzs?.[numStr] ?? 1,
      page: doc.pages?.[numStr] ?? 1,
      surah: info,
    };
  });
}

function docToTranslationAyahs(doc: SurahDoc, locale: string): AyahData[] {
  const trans = doc.translations?.[locale === 'id' ? 'id' : 'en'];
  if (!trans) return [];

  const info = docToSurahInfo(doc, locale);
  return Object.entries(trans.text).map(([numStr, text]) => {
    const numberInSurah = parseInt(numStr, 10);
    return {
      number: numberInSurah,
      text,
      numberInSurah,
      juz: doc.juzs?.[numStr] ?? 1,
      page: doc.pages?.[numStr] ?? 1,
      surah: info,
    };
  });
}

export async function getSurah(surahNum: number, locale?: string): Promise<SurahResponse> {
  const client = await clientPromise;
  const db = client.db();
  const doc = await db.collection('surahs').findOne<SurahDoc>({ number: surahNum });
  if (!doc) throw new Error(`Surah ${surahNum} not found`);
  return {
    ...docToSurahInfo(doc, locale),
    ayahs: docToAyahs(doc),
  };
}

export async function getSurahTranslation(surahNum: number, locale: string): Promise<PageResponse | null> {
  const client = await clientPromise;
  const db = client.db();
  const doc = await db.collection('surahs').findOne<SurahDoc>({ number: surahNum });
  if (!doc) return null;
  const ayahs = docToTranslationAyahs(doc, locale);
  if (ayahs.length === 0) return null;
  return { number: surahNum, ayahs };
}

export async function getPage(pageNumber: number, locale?: string): Promise<PageResponse> {
  const client = await clientPromise;
  const db = client.db();
  const docs = await db.collection('surahs').find<SurahDoc>(
    {},
    { projection: { number: 1, name: 1, englishName: 1, englishNameTranslation: 1, numberOfAyahs: 1, revelationType: 1, text: 1, pages: 1, juzs: 1, 'translations.en.name': 1, 'translations.id.name': 1 } },
  ).toArray();

  const ayahs: AyahData[] = [];
  for (const doc of docs) {
    const info = docToSurahInfo(doc, locale);
    for (const [numStr, text] of Object.entries(doc.text)) {
      const numberInSurah = parseInt(numStr, 10);
      if ((doc.pages?.[numStr] ?? 1) === pageNumber) {
        ayahs.push({
          number: numberInSurah,
          text,
          numberInSurah,
          juz: doc.juzs?.[numStr] ?? 1,
          page: pageNumber,
          surah: info,
        });
      }
    }
  }

  return { number: pageNumber, ayahs };
}

export async function getPageTranslation(pageNumber: number, locale: string): Promise<PageResponse | null> {
  const client = await clientPromise;
  const db = client.db();
  const docs = await db.collection('surahs').find<SurahDoc>(
    {},
    { projection: { number: 1, name: 1, englishName: 1, englishNameTranslation: 1, numberOfAyahs: 1, revelationType: 1, pages: 1, juzs: 1, translations: 1 } },
  ).toArray();

  const lang = locale === 'id' ? 'id' : 'en';
  const ayahs: AyahData[] = [];

  for (const doc of docs) {
    const trans = doc.translations?.[lang];
    if (!trans) continue;

    const info = docToSurahInfo(doc);
    for (const [numStr, text] of Object.entries(trans.text)) {
      const numberInSurah = parseInt(numStr, 10);
      if ((doc.pages?.[numStr] ?? 1) === pageNumber) {
        ayahs.push({
          number: numberInSurah,
          text,
          numberInSurah,
          juz: doc.juzs?.[numStr] ?? 1,
          page: pageNumber,
          surah: info,
        });
      }
    }
  }

  if (ayahs.length === 0) return null;
  return { number: pageNumber, ayahs };
}

export function isValidPage(page: number): boolean {
  return page >= 1 && page <= TOTAL_PAGES;
}

export interface SurahListItem {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  translationName?: string;
}

export async function getAllSurahs(locale?: string): Promise<SurahListItem[]> {
  const client = await clientPromise;
  const db = client.db();
  const docs = await db.collection('surahs').find<SurahDoc>(
    {},
    { projection: { number: 1, name: 1, englishName: 1, englishNameTranslation: 1, numberOfAyahs: 1, revelationType: 1, 'translations.en.name': 1, 'translations.id.name': 1 } },
  ).sort({ number: 1 }).toArray();
  return docs.map(d => docToSurahInfo(d, locale));
}
