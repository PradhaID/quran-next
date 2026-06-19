import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getSurah, getPage, getPageTranslation, getAllSurahs, TOTAL_SURAHS, TOTAL_PAGES } from '@/lib/quranApi';
import QuranReader from '@/components/QuranReader';
import SiteNav from '@/components/SiteNav';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string; surahId: string }>;
}): Promise<Metadata> {
  const { locale, surahId } = await params;
  const decodedId = decodeURIComponent(surahId);
  const surahNum = parseInt(decodedId.split(':')[0], 10);

  if (isNaN(surahNum) || surahNum < 1 || surahNum > TOTAL_SURAHS) {
    return { title: 'Not Found' };
  }

  const surah = await getSurah(surahNum);
  const name = locale === 'id'
    ? (surah as any).name_latin || surah.englishName
    : surah.englishName;

  return {
    title: `${name} — ${surah.number}`,
    description: `Read Surah ${name} (${surah.number}) with translation and tajweed color coding.`,
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
    getPage(pageNumber),
    getPageTranslation(pageNumber, locale),
    pageNumber > 1
      ? getPage(pageNumber - 1).then(p => p.ayahs[0]).catch(() => null)
      : Promise.resolve(null),
    pageNumber < TOTAL_PAGES
      ? getPage(pageNumber + 1).then(p => p.ayahs[0]).catch(() => null)
      : Promise.resolve(null),
  ]);

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
