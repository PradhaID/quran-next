'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { toHijri, getHijriMonthName, hijriMonthDays } from '@/lib/hijri';

const MARKS_KEY = 'quran_date_marks';
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function loadMarks(): Record<string, string> {
  try {
    const raw = localStorage.getItem(MARKS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function formatKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function daysInGregorianMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

interface CalendarSectionProps {
  locale: string;
}

export default function CalendarSection({ locale }: CalendarSectionProps) {
  const t = useTranslations('Sidebar');
  const [open, setOpen] = useState(false);
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [calYear, setCalYear] = useState(0);
  const [calMonth, setCalMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [markInput, setMarkInput] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setCalYear(now.getFullYear());
    setCalMonth(now.getMonth());
    setMarks(loadMarks());
  }, []);

  useEffect(() => {
    if (!selectedDay) return;
    setMarkInput(marks[selectedDay] || '');
  }, [selectedDay, marks]);

  useEffect(() => {
    if (!selectedDay) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setSelectedDay(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [selectedDay]);

  const prevMonth = useCallback(() => {
    setCalMonth(m => {
      if (m === 0) { setCalYear(y => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setCalMonth(m => {
      if (m === 11) { setCalYear(y => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const saveMark = useCallback((key: string, text: string) => {
    const updated = { ...loadMarks() };
    if (text.trim()) {
      updated[key] = text.trim();
    } else {
      delete updated[key];
    }
    localStorage.setItem(MARKS_KEY, JSON.stringify(updated));
    setMarks(updated);
  }, []);

  const today = new Date();
  const todayKey = formatKey(today.getFullYear(), today.getMonth(), today.getDate());

  const daysInMonth = daysInGregorianMonth(calYear, calMonth);
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const hijriMonthStart = toHijri(calYear, calMonth, 1);
  const hijriYear = hijriMonthStart.year;
  const hijriMonth = hijriMonthStart.month;

  const hijriMonthName = getHijriMonthName(hijriMonth, locale);
  const nextHijriMonthName = getHijriMonthName(hijriMonth === 11 ? 0 : hijriMonth + 1, locale);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase block w-full text-left hover:text-foreground/60 transition-colors"
      >
        {t('calendar')} {open ? '▾' : '▸'}
      </button>

      {open && (
        <div className="mt-3">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={prevMonth}
              className="w-6 h-6 rounded-lg hover:bg-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground/70 transition-colors text-xs"
            >
              ‹
            </button>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground/70">
                {monthNames[calMonth]} {calYear}
              </div>
              <div className="text-[10px] text-foreground/40">
                {hijriMonthName} {hijriYear} H
              </div>
            </div>
            <button
              onClick={nextMonth}
              className="w-6 h-6 rounded-lg hover:bg-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground/70 transition-colors text-xs"
            >
              ›
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-0 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[9px] text-foreground/30 font-semibold uppercase py-0.5">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = formatKey(calYear, calMonth, day);
              const hijri = toHijri(calYear, calMonth, day);
              const isToday = key === todayKey;
              const hasMark = !!marks[key];
              const isSelected = key === selectedDay;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedDay(isSelected ? null : key)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-[10px] transition-colors
                    ${isToday ? 'bg-primary/15 font-bold text-primary' : ''}
                    ${isSelected ? 'ring-2 ring-primary/40 bg-primary/10' : ''}
                    ${!isToday && !isSelected ? 'hover:bg-primary/5' : ''}
                  `}
                >
                  <span className="leading-tight">{day}</span>
                  <span className="text-[7px] text-foreground/30 leading-tight">{hijri.day}</span>
                  {hasMark && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-primary/60" />}
                </button>
              );
            })}
          </div>

          {/* Selected date popover */}
          {selectedDay && (
            <div
              ref={popoverRef}
              className="mt-3 p-3 rounded-xl bg-[#f0ebe0] dark:bg-[#22202d] border border-[#d4c9b4] dark:border-[#3a3545] space-y-2"
            >
              <div className="text-[11px] font-semibold text-foreground/70">
                {selectedDay}
              </div>
              {(() => {
                const parts = selectedDay.split('-').map(Number);
                const h = toHijri(parts[0], parts[1] - 1, parts[2]);
                return (
                  <div className="text-[10px] text-foreground/40">
                    {h.day} {getHijriMonthName(h.month, locale)} {h.year} H
                  </div>
                );
              })()}
              <textarea
                value={markInput}
                onChange={e => setMarkInput(e.target.value)}
                placeholder="Add a note for this date…"
                rows={2}
                className="w-full px-2 py-1.5 text-[11px] rounded-lg bg-white/60 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] placeholder:text-foreground/20 text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
              <div className="flex gap-1.5">
                <button
                  onClick={() => { saveMark(selectedDay, markInput); setSelectedDay(null); }}
                  className="flex-1 px-2 py-1 text-[10px] font-semibold rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                >
                  Save
                </button>
                {marks[selectedDay] && (
                  <button
                    onClick={() => { saveMark(selectedDay, ''); setSelectedDay(null); }}
                    className="px-2 py-1 text-[10px] font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Marks list */}
          {Object.keys(marks).length > 0 && !selectedDay && (
            <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
              {Object.entries(marks)
                .sort(([a], [b]) => b.localeCompare(a))
                .slice(0, 5)
                .map(([key, text]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDay(key)}
                    className="w-full text-left px-2 py-1.5 rounded-lg bg-white/40 dark:bg-white/5 border border-[#d4c9b4] dark:border-[#3a3545] hover:bg-primary/5 transition-colors"
                  >
                    <div className="text-[10px] font-semibold text-foreground/50">{key}</div>
                    <div className="text-[10px] text-foreground/60 truncate">{text}</div>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
