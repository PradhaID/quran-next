'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LessonLevel } from '@/lib/iqra/types';

interface Props {
  levels: LessonLevel[];
  currentLevel: string;
  currentLessonId: string;
  locale: string;
  tocOpen: boolean;
  onCloseToc: () => void;
}

export default function LessonSidebar({ levels, currentLevel, currentLessonId, locale, tocOpen, onCloseToc }: Props) {
  const router = useRouter();
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(() => new Set([currentLevel]));

  const toggleLevel = (slug: string) => {
    setExpandedLevels(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const goToLesson = (level: string, lessonId: string) => {
    router.push(`/${locale}/learning/${level}/${lessonId}`);
    onCloseToc();
  };

  return (
    <>
      {tocOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={onCloseToc} />
      )}
      <aside className={`
        fixed md:sticky md:top-0 left-0 h-full md:h-screen z-50 md:z-auto
        w-72 flex-none bg-[#faf6ef] dark:bg-[#1a1625]
        border-r border-[#e0d5c0] dark:border-[#2a2535]
        shadow-2xl md:shadow-none overflow-y-auto
        transition-transform duration-300
        ${tocOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0d5c0] dark:border-[#2a2535]">
          <h2 className="text-[10px] font-semibold text-foreground/40 tracking-wider uppercase">
            Contents
          </h2>
          <button
            onClick={onCloseToc}
            className="w-6 h-6 rounded-full hover:bg-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground/70 transition-colors md:hidden"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {levels.map(lvl => {
            const isExpanded = expandedLevels.has(lvl.slug);
            const isCurrentLevel = lvl.slug === currentLevel;
            return (
              <div key={lvl.slug}>
                <button
                  onClick={() => toggleLevel(lvl.slug)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isCurrentLevel
                      ? 'bg-primary/15 text-primary'
                      : 'text-foreground/50 hover:text-foreground hover:bg-primary/5'
                  }`}
                >
                  <svg
                    className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span>{lvl.title}</span>
                </button>

                {isExpanded && (
                  <div className="ml-2 mt-1 space-y-0.5">
                    {lvl.lessons.map(lsn => {
                      const isActive = isCurrentLevel && lsn.id === currentLessonId;
                      return (
                        <button
                          key={lsn.id}
                          onClick={() => goToLesson(lvl.slug, lsn.id)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            isActive
                              ? 'bg-primary/20 text-primary font-semibold'
                              : 'text-foreground/50 hover:text-foreground hover:bg-primary/5'
                          }`}
                        >
                          <span className={`flex-none w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                            isActive
                              ? 'bg-primary text-white'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {lsn.number}
                          </span>
                          <span className="truncate">{lsn.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
