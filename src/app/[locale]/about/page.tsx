import {getTranslations, setRequestLocale} from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import SwipeNavigator from '@/components/SwipeNavigator';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      ...buildOpenGraph(locale, '/about', {
        description: t('description'),
      }),
      ...ogImage(locale),
    },
    twitter: { card: 'summary_large_image', description: t('description') },
  };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('AboutPage');

  const features = [
    { title: t('feature1Title'), desc: t('feature1Desc') },
    { title: t('feature2Title'), desc: t('feature2Desc') },
    { title: t('feature3Title'), desc: t('feature3Desc') },
    { title: t('feature4Title'), desc: t('feature4Desc') },
    { title: t('feature5Title'), desc: t('feature5Desc') },
    { title: t('feature6Title'), desc: t('feature6Desc') },
    { title: t('feature7Title'), desc: t('feature7Desc') },
    { title: t('feature8Title'), desc: t('feature8Desc') },
  ];

  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <SwipeNavigator prevHref={`${prefix}/`} nextHref={`${prefix}/how-to`}>
      <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
        <SiteNav locale={locale} current="about" />
        <section className="w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light">
              {t('title')}
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground/80">
              {t('features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 hover:border-primary/20 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
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
    </SwipeNavigator>
  );
}
