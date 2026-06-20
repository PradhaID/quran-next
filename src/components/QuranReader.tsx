'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { AyahData, SurahListItem } from '@/lib/quranApi';
import BookPageDisplay from './BookPageDisplay';
import PageNavigation from './PageNavigation';
import SwipeNavigator from './SwipeNavigator';
import Sidebar from './Sidebar';

interface QuranReaderProps {
  ayahs: AyahData[];
  translationAyahs?: AyahData[];
  pageNumber: number;
  locale: string;
  prevPageFirst?: AyahData | null;
  nextPageFirst?: AyahData | null;
  allSurahs: SurahListItem[];
  children?: React.ReactNode;
}

function getPinnedFromUrl(ayahs: AyahData[]): number | null {
  const path = window.location.pathname.replace(/\/$/, '');
  const match = path.match(/^\/(?:[a-z]{2}\/)?(\d+):(\d+)$/);
  if (!match) return null;
  const targetSurah = parseInt(match[1], 10);
  const targetAyah = parseInt(match[2], 10);
  const idx = ayahs.findIndex(
    a => a.surah?.number === targetSurah && a.numberInSurah === targetAyah
  );
  return idx >= 0 ? idx : null;
}

export default function QuranReader({
  ayahs,
  translationAyahs,
  pageNumber,
  locale,
  prevPageFirst,
  nextPageFirst,
  allSurahs,
  children,
}: QuranReaderProps) {
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [arabicFontScale, setArabicFontScale] = useState(1);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const prefix = locale === 'en' ? '' : `/${locale}`;

  useEffect(() => {
    const idx = getPinnedFromUrl(ayahs);
    if (idx !== null && ayahs[idx]?.surah) {
      setPinnedId(`${ayahs[idx].surah!.number}:${ayahs[idx].numberInSurah}`);
    }
  }, [ayahs]);

  const filteredAyahs = useMemo(() => {
    if (!search.trim()) return ayahs;
    const q = search.toLowerCase();
    return ayahs.filter((a, i) => {
      if (a.text.toLowerCase().includes(q)) return true;
      const t = translationAyahs?.[i];
      return t && t.text.toLowerCase().includes(q);
    });
  }, [ayahs, translationAyahs, search]);

  const filteredTranslations = useMemo(() => {
    if (!search.trim() || !translationAyahs) return translationAyahs;
    return translationAyahs.filter((t, i) => {
      if (t.text.toLowerCase().includes(search.toLowerCase())) return true;
      return ayahs[i]?.text.toLowerCase().includes(search.toLowerCase());
    });
  }, [ayahs, translationAyahs, search]);

  const surahsFromPage = useMemo(() => {
    return Array.from(
      new Map(ayahs.filter(a => a.surah).map(a => [a.surah!.number, a.surah!])).values()
    );
  }, [ayahs]);

  const pinnedAyah = useMemo(() => {
    if (!pinnedId) return null;
    return ayahs.find(a => a.surah && `${a.surah.number}:${a.numberInSurah}` === pinnedId) ?? null;
  }, [ayahs, pinnedId]);

  const pinnedTranslation = useMemo(() => {
    if (!pinnedAyah || !translationAyahs) return null;
    return translationAyahs.find(
      t => t.surah?.number === pinnedAyah.surah?.number && t.numberInSurah === pinnedAyah.numberInSurah
    ) ?? null;
  }, [pinnedAyah, translationAyahs]);

  const pinAyah = useCallback((ayah: AyahData) => {
    if (!ayah.surah) return;
    const id = `${ayah.surah.number}:${ayah.numberInSurah}`;
    setPinnedId(id);
    const url = `${prefix}/${id}`;
    window.history.replaceState(null, '', url);
    const name = ayah.surah.nameLatin || ayah.surah.englishName;
    document.title = `${name} — Ayah ${ayah.numberInSurah} — Quran`;

    const translation = translationAyahs?.find(
      t => t.surah?.number === ayah.surah?.number && t.numberInSurah === ayah.numberInSurah
    );
    if (translation) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const text = translation.text.replace(/<[^>]*>/g, '').substring(0, 200);
        metaDesc.setAttribute('content', `${name} ${ayah.numberInSurah}: ${text}`);
      }
    }
  }, [prefix, translationAyahs]);

  const unpinAyah = useCallback(() => {
    setPinnedId(null);
    const first = ayahs[0];
    if (first?.surah) {
      const id = `${first.surah.number}:${first.numberInSurah}`;
      window.history.replaceState(null, '', `${prefix}/${id}`);
      const name = first.surah.nameLatin || first.surah.englishName;
      document.title = `${name} — Ayah ${first.numberInSurah} — Quran`;
    }
  }, [ayahs, prefix]);

  const navPrevHref = prevPageFirst?.surah ? `${prefix}/${prevPageFirst.surah.number}:${prevPageFirst.numberInSurah}` : null;
  const navNextHref = nextPageFirst?.surah ? `${prefix}/${nextPageFirst.surah.number}:${nextPageFirst.numberInSurah}` : null;

  return (
    <div className="flex min-h-screen">
      <SwipeNavigator prevHref={navPrevHref} nextHref={navNextHref}>
      <div className="flex-1 flex flex-col items-center p-2 sm:p-4 md:p-6 max-w-3xl mx-auto w-full gap-2 md:gap-2">
        {children}
        <BookPageDisplay
          ayahs={filteredAyahs}
          translationAyahs={filteredTranslations}
          pageNumber={pageNumber}
          locale={locale}
          prevPageFirst={prevPageFirst}
          nextPageFirst={nextPageFirst}
          arabicFontScale={arabicFontScale}
          pinnedId={pinnedId}
          onPinAyah={pinAyah}
          onUnpinAyah={unpinAyah}
        />

        <PageNavigation
          prevAyah={prevPageFirst ?? null}
          nextAyah={nextPageFirst ?? null}
          locale={locale}
        />

        {filteredAyahs.length > 0 && surahsFromPage.length > 0 && (
          <div className="w-full max-w-xl text-center mb-16 md:hidden">
            <p className="text-xs text-foreground/40 mb-3 tracking-wider uppercase">Jump to Surah on this page</p>
            <div className="flex flex-wrap justify-center gap-2">
              {surahsFromPage.map(surah => (
                <a
                  key={surah.number}
                  href={`${prefix}/${surah.number}:1`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary/70 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {surah.number}. {surah.nameLatin || surah.englishName} ({surah.translationName || surah.englishNameTranslation})
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      </SwipeNavigator>

      <Sidebar
        search={search}
        onSearchChange={setSearch}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        surahs={surahsFromPage}
        locale={locale}
        allSurahs={allSurahs}
        arabicFontScale={arabicFontScale}
        onArabicFontScaleChange={setArabicFontScale}
        pinnedAyah={pinnedAyah}
        pinnedTranslation={pinnedTranslation}
        onUnpinAyah={unpinAyah}
      />
    </div>
  );
}
