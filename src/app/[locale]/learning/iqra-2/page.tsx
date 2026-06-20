import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteNav from '@/components/SiteNav';
import { buildOpenGraph, ogImage } from '@/lib/siteUrl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LearningPage' });
  return {
    title: t('iqra2Title'),
    openGraph: {
      ...buildOpenGraph(locale, '/learning/iqra-2', {
        description: t('iqra2Desc'),
      }),
      ...ogImage(locale),
    },
  };
}

const iqra1Letters = ['ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش'];

export default async function Iqra2Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LearningPage');
  const lang = locale === 'id' ? 'id' : 'en';

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-7xl mx-auto w-full">
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
            {lang === 'id'
              ? 'Kembangkan bacaan Anda dengan kasrah (i), dhammah (u), mad thabi\'i (bacaan panjang), dan tanwin (vokal rangkap).'
              : 'Extend your reading with kasra (i), damma (u), long vowels (mad thabi\'i), and tanwin (double vowels).'}
          </p>
        </div>

        {/* Kasra */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 1: Kasrah (ِ) — Bunyi "i"' : 'Lesson 1: Kasrah (ِ) — "i" Sound'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id' ? 'Garis di bawah huruf menghasilkan bunyi "i".' : 'A line below the letter produces the "i" sound.'}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {iqra1Letters.map(c => (
              <div key={c} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{c}ِ</div>
                <div className="text-xs text-foreground/60">{c}i</div>
              </div>
            ))}
          </div>
        </div>

        {/* Damma */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 2: Dhammah (ُ) — Bunyi "u"' : 'Lesson 2: Dhammah (ُ) — "u" Sound'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id' ? 'Dhammah seperti huruf waw kecil di atas huruf menghasilkan bunyi "u".' : 'A small waw above the letter produces the "u" sound.'}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {iqra1Letters.map(c => (
              <div key={c} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{c}ُ</div>
                <div className="text-xs text-foreground/60">{c}u</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vowel comparison */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 3: Perbandingan Harakat' : 'Lesson 3: Vowel Comparison'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Latihan mengenali tiga harakat: fathah (a), kasrah (i), dhammah (u).'
              : 'Practice recognizing the three vowels: fatha (a), kasra (i), damma (u).'}
          </p>
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
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 4: Tanwin (Vokal Rangkap)' : 'Lesson 4: Tanwin (Double Vowels)'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Tanwin menggandakan bunyi vokal: fathatain (ً = an), kasratain (ٍ = in), dammatain (ٌ = un).'
              : 'Tanwin doubles the vowel sound: fathatain (ً = an), kasratain (ٍ = in), dammatain (ٌ = un).'}
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-foreground/60 mb-2">Fathatain (ً) — "an"</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['بًا', 'تًا', 'ثًا', 'جًا', 'حًا', 'خًا', 'دًا', 'ذًا'].map((c, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                    <div className="text-2xl font-arabic text-foreground">{c}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/60 mb-2">Kasratain (ٍ) — "in"</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['بٍ', 'تٍ', 'ثٍ', 'جٍ', 'حٍ', 'خٍ', 'دٍ', 'ذٍ'].map((c, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
                    <div className="text-2xl font-arabic text-foreground">{c}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/60 mb-2">Dhammatain (ٌ) — "un"</p>
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

        {/* Mad Thabi'i */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 5: Mad Thabi\'i (Bacaan Panjang)' : 'Lesson 5: Mad Thabi\'i (Natural Lengthening)'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Mad thabi\'i terjadi apabila: fathah diikuti alif (ا), kasrah diikuti ya sukun (ي), dhammah diikuti waw sukun (و). Panjangkan 2 harakat.'
              : 'Mad thabi\'i occurs when: fatha is followed by alif ( ا), kasra by ya sukun ( ي), damma by waw sukun ( و). Lengthen for 2 counts.'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { a: 'بَا', r: lang === 'id' ? 'bā (panjang 2)' : 'bā (2 counts)' },
              { a: 'بِي', r: lang === 'id' ? 'bī (panjang 2)' : 'bī (2 counts)' },
              { a: 'بُو', r: lang === 'id' ? 'bū (panjang 2)' : 'bū (2 counts)' },
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
