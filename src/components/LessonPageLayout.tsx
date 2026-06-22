'use client';

import { useState } from 'react';
import SiteNav from './SiteNav';
import LessonSidebar from './LessonSidebar';
import LessonPageContent from './LessonPageContent';
import type { LessonLevel, LessonData } from '@/lib/iqra/types';

interface LessonPageLayoutProps {
  locale: string;
  levels: LessonLevel[];
  currentLevel: string;
  lesson: LessonData;
  levelTitle: string;
  lang: string;
  levelUrl: string;
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}

export default function LessonPageLayout({
  locale,
  levels,
  currentLevel,
  lesson,
  levelTitle,
  lang,
  levelUrl,
  prevLesson,
  nextLesson,
}: LessonPageLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <LessonSidebar
        levels={levels}
        currentLevel={currentLevel}
        currentLessonId={lesson.id}
        locale={locale}
        tocOpen={tocOpen}
        onCloseToc={() => setTocOpen(false)}
      />
      <div className="flex-1 flex flex-col items-center p-2 sm:p-4 md:p-6 max-w-7xl mx-auto w-full gap-2 md:gap-2">
        <SiteNav locale={locale} current="learning" />
        <div className="w-full flex flex-col items-center">
          {/* Mobile TOC toggle */}
          <div className="w-full flex items-center justify-between mb-4 md:hidden">
            <button
              onClick={() => setTocOpen(true)}
              className="flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Contents
            </button>
          </div>

          <div className="w-full max-w-5xl">
            <LessonPageContent
              lesson={lesson}
              levelTitle={levelTitle}
              lang={lang}
              levelUrl={levelUrl}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              level={currentLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
