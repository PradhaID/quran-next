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
    title: t('iqra5Title'),
    openGraph: buildOpenGraph(locale, '/learning/iqra-5', {
      description: t('iqra5Desc'),
    }),
  };
}

export default async function Iqra5Page({ params }: { params: Promise<{ locale: string }> }) {
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
            {t('iqra5Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            Learn the rules of waqf (stopping) and mad (lengthening) to recite with proper pauses and rhythm.
          </p>
        </div>

        {/* Mad Thabi'i */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 1: Mad Thabi\'i (Natural Lengthening)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            Lengthen the sound for 2 counts (harakat) when:
          </p>
          <ul className="text-xs text-foreground/60 space-y-1 mb-4 list-disc pl-4">
            <li>Fatha + alif (ا) — like <strong>بَا</strong> (bā)</li>
            <li>Kasra + ya sukun (ي) — like <strong>بِي</strong> (bī)</li>
            <li>Damma + waw sukun (و) — like <strong>بُو</strong> (bū)</li>
          </ul>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { a: 'قَالَ', r: 'qāla' },
              { a: 'سَعَى', r: 'sa\'ā' },
              { a: 'يَقُولُ', r: 'yaqūlu' },
              { a: 'يَرْمِي', r: 'yarmī' },
              { a: 'رَسُولٌ', r: 'rasūlun' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mad Wajib Muttasil */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 2: Mad Wajib Muttasil (Connected Obligatory Mad)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When mad letters (ا ي و) are followed by hamzah (ء) in the same word, lengthen for 4-5 counts.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { a: 'جَاءَ', r: 'jā\'a (4-5)' },
              { a: 'السَّمَاءُ', r: 'as-samā\'u' },
              { a: 'بَدَأَ', r: 'bada\'a' },
              { a: 'سُئِلَ', r: 'su\'ila' },
              { a: 'يَشَاءُ', r: 'yasyā\'u' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mad Jaiz Munfasil */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 3: Mad Ja\'iz Munfasil (Separated Permissible Mad)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When mad letters end one word and hamzah (ء) starts the next word, you may lengthen 4-5 counts or read 2 counts.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'بِمَا أَنْزَلَ', r: 'bimā anzala' },
              { a: 'فِي أَرْضِ', r: 'fī ardhi' },
              { a: 'لَا إِلٰهَ', r: 'lā ilāha' },
              { a: 'يَا أَيُّهَا', r: 'yā ayyuhā' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mad Arid Lissukun */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 4: Mad \'Arid Lissukun (Temporary Mad for Stopping)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When stopping at the end of a word that ends with a mad letter, lengthen 2, 4, or 6 counts. This only applies when pausing, not when continuing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'الرَّحِيمِ', r: 'ar-rahīm(i)' },
              { a: 'الْعَالَمِينَ', r: 'al-\'ālamīn(a)' },
              { a: 'الرَّحْمٰنِ', r: 'ar-rahmān(i)' },
              { a: 'نَسْتَعِينُ', r: 'nasta\'īn(u)' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mad Layyin */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 5: Mad Layyin (Soft Lengthening)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When ya (ي) or waw (و) have sukun and are preceded by a letter with fatha, pronounce them softly and lengthen slightly when stopping.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'بَيْتٌ', r: 'bayt(un)' },
              { a: 'سَوْفَ', r: 'sawf(a)' },
              { a: 'خَوْفٌ', r: 'khawf(un)' },
              { a: 'شَيْءٌ', r: 'syay\'(un)' },
              { a: 'عَيْنٌ', r: '\'ayn(un)' },
              { a: 'لَيْلٌ', r: 'layl(un)' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/50">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Waqf */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 6: Waqf (Stopping Rules)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When stopping at the end of a word in the Quran:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium mb-1">Rule 1: Last letter with sukun</p>
              <p className="text-xs text-foreground/60">The last letter is read with sukun (no vowel).</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium mb-1">Rule 2: Ta Marbutah (ة → ه)</p>
              <p className="text-xs text-foreground/60">The ة (ta marbutah) at the end becomes ه (ha) with sukun when stopping.</p>
              <div className="mt-2 flex justify-center gap-4 font-arabic text-lg text-foreground/80">
                <span>رَحْمَةٌ → رَحْمَهْ</span>
                <span>نِعْمَةٌ → نِعْمَهْ</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium mb-1">Rule 3: Alif at the end</p>
              <p className="text-xs text-foreground/60">When stopping on words ending with alif (ى ا), pronounce as a long &quot;ā&quot;.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/learning/iqra-4" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('prevLevel')}
          </Link>
          <Link href="/learning/iqra-6" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            {t('nextLevel')} &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
