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
    title: t('iqra6Title'),
    openGraph: {
      ...buildOpenGraph(locale, '/learning/iqra-6', {
        description: t('iqra6Desc'),
      }),
      ...ogImage(locale),
    },
  };
}

export default async function Iqra6Page({ params }: { params: Promise<{ locale: string }> }) {
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
            {t('iqra6Title')}
          </h1>
          <p className="text-foreground/60 text-sm max-w-xl mx-auto">
            {lang === 'id'
              ? 'Sempurnakan bacaan dengan idgham, iqlab, ikhfa, ghunnah, dan bacaan ayat Al-Quran secara mahir.'
              : 'Perfect your recitation with idgham, iqlab, ikhfa, ghunnah, and fluent reading of Quranic verses.'}
          </p>
        </div>

        {/* Idgham */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 1: Idgham (إدغام) — Meleburkan' : 'Lesson 1: Idgham (إدغام) — Assimilation'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Apabila nun sukun (نْ) atau tanwin bertemu salah satu huruf ي م و ن ر ل, nun sukun dileburkan ke huruf berikutnya (dengan ghunnah kecuali ل dan ر).'
              : 'When nun sakinah (نْ) or tanwin meets one of the letters ي م و ن ر ل, the nun assimilates into the next letter (with ghunnah except for ل and ر).'}
            <span className="block mt-1 font-arabic text-lg text-center text-foreground/80">ي ر م ل و ن</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مِنْ رَبِّهِمْ', r: 'mir rabbihim' },
              { a: 'وَجَنَّاتٍ تَجْرِي', r: 'wa jannātin tajrī' },
              { a: 'لَيْلَةُ الْقَدْرِ', r: 'laylatul qadr' },
              { a: 'مِنْ وَلِيٍّ', r: 'miw waliyyin' },
              { a: 'خَيْرًا مِّنْهُ', r: 'khayram minhu' },
              { a: 'مِنْ نِعْمَةٍ', r: 'min ni\'matin' },
              { a: 'فَاسْعَوْا إِلَىٰ', r: 'fas\'aw ilā (idgham mutajanisain)' },
              { a: 'إِنْ يَقُولُونَ', r: 'in yaqulūna' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Iqlab */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 2: Iqlab (إقلاب) — Mengubah' : 'Lesson 2: Iqlab (إقلاب) — Conversion'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Apabila nun sukun (نْ) atau tanwin bertemu huruf ب (ba), nun berubah (iqlab) menjadi bunyi mim (م) samar disertai ghunnah.'
              : 'When nun sakinah (نْ) or tanwin meets the letter ب (ba), the nun converts (iqlab) into a hidden meem (م) sound with ghunnah.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'مِنْ بَعْدِهِمْ', r: 'mim ba\'dihim' },
              { a: 'خُلِقَ مِنْ بَحْمَةٍ', r: 'khuliqa min bahmatin' },
              { a: 'سَمِيعٌ بَصِيرٌ', r: 'samī\'um basīrun' },
              { a: 'عَلِيمٌ بِذَاتِ', r: 'alīmun bidzāti' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
                <div className="text-xs text-foreground/40 mt-1">
                  {lang === 'id' ? 'نْ atau tanwin → bunyi م' : 'نْ or tanwin → م sound'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ikhfa */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 3: Ikhfa (إخفاء) — Menyamar' : 'Lesson 3: Ikhfa (إخفاء) — Hidden'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Apabila nun sukun (نْ) atau tanwin bertemu salah satu dari 15 huruf ikhfa, nun dibaca samar antara jelas dan lebur disertai ghunnah.'
              : 'When nun sakinah (نْ) or tanwin meets any of the 15 ikhfa letters, the nun is pronounced hidden — between clear and assimilated — with ghunnah.'}
            <span className="block mt-1 font-arabic text-lg text-center text-foreground/80">
              ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك
            </span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { a: 'مِنْ تَحْتِهَا', r: 'min tahtihā' },
              { a: 'أَنْذَرْتَهُمْ', r: 'andzartahum' },
              { a: 'عَنْ صَلَاتِهِمْ', r: 'an shalātihim' },
              { a: 'مِنْ قَبْلُ', r: 'min qablu' },
              { a: 'أَنْفُسَهُمْ', r: 'anfusahum' },
              { a: 'مِنْ شَيْءٍ', r: 'min syay\'in' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ghunnah */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 4: Ghunnah (غُنَّة) — Dengung' : 'Lesson 4: Ghunnah (غُنَّة) — Nasalization'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Ghunnah adalah bunyi dengung dari hidung yang dihasilkan saat mengucapkan nun (ن) atau mim (م) yang bertasydid. Panjang ghunnah adalah 2 ketukan.'
              : 'Ghunnah is the nasal sound from the nose produced when pronouncing a shadda-d meem (مّ) or noon (نّ). Ghunnah lasts 2 counts.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'إِنَّ', r: 'in-na (ghunnah)' },
              { a: 'أَمَّنْ', r: 'am-man (ghunnah)' },
              { a: 'ثُمَّ', r: 'tsum-ma (ghunnah)' },
              { a: 'عَنَّا', r: 'an-nā (ghunnah)' },
              { a: 'مِمَّا', r: 'mim-mā (ghunnah)' },
              { a: 'يَمُنُّ', r: 'yamunnu (ghunnah)' },
              { a: 'وَلَا الضَّالِّينَ', r: 'walaḍ ḍāllīn (lam tasydid)' },
              { a: 'أَنْعَمْتَ', r: 'an-amta (ikhfa)' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Verses Practice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 5: Bacaan Ayat Penuh' : 'Lesson 5: Full Verse Recitation'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Terapkan semua hukum di atas dalam ayat-ayat pendek Al-Quran.' : 'Apply all the above rules in short Quranic verses.'}
          </p>
          <div className="space-y-4">
            {[
              {
                a: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                n: lang === 'id' ? 'Ayat 1 — Basmalah' : 'Verse 1 — Basmalah',
                s: lang === 'id' ? 'Lam qamariyah (الرَّحْمٰن & الرَّحِيم), mad asli, lam jalalah tipis & tebal' : 'Lam qamariyah (الرَّحْمٰن & الرَّحِيم), basic mad, lam jalalah thin & thick',
              },
              {
                a: 'يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم',
                n: lang === 'id' ? 'Ayat pendek — berbagai hukum' : 'Short verse — various rules',
                s: lang === 'id' ? 'Mad wajib munfasil, mad asli, tasydid, lam syamsiyah (النَّاسُ), qamariyah (ٱلَّذِى)' : 'Mad wajib munfasil, basic mad, tasydid, lam syamsiyah (النَّاسُ), qamariyah (ٱلَّذِى)',
              },
              {
                a: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
                n: lang === 'id' ? 'Surah Al-Ikhlas ayat 1' : 'Surah Al-Ikhlas verse 1',
                s: lang === 'id' ? 'Qalqalah (قُلْ), lam jalalah tebal, tanwin bertemu hamzah (أحد) — izhar halqi' : 'Qalqalah (قُلْ), thick lam jalalah, tanwin meets hamzah — izhar halqi',
              },
              {
                a: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
                n: lang === 'id' ? 'Ayat 3' : 'Verse 3',
                s: lang === 'id' ? 'Sukun, mad asli (يُولَدْ), qalqalah sugra pada د' : 'Sukun, basic mad (يُولَدْ), small qalqalah on د',
              },
            ].map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-xl font-arabic text-foreground text-center mb-2 leading-loose">{v.a}</div>
                <div className="text-xs font-medium text-foreground/70">{v.n}</div>
                <div className="text-xs text-foreground/50 mt-0.5">{v.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/learning/iqra-5" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            &larr; {t('prevLevel')}
          </Link>
          <Link href="/learning" className="px-6 py-3 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors">
            {t('finishLearning')} &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
