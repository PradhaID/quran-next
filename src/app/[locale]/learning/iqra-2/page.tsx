import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import { buildOpenGraph } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LearningPage' });
  return {
    title: t('iqra2Title'),
    openGraph: buildOpenGraph(locale, '/learning/iqra-2', {
      description: t('iqra2Desc'),
    }),
  };
}

export default async function Iqra2Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LearningPage');

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-4xl mx-auto w-full">
      <SiteNav locale={locale} current="learning" />
      <section className="w-full space-y-8">
        <div className="text-center space-y-3">
          <Link href="/learning" className="text-xs text-foreground/40 hover:text-primary transition-colors tracking-wider uppercase">
            &larr; {t('backToLearning')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-light">
            {t('iqra2Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            Extend your reading with kasra (i), damma (u), long vowels (mad), and tanwin (double vowels).
          </p>
        </div>

        {/* Kasra */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 1: Kasrah (ِ) — &quot;i&quot; Sound</h2>
          <p className="text-xs text-foreground/60 mb-4">A line below the letter produces the &quot;i&quot; sound.</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {['بِ', 'تِ', 'ثِ', 'جِ', 'حِ', 'خِ', 'دِ', 'ذِ', 'رِ', 'زِ', 'سِ', 'شِ'].map((c, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{c}</div>
                <div className="text-xs text-foreground/60">bi, ti, tsi...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Damma */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 2: Dhammah (ُ) — &quot;u&quot; Sound</h2>
          <p className="text-xs text-foreground/60 mb-4">A small waw above the letter produces the &quot;u&quot; sound.</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {['بُ', 'تُ', 'ثُ', 'جُ', 'حُ', 'خُ', 'دُ', 'ذُ', 'رُ', 'زُ', 'سُ', 'شُ'].map((c, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{c}</div>
                <div className="text-xs text-foreground/60">bu, tu, tsu...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vowel comparison */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 3: Vowel Comparison</h2>
          <p className="text-xs text-foreground/60 mb-4">Practice recognizing the three vowels: fatha (a), kasra (i), damma (u).</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { a: 'بَ', i: 'بِ', u: 'بُ' },
              { a: 'تَ', i: 'تِ', u: 'تُ' },
              { a: 'جَ', i: 'جِ', u: 'جُ' },
              { a: 'دَ', i: 'دِ', u: 'دُ' },
              { a: 'سَ', i: 'سِ', u: 'سُ' },
              { a: 'مَ', i: 'مِ', u: 'مُ' },
            ].map((row, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-xl font-arabic text-foreground flex justify-center gap-3">
                  <span>{row.a}</span>
                  <span className="text-primary/40">|</span>
                  <span>{row.i}</span>
                  <span className="text-primary/40">|</span>
                  <span>{row.u}</span>
                </div>
                <div className="text-xs text-foreground/60 mt-1">a — i — u</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tanwin */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 4: Tanwin (Double Vowels)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            Tanwin doubles the vowel sound: fathatain (ً = an), kasratain (ٍ = in), dammatain (ٌ = un).
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-foreground/60 mb-2">Fathatain (ً) — &quot;an&quot;</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['بًا', 'تًا', 'ثًا', 'جًا', 'حًا', 'خًا', 'دًا', 'ذًا'].map((c, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                    <div className="text-2xl font-arabic text-foreground">{c}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/60 mb-2">Kasratain (ٍ) — &quot;in&quot;</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['بٍ', 'تٍ', 'ثٍ', 'جٍ', 'حٍ', 'خٍ', 'دٍ', 'ذٍ'].map((c, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
                    <div className="text-2xl font-arabic text-foreground">{c}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/60 mb-2">Dhammatain (ٌ) — &quot;un&quot;</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['بٌ', 'تٌ', 'ثٌ', 'جٌ', 'حٌ', 'خٌ', 'دٌ', 'ذٌ'].map((c, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30">
                    <div className="text-2xl font-arabic text-foreground">{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Combination practice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">{t('practice')}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { a: 'بَا', r: 'bā' },
              { a: 'بِي', r: 'bī' },
              { a: 'بُو', r: 'bū' },
              { a: 'تَانٍ', r: 'tānin' },
              { a: 'تِينٍ', r: 'tīnin' },
              { a: 'تُونٌ', r: 'tūnun' },
              { a: 'جَاءَ', r: 'jā\'a' },
              { a: 'مَا', r: 'mā' },
              { a: 'فِي', r: 'fī' },
              { a: 'لَهُ', r: 'lahu' },
              { a: 'بَيْتٌ', r: 'baytun' },
              { a: 'سَيْفٌ', r: 'sayfun' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/learning/iqra-1" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('prevLevel')}
          </Link>
          <Link href="/learning/iqra-3" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            {t('nextLevel')} &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
