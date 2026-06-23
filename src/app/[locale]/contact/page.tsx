import {getTranslations, setRequestLocale} from 'next-intl/server';
import SiteNav from '@/components/SiteNav';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      ...buildOpenGraph(locale, '/contact', {
        description: t('description'),
      }),
      ...ogImage(locale),
    },
    twitter: { card: 'summary_large_image', description: t('description') },
  };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('ContactPage');

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
      <SiteNav locale={locale} current="contact" />
      <section className="w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light">
            {t('title')}
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
            <h2 className="font-semibold text-foreground mb-3">{t('reportIssue')}</h2>
            <p className="text-sm text-foreground/60 leading-relaxed mb-4">{t('reportIssueDesc')}</p>

            <div className="space-y-3">
              <a
                href="https://wa.me/6287778910011"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-black/5 dark:border-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-none">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">WhatsApp</div>
                  <div className="text-xs text-foreground/50">+6287778910011</div>
                </div>
              </a>

              <a
                href="mailto:quran@pradha.id"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-black/5 dark:border-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-none">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Email</div>
                  <div className="text-xs text-foreground/50">quran@pradha.id</div>
                </div>
              </a>

              <a
                href="https://github.com/PradhaID/quran-next"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-black/5 dark:border-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-500/10 flex items-center justify-center flex-none">
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">GitHub</div>
                  <div className="text-xs text-foreground/50">PradhaID/quran-next</div>
                </div>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
            <h2 className="font-semibold text-foreground mb-2">{t('viewSource')}</h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {t('viewSourceDesc')}{' '}
              <a
                href="https://github.com/PradhaID/quran-next"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                github.com/PradhaID/quran-next
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
