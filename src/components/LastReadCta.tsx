'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { loadLastRead } from '@/lib/lastRead';
import type { LastReadPosition } from '@/lib/lastRead';

interface Props {
  startReadingLabel: string;
  readByPageDesc: string;
  continueReading: string;
  lastReadSurah: string;
  lastReadAyah: string;
  lastReadPage: string;
}

export default function LastReadCta({
  startReadingLabel,
  readByPageDesc,
  continueReading,
  lastReadSurah,
  lastReadAyah,
  lastReadPage,
}: Props) {
  const [lastRead, setLastRead] = useState<LastReadPosition | null>(null);

  useEffect(() => {
    setLastRead(loadLastRead());
  }, []);

  const href = lastRead ? `/${lastRead.surah}:${lastRead.ayah}` : '/1:1';
  const prefix = typeof window !== 'undefined' ? (
    window.location.pathname.startsWith('/id') ? '/id' : ''
  ) : '';

  return (
    <Link
      href={href}
      className="group relative block w-full p-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl text-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">
            {lastRead ? continueReading : startReadingLabel}
          </h3>
          {lastRead ? (
            <p className="text-white/70 text-sm mt-1">
              {lastReadSurah} {lastRead.surahName} &middot; {lastReadAyah} {lastRead.ayah} &middot; {lastReadPage} {lastRead.page}
            </p>
          ) : (
            <p className="text-white/70 text-sm mt-1">{readByPageDesc}</p>
          )}
        </div>
        <div className="flex items-center gap-2 text-lg font-bold group-hover:translate-x-1 transition-transform">
          604 Pages
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
