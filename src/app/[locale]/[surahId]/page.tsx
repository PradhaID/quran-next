import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getSurah, getPage, getPageTranslation, getSurahTranslation, getAllSurahs, TOTAL_SURAHS, TOTAL_PAGES } from '@/lib/quranApi';
import QuranReader from '@/components/QuranReader';
import SiteNav from '@/components/SiteNav';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string; surahId: string }>;
}): Promise<Metadata> {
  const { locale, surahId } = await params;
  const decodedId = decodeURIComponent(surahId);
  const parts = decodedId.split(':');
  const surahNum = parseInt(parts[0], 10);
  const ayahNum = parts.length > 1 ? parseInt(parts[1], 10) : null;

  if (isNaN(surahNum) || surahNum < 1 || surahNum > TOTAL_SURAHS) {
    return { title: 'Not Found' };
  }

  const [surah, translationData] = await Promise.all([
    getSurah(surahNum),
    getSurahTranslation(surahNum, locale).catch(() => null),
  ]);

  const targetAyah = ayahNum
    ? surah.ayahs.find(a => a.numberInSurah === ayahNum)
    : surah.ayahs[0];

  const name = locale === 'id'
    ? (surah as any).name_latin || surah.englishName
    : surah.englishName;

  let description = `Read Surah ${name} (${surah.number}) with translation and tajweed color coding.`;

  if (translationData?.ayahs[0]?.text) {
    const translationAyah = targetAyah
      ? translationData.ayahs.find(a => a.numberInSurah === targetAyah.numberInSurah)
      : translationData.ayahs[0];

    if (translationAyah) {
      const text = translationAyah.text.replace(/<[^>]*>/g, '').substring(0, 200);
      if (text) {
        description = `${name} ${translationAyah.numberInSurah}: ${text}`;
      }
    }
  }

  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://quran.pradha.id';
  const ogUrl = `${BASE}/${locale === 'en' ? '' : `${locale}/`}${surahNum}:${targetAyah?.numberInSurah || 1}/opengraph-image`;

  return {
    title: `${name} — ${surah.number}`,
    description,
    openGraph: {
      description,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      description,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ locale: string; surahId: string }>;
}) {
  const { locale, surahId } = await params;
  setRequestLocale(locale);

  const decodedId = decodeURIComponent(surahId);
  const parts = decodedId.split(':');
  const surahNum = parseInt(parts[0], 10);
  const ayahNum = parts.length > 1 ? parseInt(parts[1], 10) : null;

  if (isNaN(surahNum) || surahNum < 1 || surahNum > TOTAL_SURAHS) {
    notFound();
  }

  const surahData = await getSurah(surahNum);
  const targetAyah = ayahNum
    ? surahData.ayahs.find(a => a.numberInSurah === ayahNum)
    : surahData.ayahs[0];

  if (!targetAyah) notFound();

  const pageNumber = targetAyah.page;

  const [pageData, translationData, prevPageFirst, nextPageFirst] = await Promise.all([
    getPage(pageNumber).catch(() => null),
    getPageTranslation(pageNumber, locale),
    pageNumber > 1
      ? getPage(pageNumber - 1).then(p => p.ayahs[0]).catch(() => null)
      : Promise.resolve(null),
    pageNumber < TOTAL_PAGES
      ? getPage(pageNumber + 1).then(p => p.ayahs[0]).catch(() => null)
      : Promise.resolve(null),
  ]);

  if (!pageData) notFound();

  const ayahs = pageData.ayahs;
  const translationAyahs = translationData?.ayahs;
  const allSurahs = await getAllSurahs();

  return (
    <QuranReader
      ayahs={ayahs}
      translationAyahs={translationAyahs}
      pageNumber={pageNumber}
      locale={locale}
      prevPageFirst={prevPageFirst}
      nextPageFirst={nextPageFirst}
      allSurahs={allSurahs}
    >
      <SiteNav locale={locale} />
    </QuranReader>
  );
}
