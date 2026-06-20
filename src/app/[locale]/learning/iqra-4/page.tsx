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
    title: t('iqra4Title'),
    openGraph: buildOpenGraph(locale, '/learning/iqra-4', {
      description: t('iqra4Desc'),
    }),
  };
}

export default async function Iqra4Page({ params }: { params: Promise<{ locale: string }> }) {
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
            {t('iqra4Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            Master tasydid (shadda), lam jalalah (the name Allah), and the rules of alif lam qamariyah and syamsiyah.
          </p>
        </div>

        {/* Tasydid */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 1: Tasydid (ّ) — Doubled Letter</h2>
          <p className="text-xs text-foreground/60 mb-4">
            A small &quot;w&quot;-shaped mark (shadda) above a letter doubles it. Read the letter twice: once with sukun, once with the vowel.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { a: 'إِنَّ', r: 'inna' },
              { a: 'أَنَّ', r: 'anna' },
              { a: 'كَمَّلَ', r: 'kammala' },
              { a: 'جَمٌّ', r: 'jammun' },
              { a: 'شَدَّ', r: 'syadda' },
              { a: 'حَقٌّ', r: 'haqqun' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm font-medium text-foreground mb-2">How tasydid works:</p>
            <div dir="rtl" className="text-xl font-arabic text-foreground/80 text-center space-y-1">
              <div>إِنْ + نَ = إِنَّ</div>
              <div className="text-xs text-foreground/60">(in + na = inna) — first with sukun, then with fatha</div>
            </div>
          </div>
        </div>

        {/* Tasydid with vowels */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 2: Tasydid with Different Vowels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'رَبَّنَا', r: 'rabbanā' },
              { a: 'رَبِّ', r: 'rabbi' },
              { a: 'رَبُّ', r: 'rabbu' },
              { a: 'عِبَادٌ', r: 'ibādun' },
              { a: 'يُحِبُّ', r: 'yuhibbu' },
              { a: 'نِعْمَةٌ', r: 'ni\'matun' },
              { a: 'أُمَّةٌ', r: 'ummatun' },
              { a: 'صِدٌّ', r: 'shiddun' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lam Jalalah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 3: Lam Jalalah (اللَّه)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            When reading the name <strong>اللَّه</strong> (Allah), the lam is pronounced full/thick (tafkhim) if preceded by a fatha or damma, and thin (tarqiq) if preceded by a kasra.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'اللَّهُ', r: 'Allāhu (thick)' },
              { a: 'بِاللَّهِ', r: 'billāhi (thin)' },
              { a: 'عَبْدُ اللَّهِ', r: 'abdu llāhi (thick)' },
              { a: 'لِلَّهِ', r: 'lillāhi (thin)' },
              { a: 'رَسُولُ اللَّهِ', r: 'rasūlu llāhi (thick)' },
              { a: 'فِي اللَّهِ', r: 'fī llāhi (thin)' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alif Lam Qamariyah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 4: Alif Lam Qamariyah (الْقَمَرِيَّة)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            The lam of ال is pronounced clearly when followed by any of these 14 &quot;moon letters&quot;:
            <span className="block mt-1 font-arabic text-lg text-center text-foreground/80">أ ب ج ح خ ع غ ف ق ك م ه و ي</span>
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { a: 'الْأَرْضُ', r: 'al-ardhu' },
              { a: 'الْبَابُ', r: 'al-bābu' },
              { a: 'الْجَبَلُ', r: 'al-jabalu' },
              { a: 'الْحَقُّ', r: 'al-haqqu' },
              { a: 'الْخَيْرُ', r: 'al-khayru' },
              { a: 'الْعِلْمُ', r: 'al-ilmu' },
              { a: 'الْغَفُورُ', r: 'al-ghafūru' },
              { a: 'الْفَتْحُ', r: 'al-fat-hu' },
              { a: 'الْقَلْبُ', r: 'al-qalbu' },
              { a: 'الْكِتَابُ', r: 'al-kitābu' },
              { a: 'الْمَلِكُ', r: 'al-maliku' },
              { a: 'الْهَادِي', r: 'al-hādī' },
              { a: 'الْوَاحِدُ', r: 'al-wāhídu' },
              { a: 'الْيَمِينُ', r: 'al-yamīnu' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/50">
                <div className="text-xl font-arabic text-foreground">{ex.a}</div>
                <div className="text-xs text-foreground/60">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alif Lam Syamsiyah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">Lesson 5: Alif Lam Syamsiyah (الشَّمْسِيَّة)</h2>
          <p className="text-xs text-foreground/60 mb-4">
            The lam of ال is NOT pronounced (assimilated) when followed by any of these 14 &quot;sun letters&quot;. Instead, the following letter is doubled (tasydid):
            <span className="block mt-1 font-arabic text-lg text-center text-foreground/80">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span>
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { a: 'التَّائِبُ', r: 'at-tā\'ibu' },
              { a: 'الثِّقَةُ', r: 'ats-tsiqatu' },
              { a: 'الدِّينُ', r: 'ad-dīnu' },
              { a: 'الذِّكْرُ', r: 'adz-dzikru' },
              { a: 'الرَّحْمٰنُ', r: 'ar-rahmānu' },
              { a: 'الزَّكَاةُ', r: 'az-zakātu' },
              { a: 'السَّلَامُ', r: 'as-salāmu' },
              { a: 'الشَّمْسُ', r: 'asy-syamsu' },
              { a: 'الصَّبْرُ', r: 'ash-shabru' },
              { a: 'الضَّرُورَةُ', r: 'adh-dharūratu' },
              { a: 'الطَّرِيقُ', r: 'ath-tharīqu' },
              { a: 'الظَّلَامُ', r: 'adh-dhalāmu' },
              { a: 'اللَّطِيفُ', r: 'al-lathīfu' },
              { a: 'النُّورُ', r: 'an-nūru' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50">
                <div className="text-xl font-arabic text-foreground">{ex.a}</div>
                <div className="text-xs text-foreground/60">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/learning/iqra-3" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('prevLevel')}
          </Link>
          <Link href="/learning/iqra-5" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            {t('nextLevel')} &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
