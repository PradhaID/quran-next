import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import clientPromise from '@/lib/mongodb';
import SiteNav from '@/components/SiteNav';
import SurahTable, { type SurahRow } from '@/components/SurahTable';
import LastReadCta from '@/components/LastReadCta';
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
  const surahs = (await db.collection('surahs').find({}, {
    projection: { 
      number: 1, 
      name: 1, 
      name_latin: 1, 
      number_of_ayah: 1, 
      revelationType: 1,
      translations: 1
    }
  }).sort({ number: 1 }).toArray()).map(d => ({
    _id: d._id.toString(),
    number: d.number,
    name: d.name,
    name_latin: d.name_latin,
    number_of_ayah: d.number_of_ayah,
    revelationType: d.revelationType,
    translations: d.translations,
  })) as SurahRow[];

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
        <LastReadCta
          startReadingLabel={t('startReading')}
          readByPageDesc={t('readByPageDesc')}
          continueReading={t('continueReading')}
          lastReadSurah={t('lastReadSurah')}
          lastReadAyah={t('lastReadAyah')}
          lastReadPage={t('lastReadPage')}
        />
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
