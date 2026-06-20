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
