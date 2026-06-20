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
  const lang = locale === 'id' ? 'id' : 'en';

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
            {lang === 'id'
              ? 'Pelajari waqaf (bacaan berhenti), mad (bacaan panjang), tanda-tanda waqaf di Al-Quran, dan mad wajib munfasil.'
              : 'Learn waqf (stopping rules), mad (lengthening), stop signs in the Quran, and mad wajib munfasil.'}
          </p>
        </div>

        {/* Waqaf — Stopping */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 1: Waqaf (وقف) — Berhenti' : 'Lesson 1: Waqf (وقف) — Stopping'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Waqaf adalah berhenti membaca di akhir ayat atau di tengah ayat yang ditandai. Saat berhenti, harakat akhir diganti dengan sukun.'
              : 'Waqf means to stop recitation at the end of an ayah or at a marked stopping point. When stopping, the final vowel becomes sukun (no vowel).'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'ثُمَّ نَظَرَ', r: 'thumma nazhara...' },
              { a: 'ثُمَّ عَبَسَ', r: 'thumma abasa...' },
              { a: 'ثُمَّ أَدْبَرَ', r: 'thumma adbara...' },
              { a: 'ثُمَّ اسْتَكْبَرَ', r: 'thumma astakbara...' },
              { a: 'وَقِيلَ', r: 'wa qīla (waqf)' },
              { a: 'فَالْيَوْمَ', r: 'fal-yawma (waqf)' },
              { a: 'وَلَا يُوثَقُ', r: 'wa lā yūthaqu (waqf)' },
              { a: 'وَالسَّمَاءُ', r: 'was-samā\'u (waqf)' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Waqaf Signs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 2: Tanda-Tanda Waqaf' : 'Lesson 2: Waqf Stop Signs'}
          </h2>
          <div className="space-y-4">
            {[
              { sign: 'م', label: lang === 'id' ? 'Waqaf Lazim (Harus Berhenti)' : 'Waqf Lazim (Must Stop)', desc: lang === 'id' ? 'Jika tidak berhenti, makna berubah.' : 'If you don\'t stop here, the meaning changes.' },
              { sign: 'ط', label: lang === 'id' ? 'Waqaf Mutlak (Lebih Baik Berhenti)' : 'Waqf Mutlak (Better to Stop)', desc: lang === 'id' ? 'Berhenti lebih utama.' : 'Stopping is preferred.' },
              { sign: 'ج', label: lang === 'id' ? 'Waqaf Jaiz (Boleh Berhenti)' : 'Waqf Jaiz (Allowed to Stop)', desc: lang === 'id' ? 'Boleh berhenti, boleh lanjut.' : 'You may stop or continue.' },
              { sign: 'صلي', label: lang === 'id' ? 'Al-Wasl Awla (Lebih Baik Lanjut)' : 'Al-Wasl Awla (Better to Continue)', desc: lang === 'id' ? 'Lebih baik melanjutkan.' : 'Continuing is preferred.' },
              { sign: 'قف', label: lang === 'id' ? 'Qif (Harap Berhenti)' : 'Qif (Please Stop)', desc: lang === 'id' ? 'Disarankan berhenti — tanda khusus.' : 'It is advised to stop here.' },
            ].map((sign, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-primary flex-shrink-0 w-12 text-center">{sign.sign}</div>
                <div>
                  <div className="font-medium text-foreground text-sm">{sign.label}</div>
                  <div className="text-xs text-foreground/60">{sign.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mad — Lengthening */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 3: Mad (مد) — Bacaan Panjang' : 'Lesson 3: Mad (مد) — Lengthening'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Mad berarti memanjangkan suara huruf. Tanda mad adalah garis kecil ~ (atau mim kecil) di atas huruf. Panjang bacaan: 2, 4, atau 6 ketukan.'
              : 'Mad means lengthening the sound of a letter. The mad sign is a small wavy line ~ (or small mim) above the letter. Length: 2, 4, or 6 counts.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { a: 'قَالَ', r: 'qāla (2 counts)' },
              { a: 'قِيلَ', r: 'qīla (2 counts)' },
              { a: 'يَقُولُ', r: 'yaqūlu (2 counts)' },
              { a: 'جَاءَ', r: 'jā\'a (4-5 counts)' },
              { a: 'سُوءَ', r: 'sū\'a (4-5 counts)' },
              { a: 'جِيءَ', r: 'jī\'a (4-5 counts)' },
              { a: 'الْآنَ', r: 'al-āna (4-5 counts)' },
              { a: 'أُولَٰئِكَ', r: 'ulā\'ika (4-5 counts)' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mad Wajib Munfasil */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">
            {lang === 'id' ? 'Pelajaran 4: Mad Wajib Munfasil' : 'Lesson 4: Mad Wajib Munfasil'}
          </h2>
          <p className="text-xs text-foreground/60 mb-4">
            {lang === 'id'
              ? 'Apabila huruf mad (ا و ي) bertemu hamzah (ء) di kata yang BERBEDA, dibaca panjang 4-5 ketukan. Contoh: يَا أَيُّهَا, قُوا أَنْفُسَكُمْ'
              : 'When a mad letter (ا و ي) meets hamzah (ء) in a DIFFERENT word, lengthen 4-5 counts. Example: يَا أَيُّهَا, قُوا أَنْفُسَكُمْ'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { a: 'يَا أَيُّهَا', r: 'yā ayyuhā' },
              { a: 'إِنَّا أَنْزَلْنَا', r: 'innā anzalnā' },
              { a: 'فِي أَمْرٍ', r: 'fī amrin' },
              { a: 'قُوا أَنْفُسَكُمْ', r: 'qū anfusakum' },
              { a: 'السَّمَاءَ أُمَّهَاتِهِمْ', r: 'as-samā\'a ummahātihim' },
              { a: 'لَنَسْفَعًا بِالنَّاصِيَةِ', r: 'lanasfa\'an bin-nāsiyah' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50">
                <div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
          <h2 className="font-semibold text-foreground mb-4">{t('practice')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { a: 'مَالِكِ يَوْمِ الدِّينِ', s: lang === 'id' ? 'Tanda waqaf, mad 2-4 ketukan' : 'Waqf signs, mad 2-4 counts' },
              { a: 'إِيَّاكَ نَعْبُدُ', s: lang === 'id' ? 'Mad jaiz munfasil, waqaf' : 'Mad jaiz munfasil, waqf' },
              { a: 'اهْدِنَا الصِّرَاطَ', s: lang === 'id' ? 'Alif lam syamsiyah + mad' : 'Alif lam syamsiyah + mad' },
              { a: 'صِرَاطَ الَّذِينَ', s: lang === 'id' ? 'Mad + lam syamsiyah' : 'Mad + lam syamsiyah' },
              { a: 'أَنْعَمْتَ عَلَيْهِمْ', s: lang === 'id' ? 'Mad asli, waqaf' : 'Original mad, waqf' },
              { a: 'غَيْرِ الْمَغْضُوبِ', s: lang === 'id' ? 'Lam qamariyah, mad' : 'Lam qamariyah, mad' },
            ].map((ex, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-lg font-arabic text-foreground mb-1">{ex.a}</div>
                <div className="text-xs text-foreground/60">{ex.s}</div>
              </div>
            ))}
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
