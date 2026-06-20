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
    title: t('iqra1Title'),
    openGraph: buildOpenGraph(locale, '/learning/iqra-1', {
      description: t('iqra1Desc'),
    }),
  };
}

const lessons = [
  {
    title: 'Lesson 1: Alif to Dhal',
    letters: [
      { arabic: 'أَ', name: 'Alif', translit: 'a' },
      { arabic: 'بَ', name: 'Ba', translit: 'ba' },
      { arabic: 'تَ', name: 'Ta', translit: 'ta' },
      { arabic: 'ثَ', name: 'Tsa', translit: 'tsa' },
      { arabic: 'جَ', name: 'Jim', translit: 'ja' },
      { arabic: 'حَ', name: 'Ha', translit: 'ha' },
      { arabic: 'خَ', name: 'Kha', translit: 'kha' },
      { arabic: 'دَ', name: 'Dal', translit: 'da' },
      { arabic: 'ذَ', name: 'Dzal', translit: 'dza' },
    ],
  },
  {
    title: "Lesson 2: Ra to 'Ain",
    letters: [
      { arabic: 'رَ', name: 'Ra', translit: 'ra' },
      { arabic: 'زَ', name: 'Zai', translit: 'za' },
      { arabic: 'سَ', name: 'Sin', translit: 'sa' },
      { arabic: 'شَ', name: 'Syin', translit: 'sya' },
      { arabic: 'صَ', name: 'Shad', translit: 'sha' },
      { arabic: 'ضَ', name: 'Dhad', translit: 'dha' },
      { arabic: 'طَ', name: 'Tha', translit: 'tha' },
      { arabic: 'ظَ', name: 'Zha', translit: 'zha' },
      { arabic: 'عَ', name: 'Ain', translit: 'a' },
    ],
  },
  {
    title: 'Lesson 3: Ghain to Ya',
    letters: [
      { arabic: 'غَ', name: 'Ghain', translit: 'gha' },
      { arabic: 'فَ', name: 'Fa', translit: 'fa' },
      { arabic: 'قَ', name: 'Qaf', translit: 'qa' },
      { arabic: 'كَ', name: 'Kaf', translit: 'ka' },
      { arabic: 'لَ', name: 'Lam', translit: 'la' },
      { arabic: 'مَ', name: 'Mim', translit: 'ma' },
      { arabic: 'نَ', name: 'Nun', translit: 'na' },
      { arabic: 'هَ', name: 'Ha', translit: 'ha' },
      { arabic: 'وَ', name: 'Waw', translit: 'wa' },
      { arabic: 'يَ', name: 'Ya', translit: 'ya' },
    ],
  },
  {
    title: 'Lesson 4: Combining Letters',
    examples: [
      { arabic: 'أَبَ', reading: 'aba' },
      { arabic: 'بَتَ', reading: 'bata' },
      { arabic: 'ثَبَ', reading: 'tsaba' },
      { arabic: 'جَثَ', reading: 'jatsa' },
      { arabic: 'حَجَ', reading: 'haja' },
      { arabic: 'خَدَ', reading: 'khada' },
      { arabic: 'ذَرَ', reading: 'dzara' },
      { arabic: 'رَزَ', reading: 'raza' },
      { arabic: 'سَشَ', reading: 'sasya' },
      { arabic: 'صَضَ', reading: 'shadha' },
      { arabic: 'طَظَ', reading: 'thazha' },
      { arabic: 'عَغَ', reading: 'agha' },
    ],
  },
  {
    title: 'Lesson 5: Three-Letter Combinations',
    examples: [
      { arabic: 'أَبَجَ', reading: 'abaja' },
      { arabic: 'تَثَخَ', reading: 'tatsakha' },
      { arabic: 'جَدَحَ', reading: 'jadaha' },
      { arabic: 'خَذَرَ', reading: 'khadzara' },
      { arabic: 'زَسَشَ', reading: 'zasasya' },
      { arabic: 'صَضَطَ', reading: 'shadatha' },
      { arabic: 'ظَعَغَ', reading: "zha'agha" },
      { arabic: 'فَقَكَ', reading: 'faqaka' },
      { arabic: 'لَمَنَ', reading: 'lamana' },
      { arabic: 'هَوَيَ', reading: 'haway a' },
    ],
  },
];

export default async function Iqra1Page({ params }: { params: Promise<{ locale: string }> }) {
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
            {t('iqra1Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            Learn the 29 Hijaiyah letters with the vowel fatha (َ), pronounced &quot;a&quot;. Master each letter and its sound before combining them.
          </p>
        </div>

        {lessons.map((lesson, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{idx + 1}</span>
              {lesson.title}
            </h2>

            {'letters' in lesson ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {lesson.letters!.map((l, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="text-3xl font-arabic text-foreground mb-1">{l.arabic}</div>
                    <div className="text-xs text-foreground/60">
                      <span className="font-semibold">{l.name}</span>
                      <br />({l.translit})
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {lesson.examples!.map((ex, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="text-3xl font-arabic text-foreground mb-1">{ex.arabic}</div>
                    <div className="text-xs text-foreground/60 font-medium">{ex.reading}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Link href="/learning" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('backToLearning')}
          </Link>
          <Link href="/learning/iqra-2" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            {t('nextLevel')} &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
