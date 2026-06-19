'use client';

import type { AyahData } from '@/lib/quranApi';
import { usePageTurn } from '@/lib/PageTurnContext';

interface PageNavigationProps {
  prevAyah: AyahData | null;
  nextAyah: AyahData | null;
  locale: string;
}

export default function PageNavigation({ prevAyah, nextAyah, locale }: PageNavigationProps) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const { navigate } = usePageTurn();

  return (
    <nav className="w-full mt-4 mb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="w-32 flex justify-start">
          {nextAyah?.surah && (
            <button
              onClick={() => navigate('next', `${prefix}/${nextAyah.surah!.number}:${nextAyah.numberInSurah}`)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary/5 hover:bg-primary hover:text-white text-primary font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Next
            </button>
          )}
        </div>

        <div className="text-center">
          {nextAyah?.surah && (
            <span className="text-xs text-foreground/30">
              {nextAyah.surah.number}:{nextAyah.numberInSurah}
            </span>
          )}
        </div>

        <div className="w-32 flex justify-end">
          {prevAyah?.surah && (
            <button
              onClick={() => navigate('prev', `${prefix}/${prevAyah.surah!.number}:${prevAyah.numberInSurah}`)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary/5 hover:bg-primary hover:text-white text-primary font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              Previous
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
