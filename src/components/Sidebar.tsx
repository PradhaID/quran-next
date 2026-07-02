'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { TAJWEED_RULES } from '@/lib/tajweed';
import { WAQF_SIGNS, WAQF_COLORS } from '@/lib/waqf';
import type { SurahInfo, SurahListItem, AyahData } from '@/lib/quranApi';
import { useRouter, usePathname } from '@/i18n/routing';
import CalendarSection from './CalendarSection';

const BG: Record<string, string> = {
  red: 'bg-[#e74c3c]',
  green: 'bg-[#27ae60]',
  blue: 'bg-[#2980b9]',
  orange: 'bg-[#e67e22]',
  purple: 'bg-[#8e44ad]',
  brown: 'bg-[#a0522d]',
};

const NOTES_KEY = 'quran_notes';

function loadNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

interface SidebarProps {
  search: string;
  onSearchChange: (v: string) => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  surahs: SurahInfo[];
  locale: string;
  allSurahs: SurahListItem[];
  arabicFontScale: number;
  onArabicFontScaleChange: (v: number) => void;
  pinnedAyah: AyahData | null;
  pinnedTranslation: AyahData | null;
  onUnpinAyah: () => void;
  currentSurah?: number;
  currentAyah?: number;
  surahAyahRanges?: Map<number, { from: number; to: number }>;
}

export default function Sidebar({ search, onSearchChange, open, onOpenChange, surahs, locale, allSurahs, arabicFontScale, onArabicFontScaleChange, pinnedAyah, pinnedTranslation, onUnpinAyah, currentSurah, currentAyah, surahAyahRanges }: SidebarProps) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const [navSurah, setNavSurah] = useState('');
  const [navAyah, setNavAyah] = useState('');

  useEffect(() => {
    if (currentSurah) {
      setNavSurah(String(currentSurah));
    }
    if (currentSurah && currentAyah) {
      setNavAyah(String(currentAyah));
    }
  }, [currentSurah, currentAyah]);

  const selectedSurah = allSurahs.find(s => s.number === Number(navSurah));
  const ayahCount = selectedSurah?.numberOfAyahs ?? 0;
  const ayahOptions = Array.from({ length: ayahCount }, (_, i) => i + 1);

  const goToAyah = (surah: string, ayah: string) => {
    if (surah && ayah) {
      window.location.href = `${prefix}/${surah}:${ayah}`;
    }
  };

  const pinnedId = pinnedAyah?.surah
    ? `${pinnedAyah.surah.number}:${pinnedAyah.numberInSurah}`
    : null;

  const [note, setNote] = useState('');
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  const refreshNotes = useCallback(() => {
    setNotesMap(loadNotes());
  }, []);

  useEffect(() => {
    refreshNotes();
  }, [refreshNotes]);

  useEffect(() => {
    if (pinnedId) {
      setNote(notesMap[pinnedId] || '');
    } else {
      setNote('');
    }
  }, [pinnedId, notesMap]);

  const saveNote = useCallback((text: string) => {
    setNote(text);
    if (!pinnedId) return;
    const notes = loadNotes();
    if (text.trim()) {
      notes[pinnedId] = text;
    } else {
      delete notes[pinnedId];
    }
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    refreshNotes();
  }, [pinnedId, refreshNotes]);

  const noteEntries = Object.entries(notesMap).sort((a, b) => {
    const [sa, aa] = a[0].split(':').map(Number);
    const [sb, ab] = b[0].split(':').map(Number);
    return sa - sb || aa - ab;
  });

  const deleteNote = useCallback((id: string) => {
    const notes = loadNotes();
    delete notes[id];
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    refreshNotes();
  }, [refreshNotes]);

  const surahLookup = new Map(allSurahs.map(s => [s.number, s]));
  const [notesOpen, setNotesOpen] = useState(true);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => onOpenChange(false)} />
      )}

      <aside data-ayah-panel="true" className={`
        fixed md:sticky md:top-0 right-0 h-full md:h-screen z-50 md:z-auto
        w-72 flex-none bg-[#faf6ef] dark:bg-[#1a1625]
        border-l border-[#e0d5c0] dark:border-[#2a2535]
        shadow-2xl md:shadow-none overflow-y-auto
        transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0d5c0] dark:border-[#2a2535]">
          <h2 className="text-xs font-semibold text-foreground/60 tracking-wider uppercase">Menu</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="w-6 h-6 rounded-full hover:bg-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground/70 transition-colors md:hidden"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-5">
          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => router.replace(pathname, { locale: 'en' })}
              className={`flex-1 text-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${locale === 'en' ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
            >
              English
            </button>
            <button
              onClick={() => router.replace(pathname, { locale: 'id' })}
              className={`flex-1 text-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${locale === 'id' ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
            >
              Indonesia
            </button>
          </div>

          {/* Translation */}
          {pinnedAyah?.surah && pinnedTranslation && (
            <div className="p-3 bg-[#f0ebe0] dark:bg-[#22202d] border border-[#d4c9b4] dark:border-[#3a3545] rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-foreground/50 tracking-wider uppercase">
                  {pinnedAyah.surah.nameLatin || pinnedAyah.surah.englishName} ({pinnedAyah.surah.translationName || pinnedAyah.surah.englishNameTranslation}) — {pinnedAyah.numberInSurah}
                </span>
                <button
                  onClick={onUnpinAyah}
                  className="w-5 h-5 rounded-full hover:bg-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {pinnedTranslation.text}
              </div>
            </div>
          )}

          {/* Note */}
          {pinnedId && (
            <div>
              <label className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block mb-1.5">
                {t('note')}
              </label>
              <textarea
                value={note}
                onChange={e => saveNote(e.target.value)}
                placeholder="Write a note for this ayah…"
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] placeholder:text-foreground/20 text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
            </div>
          )}

          {/* Saved Notes */}
          {noteEntries.length > 0 && (
            <div>
              <button
                onClick={() => setNotesOpen(o => !o)}
                className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block w-full text-left hover:text-foreground/60 transition-colors"
              >
                {t('savedNotes')} ({noteEntries.length}) {notesOpen ? '▾' : '▸'}
              </button>
              {notesOpen && (
              <div className="mt-3 space-y-1 max-h-48 overflow-y-auto">
                {noteEntries.map(([id, text]) => {
                  const [surahNum, ayahNum] = id.split(':');
                  const surah = surahLookup.get(Number(surahNum));
                  const surahName = surah ? (surah.translationName || surah.englishNameTranslation) : '';
                  const baseName = surah ? (surah.nameLatin || surah.englishName) : '';
                  const display = surah ? `${surah.number}. ${baseName} (${surahName})` : `Surah ${surahNum}`;
                  return (
                    <div
                      key={id}
                      className="flex items-start gap-1 px-3 py-2 rounded-lg bg-white/40 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] hover:bg-primary/5 transition-colors group"
                    >
                      <a
                        href={`${prefix}/${id}`}
                        className="flex-1 min-w-0"
                      >
                        <div className="text-[10px] font-semibold text-foreground/50 mb-0.5">
                          {display} — {ayahNum}
                        </div>
                        <div className="text-[11px] text-foreground/70 leading-relaxed line-clamp-2">
                          {text}
                        </div>
                      </a>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNote(id); }}
                        className="mt-0.5 w-5 h-5 rounded flex-none flex items-center justify-center text-foreground/30 hover:text-red-500 hover:bg-red-500/10 transition-colors md:opacity-0 md:group-hover:opacity-100"
                        title="Delete note"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          )}

          {/* Search */}
          <div>
            <label className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block mb-1.5">
              {t('search')}
            </label>
            <input
              type="text"
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Arabic or translation…"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] placeholder:text-foreground/20 text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Navigate */}
          <div>
            <label className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block mb-1.5">
              {t('navigate')}
            </label>
            <div className="flex gap-1.5">
              <select
                value={navSurah}
                onChange={e => { const v = e.target.value; setNavSurah(v); setNavAyah('1'); goToAyah(v, '1'); }}
                className="w-[70%] min-w-0 px-2 py-2 text-xs rounded-lg bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none"
              >
                <option value="">Surah</option>
                {allSurahs.map(s => (
                  <option key={s.number} value={s.number}>
                    {s.number}. {s.nameLatin || s.englishName} ({s.translationName || s.englishNameTranslation})
                  </option>
                ))}
              </select>
              <select
                value={navAyah}
                onChange={e => { const v = e.target.value; setNavAyah(v); goToAyah(navSurah, v); }}
                disabled={!navSurah}
                className="w-[30%] min-w-0 px-2 py-2 text-xs rounded-lg bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none disabled:opacity-30"
              >
                <option value="">Ayah</option>
                {ayahOptions.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Arabic Font Size */}
          <div>
            <label className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block mb-1.5">
              {t('arabicFontSize')}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onArabicFontScaleChange(Math.max(0.625, arabicFontScale - 0.125))}
                className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors text-sm font-bold"
              >
                −
              </button>
              <span className="text-xs text-foreground/60 min-w-[3ch] text-center tabular-nums">
                {Math.round(arabicFontScale * 100)}%
              </span>
              <button
                onClick={() => onArabicFontScaleChange(Math.min(2, arabicFontScale + 0.125))}
                className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Calendar */}
          <CalendarSection locale={locale} />

          {/* Surahs on this page */}
          <div>
            <label className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block mb-1.5">
              {t('surahsOnThisPage')}
            </label>
            <div className="space-y-0.5">
              {surahs.map(s => {
                const range = surahAyahRanges?.get(s.number);
                const rangeStr = range ? `:${range.from}–${range.to} (${s.numberOfAyahs})` : `(${s.numberOfAyahs})`;
                return (
                  <a
                    key={s.number}
                    href={`${prefix}/${s.number}:1`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-foreground/60 hover:text-foreground hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-arabic text-sm">{s.name}</span>
                    <span className="text-foreground/30 ml-auto">
                      {s.number}. {s.nameLatin || s.englishName} ({s.translationName || s.englishNameTranslation}){rangeStr}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Waqf Stop Signs */}
          <div>
            <button
              onClick={() => {
                const el = document.getElementById('waqf-section');
                if (el) el.classList.toggle('hidden');
              }}
              className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block w-full text-left hover:text-foreground/60 transition-colors"
            >
              {t('waqfGuide')} ▾
            </button>
            <div id="waqf-section" className="hidden mt-3 space-y-3">
              {WAQF_SIGNS.map(sign => {
                const key = 'waqf' + sign.color.charAt(5).toUpperCase() + sign.color.slice(6);
                return (
                  <div key={sign.codepoint} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 w-3 h-3 rounded-full flex-none"
                      style={{ backgroundColor: WAQF_COLORS[sign.color] }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-foreground/70">{t(key)}</div>
                      <div className="text-[10px] text-foreground/40 leading-relaxed">{t(key + 'Desc')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tajweed Guide */}
          <div>
            <button
              onClick={() => {
                const el = document.getElementById('tajweed-section');
                if (el) el.classList.toggle('hidden');
              }}
              className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block w-full text-left hover:text-foreground/60 transition-colors"
            >
              {t('tajweedGuide')} ▾
            </button>
            <div id="tajweed-section" className="hidden mt-3 space-y-3">
              {TAJWEED_RULES.map(rule => {
                const key = 'rule' + rule.color.charAt(0).toUpperCase() + rule.color.slice(1);
                return (
                  <div key={rule.color} className="flex items-start gap-2">
                    <span className={`mt-0.5 w-3 h-3 rounded-full flex-none ${BG[rule.color]}`} />
                    <div>
                      <div className="text-xs font-semibold text-foreground/70">{t(key)}</div>
                      <div className="text-[10px] text-foreground/40 leading-relaxed">{t(key + 'Desc')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
