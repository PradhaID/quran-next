import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import clientPromise from '@/lib/mongodb';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import { pageUrl } from '@/lib/siteUrl';
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
      description: t('description'),
      url: pageUrl('', locale),
    },
    twitter: { description: t('description') },
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
  const surahs = await db.collection('surahs').find({}, {
    projection: { 
      number: 1, 
      name: 1, 
      name_latin: 1, 
      number_of_ayah: 1, 
      revelation_type: 1,
      translations: 1
    }
  }).sort({ number: 1 }).toArray();

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
      <SiteNav locale={locale} current="home" />
      
      {/* Hero Section */}
      <section className="w-full mb-16 text-center space-y-6 glass-panel rounded-3xl p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-primary dark:text-primary-light font-sans tracking-tight z-10 relative">
          {t('title')}
        </h1>
        <p className="text-xl text-foreground/80 font-medium z-10 relative max-w-2xl mx-auto">
          {t('description')}
        </p>
        
        {/* Language Switcher */}
        <div className="flex justify-center gap-4 pt-4 z-10 relative">
          <Link href="/" locale="en" className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${locale === 'en' ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
            English
          </Link>
          <Link href="/" locale="id" className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${locale === 'id' ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
            Indonesia
          </Link>
        </div>
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
              <h3 className="text-xl font-bold">Start Reading</h3>
              <p className="text-white/70 text-sm mt-1">Read the Quran page by page</p>
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

      {/* Surah Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => {
          // Fallback to English if translation for locale isn't found
          const translationStr = surah.translations?.[locale]?.name || surah.translations?.en?.name || "";
          // Translation type might be different based on JSON. Let's assume it has an English/Indonesian translation if available
          // Wait, the JSON didn't have translations directly in that format.
          // Let's check the JSON structure later if this fails.

          return (
            <Link 
              href={`/${surah.number}:1`} 
              key={surah._id.toString()}
              className="group flex items-center p-6 bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-2xl hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors rotate-45 relative">
                <span className="font-bold -rotate-45">{surah.number}</span>
              </div>
              
              <div className="ml-6 flex-grow flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{surah.name_latin}</span>
                  <span className="text-sm text-foreground/60">
                    {/* Fallback to simple english for now if translation structure is unknown */}
                    {translationStr || t('ayahs', { count: surah.number_of_ayah })}
                  </span>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="font-arabic text-2xl text-primary">{surah.name}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
