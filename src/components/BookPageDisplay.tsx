'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import type { AyahData } from '@/lib/quranApi';
import { toColoredSegments } from '@/lib/tajweed';
import type { TajweedColor } from '@/lib/tajweed';
import { splitTextAtWaqf, WAQF_COLORS } from '@/lib/waqf';
import { usePageTurn } from '@/lib/PageTurnContext';


interface BookPageDisplayProps {
  ayahs: AyahData[];
  translationAyahs?: AyahData[];
  pageNumber: number;
  locale: string;
  prevPageFirst?: AyahData | null;
  nextPageFirst?: AyahData | null;
  arabicFontScale?: number;
  pinnedId: string | null;
  onPinAyah: (ayah: AyahData) => void;
  onUnpinAyah: () => void;
}

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toArabicNumeral(n: number): string {
  return String(n).replace(/\d/g, d => EASTERN_ARABIC_DIGITS[parseInt(d, 10)]);
}

function stripBismillah(text: string): string {
  if (!text.startsWith(BISMILLAH)) return text;
  const rest = text.slice(BISMILLAH.length);
  return rest.startsWith(' ') ? rest.slice(1) : rest;
}

const TAJWEED_COLORS: Record<TajweedColor, string> = {
  red: '#e74c3c',
  green: '#27ae60',
  blue: '#2980b9',
  orange: '#e67e22',
  purple: '#8e44ad',
  brown: '#a0522d',
};

function renderSegmented(text: string) {
  const waqfParts = splitTextAtWaqf(text);
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const part of waqfParts) {
    if (part.waqf) {
      elements.push(
        <span
          key={key++}
          className="inline-flex items-center justify-center mx-0.5"
          style={{ color: WAQF_COLORS[part.waqf.color] }}
          title={`${part.waqf.name}: ${part.waqf.meaning}`}
        >
          {part.text}
        </span>
      );
    } else {
      const segments = toColoredSegments(part.text);
      for (const seg of segments) {
        elements.push(
          seg.color
            ? <span key={key++} style={{ color: TAJWEED_COLORS[seg.color] }}>{seg.text}</span>
            : <span key={key++}>{seg.text}</span>
        );
      }
    }
  }

  return elements;
}

export default function BookPageDisplay({ ayahs, translationAyahs, pageNumber, locale, prevPageFirst, nextPageFirst, arabicFontScale = 1, pinnedId, onPinAyah, onUnpinAyah }: BookPageDisplayProps) {
  const t = useTranslations('Sidebar');
  const pinnedRef = useRef(pinnedId);
  pinnedRef.current = pinnedId;

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const { navigate } = usePageTurn();

  const handleVerseClick = useCallback((ayah: AyahData, e: React.MouseEvent) => {
    if (!ayah.surah) return;
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    const id = `${ayah.surah.number}:${ayah.numberInSurah}`;
    if (pinnedId === id) {
      onUnpinAyah();
    } else {
      onPinAyah(ayah);
    }
  }, [pinnedId, onPinAyah, onUnpinAyah]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      if (e.key === 'ArrowLeft' && nextPageFirst?.surah) {
        e.preventDefault();
        navigate('next', `${prefix}/${nextPageFirst.surah.number}:${nextPageFirst.numberInSurah}`);
        return;
      }
      if (e.key === 'ArrowRight' && prevPageFirst?.surah) {
        e.preventDefault();
        navigate('prev', `${prefix}/${prevPageFirst.surah.number}:${prevPageFirst.numberInSurah}`);
        return;
      }

      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      e.preventDefault();
      window.getSelection()?.removeAllRanges();
      const currentId = pinnedRef.current;
      const currentIdx = currentId ? ayahs.findIndex(
        a => a.surah && `${a.surah.number}:${a.numberInSurah}` === currentId
      ) : -1;
      const targetIdx = currentIdx >= 0 ? currentIdx : (e.key === 'ArrowDown' ? -1 : ayahs.length);
      const nextIdx = e.key === 'ArrowDown' ? targetIdx + 1 : targetIdx - 1;

      if (nextIdx >= 0 && nextIdx < ayahs.length) {
        const ayah = ayahs[nextIdx];
        if (ayah.surah) onPinAyah(ayah);
        return;
      }

      if (nextIdx >= ayahs.length && e.key === 'ArrowDown' && nextPageFirst?.surah) {
        navigate('next', `${prefix}/${nextPageFirst.surah.number}:${nextPageFirst.numberInSurah}`);
      } else if (nextIdx < 0 && e.key === 'ArrowUp' && prevPageFirst?.surah) {
        navigate('prev', `${prefix}/${prevPageFirst.surah.number}:${prevPageFirst.numberInSurah}`);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [ayahs, onPinAyah, prevPageFirst, nextPageFirst, prefix, navigate]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!pinnedId) return;
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) return;
      const target = e.target as HTMLElement;
      const inContent = target.closest('[data-ayah-content]');
      if (!inContent) return;
      if (!target.closest('[data-ayah]')) {
        onUnpinAyah();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pinnedId, onUnpinAyah]);

  return (
    <div className="w-full mx-auto">
      <div data-ayah-content="true" className="relative bg-[#faf6ef] dark:bg-[#1a1625] rounded-2xl border border-[#e0d5c0] dark:border-[#2a2535] shadow-lg shadow-black/[0.04] overflow-hidden">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#d4c9b4] dark:border-[#3a3545] rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#d4c9b4] dark:border-[#3a3545] rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#d4c9b4] dark:border-[#3a3545] rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#d4c9b4] dark:border-[#3a3545] rounded-br-2xl" />

        <div className="grid grid-cols-3 items-center pt-2 md:pt-5 pb-2 px-4">
          <div className={`text-xs font-serif italic text-[#a09070] dark:text-[#6a6575] tracking-[0.2em] ${pageNumber % 2 === 0 ? '' : 'invisible'}`}>
            {pageNumber % 2 === 0 && (`${t('juz')} ${ayahs[0]?.juz ?? ''}`)}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-[#d4c9b4] dark:bg-[#3a3545]" />
              <span className="text-xs font-serif italic text-[#a09070] dark:text-[#6a6575] tracking-[0.2em]">
                {pageNumber.toString().padStart(3, '0')} | {toArabicNumeral(pageNumber)}
              </span>
              <div className="h-px w-8 bg-[#d4c9b4] dark:bg-[#3a3545]" />
            </div>
          </div>
          <div className={`text-xs font-serif italic text-[#a09070] dark:text-[#6a6575] tracking-[0.2em] text-right ${pageNumber % 2 === 0 ? 'invisible' : ''}`}>
            {pageNumber % 2 !== 0 && (`${t('juz')} ${ayahs[0]?.juz ?? ''}`)}
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-2 text-justify font-arabic" dir="rtl" style={{ fontSize: `calc(1.5rem * ${arabicFontScale} * var(--arabic-mobile-adjust, 1))`, lineHeight: 2.35 }}>
          {ayahs.map((ayah, index) => {
            const showSurahHeader = ayah.surah
              ? ayah.numberInSurah === 1 && (index === 0 || ayahs[index - 1]?.surah?.number !== ayah.surah.number)
              : false;
            const showDecorativeBismillah = showSurahHeader && ayah.surah && ayah.surah.number !== 1 && ayah.surah.number !== 9;

            const activeId = ayah.surah ? `${ayah.surah.number}:${ayah.numberInSurah}` : '';
            const isActive = pinnedId === activeId;

            return (
              <span key={ayah.number}>
                {showSurahHeader && ayah.surah && (
                  <span className="block my-10 text-center w-full" dir="ltr">
                    <span className="block text-2xl font-arabic text-primary leading-relaxed">
                      {ayah.surah.name}
                    </span>
                    <span className="block mt-1 text-[10px] uppercase tracking-[0.15em] text-[#a09070] dark:text-[#6a6575]">
                      {ayah.surah.nameLatin || ayah.surah.englishName} ({ayah.surah.translationName || ayah.surah.englishNameTranslation}) — {ayah.surah.number} ({t('ayahCount', { count: ayah.surah.numberOfAyahs })})
                    </span>
                    {showDecorativeBismillah && (
                      <span className="block mt-6 text-lg sm:text-xl md:text-2xl font-arabic text-primary/60 leading-[2]">
                        {renderSegmented(BISMILLAH)}
                      </span>
                    )}
                  </span>
                )}

                {index > 0 && ayah.juz !== ayahs[index - 1].juz && (
                  <span className="block my-6 text-center w-full" dir="ltr">
                    <span className="text-[10px] font-semibold text-[#a09070] dark:text-[#6a6575] tracking-[0.15em] uppercase">
                      {t('juz')} {ayah.juz}
                    </span>
                    <div className="mt-1 h-px bg-[#d4c9b4] dark:bg-[#3a3545]" />
                  </span>
                )}

                <span
                  data-ayah={activeId || undefined}
                  className={`cursor-pointer py-1.5 ${isActive ? 'bg-primary/10 rounded-sm' : ''}`}
                  onClick={(e) => handleVerseClick(ayah, e)}
                >
                  <span className="text-[#1a1a1a] dark:text-[#e0d8c8]">{renderSegmented(showDecorativeBismillah ? stripBismillah(ayah.text) || ayah.text : ayah.text)}</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 font-arabic text-sm font-bold text-[#8a7a5a] dark:text-[#8a8595] bg-[#e8dcc8]/60 dark:bg-[#3a3545] rounded-full pointer-events-none mx-0.5 align-middle" style={{ fontSize: '0.875rem', lineHeight: 1 }}>
                    {toArabicNumeral(ayah.numberInSurah)}
                  </span>
                </span>
              </span>
            );
          })}
        </div>

        <div className="text-center pb-10 pt-4 px-4">
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-8 bg-[#d4c9b4] dark:bg-[#3a3545]" />
            <span className="text-xs font-serif italic text-[#a09070] dark:text-[#6a6575] tracking-[0.2em]">
              {pageNumber.toString().padStart(3, '0')} | {toArabicNumeral(pageNumber)}
            </span>
            <div className="h-px w-8 bg-[#d4c9b4] dark:bg-[#3a3545]" />
          </div>
        </div>
      </div>
    </div>
  );
}
