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
    title: t('iqra6Title'),
    openGraph: buildOpenGraph(locale, '/learning/iqra-6', {
      description: t('iqra6Desc'),
    }),
  };
}

export default async function Iqra6Page({ params }: { params: Promise<{ locale: string }> }) {
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
            {t('iqra6Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            Complete the rules of nun sakinah and tanwin: idzhar, idgham, iqlab, and ikhfa. Learn to identify and apply these rules when reading the Quran.
          </p>
        </div>

        {/* Idzhar Halqi */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 1: Idzhar Halqi (إظهار حَلْقِي) — Clear Pronunciation</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When nun sakinah (نْ) or tanwin (ًٌٍ) meets one of the six throat letters (<strong>ء ه ع ح غ خ</strong>), pronounce the nun/tanwin clearly without nasalization (ghunnah).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مَنْ آمَنَ', r: 'man āmana' },
              { a: 'مَنْ هَدَى', r: 'man hadā' },
              { a: 'مَنْ عَمِلَ', r: 'man \'amila' },
              { a: 'وَمَنْ حَاوَلَ', r: 'man hāwala' },
              { a: 'مَنْ غَفَرَ', r: 'man ghafara' },
              { a: 'مَنْ خَطِئَ', r: 'man khathi\'a' },
              { a: 'غَفُورٌ رَّحِيمٌ', r: 'ghafūrun rahīmun' },
              { a: 'سَمِيعٌ عَلِيمٌ', r: 'samī\'un \'alīmun' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-200/30">
            <p className="text-xs text-foreground/60">
              <strong>Throat letters (huruf halqiyyah):</strong>
              <span className="block text-center font-arabic text-2xl text-foreground/80 mt-1">ء ه ع ح غ خ</span>
            </p>
          </div>
        </div>

        {/* Idgham Bigunnah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 2: Idgham Bi-Ghunnah (إدغام بغنة) — Merging with Nasalization</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When nun sakinah (نْ) or tanwin is followed by <strong>ي م و ن</strong>, merge the nun/tanwin into the next letter with nasalization (ghunnah) for 2 counts.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مَنْ يَّقُولُ', r: 'may yaqūlu' },
              { a: 'مَنْ مَّنَعَ', r: 'mam mana\'a' },
              { a: 'مَنْ وَّجَدَ', r: 'maw wajada' },
              { a: 'إِنْ نَّحْنُ', r: 'in nahnu' },
              { a: 'مَثَلاً يَّضْرِبُ', r: 'masalay yadribu' },
              { a: 'غَفُورٌ مَّجِيدٌ', r: 'ghafūrum majīdu' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Idgham Bila Ghunnah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 3: Idgham Bila Ghunnah (إدغام بلا غنة) — Merging without Nasalization</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When nun sakinah (نْ) or tanwin is followed by <strong>ل ر</strong>, merge the nun/tanwin into the next letter without nasalization.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مَنْ لَّمْ', r: 'mal lam' },
              { a: 'مَنْ رَّأَى', r: 'mar ra\'ā' },
              { a: 'إِنْ لَّمْ', r: 'il lam' },
              { a: 'بِئْسَ وَلَا رَهِينٌ', r: 'wa lā rahīnu' },
              { a: 'هُدًى لِّلْمُتَّقِينَ', r: 'hudal lil-muttaqīna' },
              { a: 'وَالْعَصْرِ إِنَّ', r: 'wal-\'asri inna' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Iqlab */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 4: Iqlab (إقلاب) — Conversion</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When nun sakinah (نْ) or tanwin is followed by <strong>ب (ba)</strong>, the nun sound converts to a nasalized <strong>mim (م)</strong> sound with ghunnah.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مِنْ بَعْدِ', r: 'mim ba\'di' },
              { a: 'مَنْ بَشَرٍ', r: 'mam basyarin' },
              { a: 'سَمِيعٌ بَصِيرٌ', r: 'samī\'um bashīru' },
              { a: 'عَلِيمٌ بِذَاتِ', r: '\'alīmum bidzāti' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-brown-50 dark:bg-amber-950/20 border border-amber-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ikhfa */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 5: Ikhfa Haqiqi (إخفاء حقيقي) — Hidden Pronunciation</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When nun sakinah (نْ) or tanwin is followed by any of the remaining 15 letters, pronounce the nun/tanwin in a hidden/nasalized way between idzhar and idgham.
          </p>
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/10 border border-green-200/30 mb-4">
            <p className="text-xs text-foreground/60 text-center">
              <strong>Ikhfa letters (15 huruf):</strong>
              <span className="block text-center font-arabic text-xl text-foreground/80 mt-1">ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مِنْ صَدَقَةٍ', r: 'min shadaqatin' },
              { a: 'مَنْ ذَبَحَ', r: 'man dzabaha' },
              { a: 'مِنْ ثَمَرَةٍ', r: 'min tsamaratin' },
              { a: 'مِنْ كِتَابٍ', r: 'min kitābin' },
              { a: 'مِنْ جِبَالٍ', r: 'min jibālin' },
              { a: 'مَنْ شَكَرَ', r: 'man syakara' },
              { a: 'مَنْ قَالَ', r: 'man qāla' },
              { a: 'مِنْ دَابَّةٍ', r: 'min dābbatin' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 6: Complete Rule Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Rule</th>
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Letter(s)</th>
                  <th className="text-left py-2 font-semibold text-foreground">Pronunciation</th>
                </tr>
              </thead>
              <tbody className="text-foreground/60">
                {[
                  { rule: 'Idzhar', letters: 'ء ه ع ح غ خ', pron: 'Clear nun/tanwin, no ghunnah' },
                  { rule: 'Idgham Bigunnah', letters: 'ي م و ن', pron: 'Merged with ghunnah (2 counts)' },
                  { rule: 'Idgham Bila Ghunnah', letters: 'ل ر', pron: 'Merged without ghunnah' },
                  { rule: 'Iqlab', letters: 'ب', pron: 'Nun → mim sound with ghunnah' },
                  { rule: 'Ikhfa', letters: 'ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ', pron: 'Hidden/nasalized, between idzhar & idgham' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/5 dark:border-white/5">
                    <td className="py-2 pr-4 font-medium text-foreground">{row.rule}</td>
                    <td className="py-2 pr-4 font-arabic text-lg">{row.letters}</td>
                    <td className="py-2">{row.pron}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final practice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">{t('practice')}: Reading Quranic Verses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { a: 'قُلْ هُوَ اللَّهُ أَحَدٌ', r: 'Al-Ikhlas 112:1' },
              { a: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', r: 'Al-Fatiha 1:2' },
              { a: 'الرَّحْمَٰنِ الرَّحِيمِ', r: 'Al-Fatiha 1:3' },
              { a: 'مَالِكِ يَوْمِ الدِّينِ', r: 'Al-Fatiha 1:4' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1 leading-loose">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground/60 mt-4 text-center">
            You have completed all 6 levels of Iqra! Now you can read the Quran with proper tajweed. Continue practicing by reading directly from the Quran pages.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/learning/iqra-5" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('prevLevel')}
          </Link>
          <Link href="/1:1" className="px-8 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            Read the Quran &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
