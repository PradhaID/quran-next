import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import clientPromise from '@/lib/mongodb';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import SurahTable, { type SurahRow } from '@/components/SurahTable';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      ...buildOpenGraph(locale, '', {
        description: t('description'),
      }),
      ...ogImage(locale),
    },
    twitter: { card: 'summary_large_image', description: t('description') },
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  // Fetch from MongoDB
  const client = await clientPromise;
  const db = client.db();
  const surahs = await db.collection('surahs').find<SurahRow>({}, {
    projection: { 
      number: 1, 
      name: 1, 
      name_latin: 1, 
      number_of_ayah: 1, 
      revelationType: 1,
      translations: 1
    }
  }).sort({ number: 1 }).toArray();

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
      <SiteNav locale={locale} current="home" />
      
      {/* Hero Section */}
      <section className="w-full mb-6 rounded-2xl overflow-hidden" style={{ aspectRatio: '1200/630' }}>
        <img
          src={locale === 'id' ? '/img/featured-id.avif' : '/img/featured-en.avif'}
          alt=""
          className="w-full h-full object-cover"
        />
      </section>

      {/* Read by Page CTA */}
      <div className="w-full mb-8">
          <Link
            href="/1:1"
            className="group relative block w-full p-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl text-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{t('startReading')}</h3>
              <p className="text-white/70 text-sm mt-1">{t('readByPageDesc')}</p>
            </div>
            <div className="flex items-center gap-2 text-lg font-bold group-hover:translate-x-1 transition-transform">
              604 Pages
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Search / Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{t('surahCount', { count: surahs.length })}</h2>
      </div>

      {/* Surah Table */}
      <div className="w-full">
        <SurahTable
          surahs={surahs}
          locale={locale}
          revelationLabels={{ Meccan: t('revelationType.Meccan'), Medinan: t('revelationType.Medinan') }}
        />
      </div>
    </main>
  );
}
