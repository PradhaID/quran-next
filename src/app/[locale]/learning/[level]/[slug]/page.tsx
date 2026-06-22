import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';
import LessonPageLayout from '@/components/LessonPageLayout';
import type { LessonData, LessonLevel } from '@/lib/iqra/types';
import { buildLessons as buildLevel1 } from '@/lib/iqra/iqra1';
import { buildLessons as buildLevel2 } from '@/lib/iqra/iqra2';
import { buildLessons as buildLevel3 } from '@/lib/iqra/iqra3';
import { buildLessons as buildLevel4 } from '@/lib/iqra/iqra4';
import { buildLessons as buildLevel5 } from '@/lib/iqra/iqra5';
import { buildLessons as buildLevel6 } from '@/lib/iqra/iqra6';

const LEVEL_BUILDERS: Record<string, (lang: string) => LessonData[]> = {
  'iqra-1': buildLevel1,
  'iqra-2': buildLevel2,
  'iqra-3': buildLevel3,
  'iqra-4': buildLevel4,
  'iqra-5': buildLevel5,
  'iqra-6': buildLevel6,
};

const LEVEL_TITLE_KEYS: Record<string, string> = {
  'iqra-1': 'iqra1Title',
  'iqra-2': 'iqra2Title',
  'iqra-3': 'iqra3Title',
  'iqra-4': 'iqra4Title',
  'iqra-5': 'iqra5Title',
  'iqra-6': 'iqra6Title',
};

const LEVEL_SLUGS = ['iqra-1', 'iqra-2', 'iqra-3', 'iqra-4', 'iqra-5', 'iqra-6'];

export async function generateStaticParams() {
  const out: { level: string; slug: string }[] = [];
  for (const [level, build] of Object.entries(LEVEL_BUILDERS)) {
    const lessons = build('en');
    for (const lesson of lessons) {
      out.push({ level, slug: lesson.id });
    }
  }
  return out;
}

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string; level: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, level, slug } = await params;
  const lang = locale === 'id' ? 'id' : 'en';
  const build = LEVEL_BUILDERS[level];
  if (!build) return { title: 'Not Found' };
  const lessons = build(lang);
  const lesson = lessons.find(l => l.id === slug);
  if (!lesson) return { title: 'Not Found' };
  const t = await getTranslations({ locale, namespace: 'LearningPage' });
  const levelTitle = t(LEVEL_TITLE_KEYS[level] as any);
  const title = `${lesson.title} — ${levelTitle}`;
  return {
    title,
    openGraph: {
      ...buildOpenGraph(locale, `/learning/${level}/${slug}`, { title, description: '' }),
      ...ogImage(locale),
    },
    twitter: { card: 'summary_large_image', title },
  };
}

export default async function LessonPage({ params }: {
  params: Promise<{ locale: string; level: string; slug: string }>;
}) {
  const { locale, level, slug } = await params;
  setRequestLocale(locale);
  const lang = locale === 'id' ? 'id' : 'en';
  const build = LEVEL_BUILDERS[level];
  if (!build) notFound();
  const lessons = build(lang);
  const lessonIdx = lessons.findIndex(l => l.id === slug);
  if (lessonIdx < 0) notFound();
  const lesson = lessons[lessonIdx];
  const t = await getTranslations('LearningPage');
  const levelTitle = t(LEVEL_TITLE_KEYS[level] as any);
  const nextLesson = lessonIdx < lessons.length - 1 ? lessons[lessonIdx + 1] : null;
  const prevLesson = lessonIdx > 0 ? lessons[lessonIdx - 1] : null;
  const levelUrl = `/${locale}/learning/${level}`;

  const levels: LessonLevel[] = LEVEL_SLUGS.map(slug => {
    const build = LEVEL_BUILDERS[slug];
    const lessons = build(lang);
    return {
      slug,
      title: t(LEVEL_TITLE_KEYS[slug] as any),
      lessons: lessons.map(l => ({ id: l.id, title: l.title, number: l.number })),
    };
  });

  return (
    <LessonPageLayout
      locale={locale}
      levels={levels}
      currentLevel={level}
      lesson={lesson}
      levelTitle={levelTitle}
      lang={lang}
      levelUrl={levelUrl}
      prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null}
      nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null}
    />
  );
}
