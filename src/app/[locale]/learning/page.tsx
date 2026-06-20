import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import { buildOpenGraph } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LearningPage' });
  return {
    title: t('title'),
    openGraph: buildOpenGraph(locale, '/learning', {
      description: t('description'),
    }),
    twitter: { description: t('description') },
  };
}

const iqraLevels = [
  { num: 1, slug: 'iqra-1', titleKey: 'iqra1Title', descKey: 'iqra1Desc' },
  { num: 2, slug: 'iqra-2', titleKey: 'iqra2Title', descKey: 'iqra2Desc' },
  { num: 3, slug: 'iqra-3', titleKey: 'iqra3Title', descKey: 'iqra3Desc' },
  { num: 4, slug: 'iqra-4', titleKey: 'iqra4Title', descKey: 'iqra4Desc' },
  { num: 5, slug: 'iqra-5', titleKey: 'iqra5Title', descKey: 'iqra5Desc' },
  { num: 6, slug: 'iqra-6', titleKey: 'iqra6Title', descKey: 'iqra6Desc' },
];

export default async function LearningPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LearningPage');

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-6xl mx-auto w-full">
      <SiteNav locale={locale} current="learning" />
      <section className="w-full space-y-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link
              href="/learning"
              locale="en"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                locale === 'en'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              English
            </Link>
            <Link
              href="/learning"
              locale="id"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                locale === 'id'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              Indonesia
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light">
            {t('title')}
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-sm md:text-base">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {iqraLevels.map(({ num, slug, titleKey, descKey }) => (
            <Link
              key={num}
              href={`/learning/${slug}`}
              className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 hover:border-primary/20 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-none w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {num}
                </span>
                <span className="text-xs uppercase tracking-wider text-foreground/40 font-semibold">
                  {t('level', { number: num })}
                </span>
              </div>
              <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {t(titleKey as any)}
              </h2>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {t(descKey as any)}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href={`/learning/iqra-1`}
            className="px-8 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {t('startLearning')}
          </Link>
        </div>
      </section>
    </main>
  );
}
