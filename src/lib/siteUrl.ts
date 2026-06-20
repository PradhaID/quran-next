import type { Metadata } from 'next';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://quran.pradha.id';

export function pageUrl(path: string, locale: string): string {
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const normalizedPath = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : '';
  return `${SITE_URL}${localePrefix}${normalizedPath}`;
}

type OpenGraphFields = Omit<NonNullable<Metadata['openGraph']>, 'url' | 'type'>;

export function buildOpenGraph(
  locale: string,
  path: string,
  fields: OpenGraphFields = {},
): NonNullable<Metadata['openGraph']> {
  return {
    type: 'website',
    url: pageUrl(path, locale),
    ...fields,
  };
}

export function ogImage(locale: string) {
  return {
    images: [
      {
        url: locale === 'id' ? '/img/featured-id.webp' : '/img/featured-en.webp',
        width: 1200,
        height: 630,
      },
    ],
  };
}
