'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { LessonData } from '@/lib/iqra/types';

interface LessonLink {
  id: string;
  title: string;
}

interface LessonPageContentProps {
  lesson: LessonData;
  levelTitle: string;
  lang: string;
  levelUrl: string;
  prevLesson: LessonLink | null;
  nextLesson: LessonLink | null;
  level: string;
}

export default function LessonPageContent({
  lesson,
  levelTitle,
  lang,
  levelUrl,
  prevLesson,
  nextLesson,
  level,
}: LessonPageContentProps) {
  const t = useTranslations('LearningPage');
  const [activePage, setActivePage] = useState(0);

  const page = lesson.pages[activePage];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & level link */}
      <div className="flex items-center gap-2 text-xs text-foreground/40">
        <Link href="/learning" className="hover:text-primary transition-colors">
          {lang === 'id' ? 'Belajar' : 'Learn'}
        </Link>
        <span>/</span>
        <span className="text-foreground/60">{levelTitle}</span>
      </div>

      {/* Prev / Next lesson */}
      <div className="flex items-center justify-between">
        {prevLesson ? (
          <Link
            href={`/learning/${level}/${prevLesson.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            &larr; {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/learning/${level}/${nextLesson.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {nextLesson.title} &rarr;
          </Link>
        ) : (
          <Link
            href={levelUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {t('finishLearning')}
          </Link>
        )}
      </div>

      {/* Lesson header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <span>{t('lesson')} {lesson.number}</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
      </div>

      {/* Page tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{page?.title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage(0)}
            className={`w-7 h-7 rounded-full text-xs font-bold transition-colors ${
              activePage === 0
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            1
          </button>
          <button
            onClick={() => setActivePage(1)}
            className={`w-7 h-7 rounded-full text-xs font-bold transition-colors ${
              activePage === 1
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            2
          </button>
        </div>
      </div>

      {/* Content with RTL for Arabic */}
      <div dir="rtl" className="w-full space-y-6">
        {page?.content}
      </div>
    </div>
  );
}
