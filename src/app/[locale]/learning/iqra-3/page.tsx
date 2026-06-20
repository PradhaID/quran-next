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
    title: t('iqra3Title'),
    openGraph: buildOpenGraph(locale, '/learning/iqra-3', {
      description: t('iqra3Desc'),
    }),
  };
}

export default async function Iqra3Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LearningPage');
  const lang = locale === 'id' ? 'id' : 'en';

  return (
    <main className="flex min-h-screen flex-col items-center px-8 sm:px-12 md:px-24 py-4 sm:py-6 md:py-12 max-w-4xl mx-auto w-full">
      <SiteNav locale={locale} current="learning" />
      <section className="w-full space-y-8">
        <div className="text-center space-y-3">
          <Link href="/learning" className="text-xs text-foreground/40 hover:text-primary transition-colors tracking-wider uppercase">
            &larr; {t('backToLearning')}
          </Link>
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/learning/iqra-3"
              locale="en"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                locale === 'en'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              English
            </Link>
            <Link
              href="/learning/iqra-3"
              locale="id"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                locale === 'id'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              Indonesia
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-light">
            {t('iqra3Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            {lang === 'id'
              ? 'Pelajari sukun (huruf mati), qalqalah (huruf mantul), dan alif lam (ال) sebagai awalan kata.'
              : 'Learn sukun (no vowel), qalqalah (echo letters), and the basic alif lam (ال) prefix.'}
          </p>
        </div>

        {/* Sukun */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 1: Sukun (ْ) — Huruf Mati' : 'Lesson 1: Sukun (ْ) — No Vowel'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Lingkaran kecil di atas huruf berarti huruf tersebut mati — hentikan bunyi pada huruf tersebut.'
              : 'A small circle above a letter means it has no vowel — stop the sound on that letter.'}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {['أَبْ', 'أَتْ', 'أَثْ', 'أَجْ', 'أَحْ', 'أَخْ', 'أَدْ', 'أَذْ', 'أَرْ', 'أَزْ', 'أَسْ', 'أَشْ'].map((c, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{c}</div>
                <div className="text-xs text-foreground/60">ab, at, ats...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sukun in context */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 2: Kata dengan Sukun' : 'Lesson 2: Words with Sukun'}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {[
              { a: 'أَكْلٍ', r: 'aklin' },
              { a: 'شُرْبٌ', r: 'syurbun' },
              { a: 'عِلْمٌ', r: 'ilmun' },
              { a: 'فَهْمٌ', r: 'fahmun' },
              { a: 'صَبْرٌ', r: 'shabrun' },
              { a: 'حَمْدٌ', r: 'hamdun' },
              { a: 'جَعَلَ', r: 'ja\'ala' },
              { a: 'فَعَلَ', r: 'fa\'ala' },
              { a: 'نَزَلَ', r: 'nazala' },
              { a: 'ذَهَبَ', r: 'dzahaba' },
              { a: 'رَجَعَ', r: 'raja\'a' },
              { a: 'عَمِلَ', r: 'amila' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Qalqalah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 3: Huruf Qalqalah (ق ط ب ج د)' : 'Lesson 3: Qalqalah Letters (ق ط ب ج د)'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Apabila lima huruf ini bersukun, bacalah dengan bunyi memantul: Qaf, Tha, Ba, Jim, Dal.'
              : 'When these five letters have sukun, pronounce them with a slight bounce/echo: Qaf, Tha, Ba, Jim, Dal.'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { a: 'اَقْ', name: 'Qaf', note: 'q' },
              { a: 'اَطْ', name: 'Tha', note: 'th' },
              { a: 'اَبْ', name: 'Ba', note: 'b' },
              { a: 'اَجْ', name: 'Jim', note: 'j' },
              { a: 'اَدْ', name: 'Dal', note: 'd' },
            ].map((q, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
                <div className="text-3xl font-arabic text-foreground mb-1">{q.a}</div>
                <div className="text-xs text-foreground/60">{q.name} ({q.note})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alif Lam */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 4: Alif Lam (ال)' : 'Lesson 4: Alif Lam (ال)'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Awalan ال (al) ditempelkan pada kata benda. Lam (ل) dibaca mati. Latih membaca kata dengan ال.'
              : 'The prefix ال (al) attaches to the beginning of nouns. The lam (ل) has sukun. Practice reading words with ال.'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {[
              { a: 'الْقَمَرُ', r: 'al-qamaru' },
              { a: 'الشَّمْسُ', r: 'asy-syamsu' },
              { a: 'الْبَيْتُ', r: 'al-baytu' },
              { a: 'الْكِتَابُ', r: 'al-kitābu' },
              { a: 'الرَّجُلُ', r: 'ar-rajulu' },
              { a: 'الْمَسْجِدُ', r: 'al-masjidu' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">{t('practice')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'يَقْرَأُ', r: 'yaqra\'u' },
              { a: 'تَكْتُبُ', r: 'taktubu' },
              { a: 'يَدْخُلُ', r: 'yadkhulu' },
              { a: 'تَخْرُجُ', r: 'takhruju' },
              { a: 'أَكْبَرُ', r: 'akbaru' },
              { a: 'أَحْمَدُ', r: 'ahmadu' },
              { a: 'مَكْتُوبٌ', r: 'maktūbun' },
              { a: 'مَسْكَنٌ', r: 'maskanun' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/learning/iqra-2" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('prevLevel')}
          </Link>
          <Link href="/learning/iqra-4" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            {t('nextLevel')} &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
