import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { SITE_URL } from '@/lib/siteUrl';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import "../globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    icons: [
      { rel: 'icon', url: '/img/favicon/favicon.ico', sizes: '48x48' },
      { rel: 'icon', url: '/img/favicon/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', url: '/img/favicon/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', url: '/img/favicon/apple-touch-icon.png' },
    ],
    manifest: '/img/favicon/site.webmanifest',
    openGraph: {
      title: { template: `%s | ${t('title')}`, default: t('title') },
      description: t('description'),
      type: 'website',
      siteName: 'Quran Digital',
      images: [
        {
          url: locale === 'id' ? '/img/featured-id.avif' : '/img/featured-en.avif',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#faf6ef',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="preload" href="/fonts/KFGQPC-Hafs.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-surface text-foreground selection:bg-transparent antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
