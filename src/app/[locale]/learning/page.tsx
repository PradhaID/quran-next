import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteNav from '@/components/SiteNav';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';
import { buildLessons as buildLevel1 } from '@/lib/iqra/iqra1';
import { buildLessons as buildLevel2 } from '@/lib/iqra/iqra2';
import { buildLessons as buildLevel3 } from '@/lib/iqra/iqra3';
import { buildLessons as buildLevel4 } from '@/lib/iqra/iqra4';
import { buildLessons as buildLevel5 } from '@/lib/iqra/iqra5';
import { buildLessons as buildLevel6 } from '@/lib/iqra/iqra6';
import type { LessonData } from '@/lib/iqra/types';

const LEVELS = [
  { slug: 'iqra-1', build: buildLevel1, titleKey: 'iqra1Title' as const, descKey: 'iqra1Desc' as const, short: '1' },
  { slug: 'iqra-2', build: buildLevel2, titleKey: 'iqra2Title' as const, descKey: 'iqra2Desc' as const, short: '2' },
  { slug: 'iqra-3', build: buildLevel3, titleKey: 'iqra3Title' as const, descKey: 'iqra3Desc' as const, short: '3' },
  { slug: 'iqra-4', build: buildLevel4, titleKey: 'iqra4Title' as const, descKey: 'iqra4Desc' as const, short: '4' },
  { slug: 'iqra-5', build: buildLevel5, titleKey: 'iqra5Title' as const, descKey: 'iqra5Desc' as const, short: '5' },
  { slug: 'iqra-6', build: buildLevel6, titleKey: 'iqra6Title' as const, descKey: 'iqra6Desc' as const, short: '6' },
];

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LearningPage' });
  return {
    title: t('title'),
    openGraph: {
      ...buildOpenGraph(locale, '/learning', { description: t('description') }),
      ...ogImage(locale),
    },
    twitter: { card: 'summary_large_image', description: t('description') },
  };
}

export default async function LearningPage({ params }: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LearningPage');
  const lang = locale === 'id' ? 'id' : 'en';

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
      <SiteNav locale={locale} current="learning" />
      <section className="w-full space-y-8 mt-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-light">
            {t('title')}
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-sm">
            {t('description')}
          </p>
        </div>

        <LessonIndex locale={locale} lang={lang} />
      </section>
    </main>
  );
}

async function LessonIndex({ locale, lang }: { locale: string; lang: string }) {
  const t = await getTranslations('LearningPage');

  const allRows: {
    level: string;
    levelNum: string;
    levelTitle: string;
    levelColor: string;
    lesson: LessonData;
  }[] = [];

  const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];

  for (let li = 0; li < LEVELS.length; li++) {
    const { slug, build, titleKey, short } = LEVELS[li];
    const lessons = build(lang);
    for (const lesson of lessons) {
      allRows.push({
        level: slug,
        levelNum: short,
        levelTitle: t(titleKey),
        levelColor: colors[li % colors.length],
        lesson,
      });
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/5 dark:border-white/5">
            <th className="text-left py-3 px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider w-16">#</th>
            <th className="text-left py-3 px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider">Level</th>
            <th className="text-left py-3 px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider w-20">Lesson</th>
            <th className="text-left py-3 px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider">Title</th>
            <th className="text-right py-3 px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider w-20"></th>
          </tr>
        </thead>
        <tbody>
          {allRows.map((row, i) => (
            <tr
              key={`${row.level}-${row.lesson.number}`}
              className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-primary/[0.02] transition-colors"
            >
              <td className="py-2.5 px-3">
                <span className="text-xs text-foreground/30 font-mono">{i + 1}</span>
              </td>
              <td className="py-2.5 px-3">
                <div className="flex items-center gap-2">
                  <span className={`flex-none w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${row.levelColor}`}>
                    {row.levelNum}
                  </span>
                  <span className="text-xs text-foreground/60">{row.levelTitle}</span>
                </div>
              </td>
              <td className="py-2.5 px-3">
                <span className="text-xs font-medium text-foreground/50">{row.lesson.number}</span>
              </td>
              <td className="py-2.5 px-3">
                <span className="text-sm font-medium text-foreground">{row.lesson.title}</span>
              </td>
              <td className="py-2.5 px-3 text-right">
                <a
                  href={`/${locale}/learning/${row.level}/${row.lesson.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {lang === 'id' ? 'Buka' : 'Open'}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
