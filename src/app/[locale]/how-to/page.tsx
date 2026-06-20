import {getTranslations, setRequestLocale} from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import { pageUrl } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HowToPage' });
  return {
    title: t('title'),
    openGraph: {
      description: t('title'),
      url: pageUrl('/how-to', locale),
    },
    twitter: { description: t('title') },
  };
}

export default async function HowToPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('HowToPage');

  const steps = [
    { title: t('gettingStarted'), desc: t('gettingStartedDesc') },
    { title: t('readingNavigation'), desc: t('readingNavigationDesc') },
    { title: t('usingTranslation'), desc: t('usingTranslationDesc') },
    { title: t('takingNotes'), desc: t('takingNotesDesc') },
    { title: t('sidebarFeatures'), desc: t('sidebarFeaturesDesc') },
    { title: t('tajweedGuide'), desc: t('tajweedGuideDesc') },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-4xl mx-auto w-full">
      <SiteNav locale={locale} current="how-to" />
      <section className="w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light">
            {t('title')}
          </h1>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground mb-2">{step.title}</h2>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/1:1"
            className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </section>
    </main>
  );
}
