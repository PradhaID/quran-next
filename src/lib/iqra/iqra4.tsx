import type { LessonData } from '@/lib/iqra/types';

const tasydid = [
  { a: 'إِنَّ', r: 'inna' }, { a: 'أَنَّ', r: 'anna' }, { a: 'كَمَّلَ', r: 'kammala' },
  { a: 'جَمٌّ', r: 'jammun' }, { a: 'شَدَّ', r: 'syadda' }, { a: 'حَقٌّ', r: 'haqqun' },
];
const tasydidVowels = [
  { a: 'رَبَّنَا', r: 'rabbanā' }, { a: 'رَبِّ', r: 'rabbi' }, { a: 'رَبُّ', r: 'rabbu' },
  { a: 'عِبَادٌ', r: 'ibādun' }, { a: 'يُحِبُّ', r: 'yuhibbu' }, { a: 'نِعْمَةٌ', r: "ni'matun" },
  { a: 'أُمَّةٌ', r: 'ummatun' }, { a: 'صِدٌّ', r: 'shiddun' },
];
const lamJalalah = [
  { a: 'اللَّهُ', r: 'Allāhu (thick)' }, { a: 'بِاللَّهِ', r: 'billāhi (thin)' },
  { a: 'عَبْدُ اللَّهِ', r: 'abdu llāhi (thick)' }, { a: 'لِلَّهِ', r: 'lillāhi (thin)' },
  { a: 'رَسُولُ اللَّهِ', r: 'rasūlu llāhi (thick)' }, { a: 'فِي اللَّهِ', r: 'fī llāhi (thin)' },
];
const lamJalalahId = [
  { a: 'اللَّهُ', r: 'Allāhu (tebal)' }, { a: 'بِاللَّهِ', r: 'billāhi (tipis)' },
  { a: 'عَبْدُ اللَّهِ', r: 'abdu llāhi (tebal)' }, { a: 'لِلَّهِ', r: 'lillāhi (tipis)' },
  { a: 'رَسُولُ اللَّهِ', r: 'rasūlu llāhi (tebal)' }, { a: 'فِي اللَّهِ', r: 'fī llāhi (tipis)' },
];
const qamariyah = [
  { a: 'الْأَرْضُ', r: 'al-ardhu' }, { a: 'الْبَابُ', r: 'al-bābu' }, { a: 'الْجَبَلُ', r: 'al-jabalu' },
  { a: 'الْحَقُّ', r: 'al-haqqu' }, { a: 'الْخَيْرُ', r: 'al-khayru' }, { a: 'الْعِلْمُ', r: 'al-ilmu' },
  { a: 'الْغَفُورُ', r: 'al-ghafūru' }, { a: 'الْفَتْحُ', r: 'al-fat-hu' }, { a: 'الْقَلْبُ', r: 'al-qalbu' },
  { a: 'الْكِتَابُ', r: 'al-kitābu' }, { a: 'الْمَلِكُ', r: 'al-maliku' }, { a: 'الْهَادِي', r: 'al-hādī' },
  { a: 'الْوَاحِدُ', r: 'al-wāhídu' }, { a: 'الْيَمِينُ', r: 'al-yamīnu' },
];
const syamsiyah = [
  { a: 'التَّائِبُ', r: "at-tā'ibu" }, { a: 'الثِّقَةُ', r: 'ats-tsiqatu' }, { a: 'الدِّينُ', r: 'ad-dīnu' },
  { a: 'الذِّكْرُ', r: 'adz-dzikru' }, { a: 'الرَّحْمٰنُ', r: 'ar-rahmānu' }, { a: 'الزَّكَاةُ', r: 'az-zakātu' },
  { a: 'السَّلَامُ', r: 'as-salāmu' }, { a: 'الشَّمْسُ', r: 'asy-syamsu' }, { a: 'الصَّبْرُ', r: 'ash-shabru' },
  { a: 'الضَّرُورَةُ', r: 'adh-dharūratu' }, { a: 'الطَّرِيقُ', r: 'ath-tharīqu' }, { a: 'الظَّلَامُ', r: 'adh-dhalāmu' },
  { a: 'اللَّطِيفُ', r: 'al-lathīfu' }, { a: 'النُّورُ', r: 'an-nūru' },
];

function ExampleGrid({ items }: { items: Array<{ a: string; r: string }> }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">{items.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div>
  );
}

export function buildLessons(lang: string): LessonData[] {
  const isId = lang === 'id';

  return [
    {
      number: 1, id: 'tasydid-doubled-letter', title: isId ? 'Tasydid (ّ) — Huruf Ganda' : 'Tasydid (ّ) — Doubled Letter',
      pages: [
        { title: isId ? 'Pengenalan Tasydid' : 'Introduction to Tasydid', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Tanda seperti huruf "w" kecil (syaddah) di atas huruf menggandakannya.' : 'A small "w"-shaped mark (shadda) above a letter doubles it.'}</p><ExampleGrid items={tasydid} /><div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10"><p className="text-sm font-medium text-foreground mb-2">{isId ? 'Cara kerja tasydid:' : 'How tasydid works:'}</p><div dir="rtl" className="text-xl font-arabic text-foreground/80 text-center"><div>إِنْ + نَ = إِنَّ</div></div></div></div>) },
        { title: isId ? 'Latihan Tasydid' : 'Tasydid Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah huruf yang bertasydid dua kali.' : 'Read the shadda-d letter twice.'}</p><ExampleGrid items={tasydid} /></div>) },
      ],
    },
    {
      number: 2, id: 'tasydid-different-vowels', title: isId ? 'Tasydid dengan Berbagai Harakat' : 'Tasydid with Different Vowels',
      pages: [
        { title: isId ? 'Variasi Tasydid' : 'Tasydid Variations', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Tasydid dapat bergabung dengan fathah, kasrah, atau dhammah.' : 'Tasydid can combine with fatha, kasra, or damma.'}</p><ExampleGrid items={tasydidVowels} /></div>) },
        { title: isId ? 'Latihan Variasi' : 'Variation Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Perhatikan perbedaan harakat pada huruf bertasydid.' : 'Notice the vowel differences on shadda-d letters.'}</p><ExampleGrid items={tasydidVowels} /></div>) },
      ],
    },
    {
      number: 3, id: 'lam-jalalah', title: isId ? 'Lam Jalalah (اللَّه)' : 'Lam Jalalah (اللَّه)',
      pages: [
        { title: isId ? 'Aturan Lam Jalalah' : 'Lam Jalalah Rules', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Lam pada lafal اللَّه dibaca tebal (tafkhim) jika didahului fathah/dhammah, tipis (tarqiq) jika didahului kasrah.' : 'The lam in اللَّه is thick (tafkhim) if preceded by fatha/damma, thin (tarqiq) if preceded by kasra.'}</p><ExampleGrid items={isId ? lamJalalahId : lamJalalah} /></div>) },
        { title: isId ? 'Latihan Lam Jalalah' : 'Lam Jalalah Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Latih perbedaan lam tebal dan tipis.' : 'Practice thick vs thin lam.'}</p><ExampleGrid items={isId ? lamJalalahId : lamJalalah} /></div>) },
      ],
    },
    {
      number: 4, id: 'alif-lam-qamariyah', title: isId ? 'Alif Lam Qamariyah (الْقَمَرِيَّة)' : 'Alif Lam Qamariyah (الْقَمَرِيَّة)',
      pages: [
        { title: isId ? '14 Huruf Qamariyah' : '14 Moon Letters', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Lam pada ال dibaca jelas jika diikuti huruf qamariyah.' : 'Lam of ال is pronounced clearly before moon letters.'}<span className="block mt-1 font-arabic text-lg text-center text-foreground/80">أ ب ج ح خ ع غ ف ق ك م ه و ي</span></p><div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{qamariyah.map((ex, i) => (<div key={i} className="text-center p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/50"><div className="text-xl font-arabic text-foreground">{ex.a}</div><div className="text-xs text-foreground/60">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Qamariyah' : 'Qamariyah Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah "al-" dengan jelas pada kata-kata ini.' : 'Read "al-" clearly in these words.'}</p><div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{qamariyah.slice(0, 10).map((ex, i) => (<div key={i} className="text-center p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/50"><div className="text-xl font-arabic text-foreground">{ex.a}</div><div className="text-xs text-foreground/60">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 5, id: 'alif-lam-syamsiyah', title: isId ? 'Alif Lam Syamsiyah (الشَّمْسِيَّة)' : 'Alif Lam Syamsiyah (الشَّمْسِيَّة)',
      pages: [
        { title: isId ? '14 Huruf Syamsiyah' : '14 Sun Letters', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Lam pada ال tidak dibaca (lebur) jika diikuti huruf syamsiyah. Huruf setelahnya dibaca ganda.' : 'Lam of ال is assimilated before sun letters. The next letter is doubled.'}<span className="block mt-1 font-arabic text-lg text-center text-foreground/80">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span></p><div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{syamsiyah.map((ex, i) => (<div key={i} className="text-center p-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50"><div className="text-xl font-arabic text-foreground">{ex.a}</div><div className="text-xs text-foreground/60">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Syamsiyah' : 'Syamsiyah Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah tanpa mengucapkan lam. Langsung ke huruf berikutnya.' : 'Read without pronouncing the lam. Go directly to the next letter.'}</p><div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{syamsiyah.slice(0, 10).map((ex, i) => (<div key={i} className="text-center p-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50"><div className="text-xl font-arabic text-foreground">{ex.a}</div><div className="text-xs text-foreground/60">{ex.r}</div></div>))}</div></div>) },
      ],
    },
  ];
}
