'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from '@/i18n/routing';

export interface SurahRow {
  _id: { toString(): string };
  number: number;
  name: string;
  name_latin: string;
  number_of_ayah: number;
  revelation_type: string;
  translations?: Record<string, { name: string }>;
}

interface Props {
  surahs: SurahRow[];
  locale: string;
  revelationLabels: Record<string, string>;
}

export default function SurahTable({ surahs, locale, revelationLabels }: Props) {
  const [search, setSearch] = useState('');
  const [selectedAyahs, setSelectedAyahs] = useState<Record<number, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && e.target instanceof HTMLElement && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return surahs;
    const q = search.toLowerCase();
    return surahs.filter(s => {
      if (s.name_latin.toLowerCase().includes(q)) return true;
      if (s.name.includes(q)) return true;
      const t = s.translations?.[locale]?.name || s.translations?.en?.name || '';
      if (t.toLowerCase().includes(q)) return true;
      return String(s.number).includes(q);
    });
  }, [surahs, search, locale]);

  return (
    <div className="w-full rounded-2xl border border-[#e0d5c0] dark:border-[#2a2535] bg-[#faf6ef] dark:bg-[#1a1625]">
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search surah...  /"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] text-foreground/80 placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-[0.15em] text-foreground/40 bg-primary/[0.02]">
            <th className="py-4 px-4 font-semibold">#</th>
            <th className="py-4 px-4 font-semibold">Surah</th>
            <th className="py-4 px-4 font-semibold hidden md:table-cell">Translation</th>
            <th className="py-4 px-4 font-semibold hidden sm:table-cell">Type</th>
            <th className="py-4 px-4 font-semibold">Ayah</th>
            <th className="py-4 px-4 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(surah => {
            const translationStr = surah.translations?.[locale]?.name || surah.translations?.en?.name || '';
            const revType = surah.revelation_type === 'Meccan' ? 'Meccan' : 'Medinan';
            const revLabel = revelationLabels[revType] || revType;
            const selected = selectedAyahs[surah.number] || 1;

            return (
              <tr
                key={surah._id.toString()}
                className="border-t border-[#e0d5c0]/50 dark:border-[#2a2535]/50 hover:bg-primary/[0.02] transition-colors"
              >
                <td className="py-3 px-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 text-primary text-sm font-bold">
                    {surah.number}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-tight">{surah.name_latin}</span>
                    <span className="font-arabic text-lg text-primary leading-relaxed">{surah.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-foreground/60 hidden md:table-cell">
                  {translationStr || `${surah.number_of_ayah} ayahs`}
                </td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    revType === 'Meccan'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                  }`}>
                    {revLabel}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-foreground/40 mr-1 hidden xs:inline">:</span>
                    <select
                      value={selected}
                      onChange={e => setSelectedAyahs(prev => ({ ...prev, [surah.number]: parseInt(e.target.value, 10) }))}
                      className="w-16 px-1.5 py-1 text-xs rounded-lg bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
                    >
                      {Array.from({ length: surah.number_of_ayah }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Link
                    href={`/${surah.number}:${selected}`}
                    className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-sm"
                  >
                    <span className="hidden xs:inline">Go</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
