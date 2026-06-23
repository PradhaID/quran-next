import {getTranslations, setRequestLocale} from 'next-intl/server';
import SiteNav from '@/components/SiteNav';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TermsPage' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      ...buildOpenGraph(locale, '/terms', {
        description: t('description'),
      }),
      ...ogImage(locale),
    },
    twitter: { card: 'summary_large_image', description: t('description') },
  };
}

export default async function TermsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('TermsPage');

  const sections = [
    { title: t('acceptanceTitle'), body: t('acceptanceBody') },
    { title: t('descriptionTitle'), body: t('descriptionBody') },
    { title: t('contentTitle'), body: t('contentBody') },
    { title: t('intellectualPropertyTitle'), body: t('intellectualPropertyBody') },
    { title: t('userConductTitle'), body: t('userConductBody') },
    { title: t('disclaimerTitle'), body: t('disclaimerBody') },
    { title: t('limitationTitle'), body: t('limitationBody') },
    { title: t('externalLinksTitle'), body: t('externalLinksBody') },
    { title: t('changesTitle'), body: t('changesBody') },
    { title: t('contactTitle'), body: t('contactBody') },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
      <SiteNav locale={locale} />
      <section className="w-full max-w-3xl space-y-8 mt-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light">
            {t('title')}
          </h1>
          <p className="text-sm text-foreground/50">
            {t('lastUpdated')}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-foreground mb-3">{s.title}</h2>
              <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
