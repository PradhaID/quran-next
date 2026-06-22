import type { LessonData } from '@/lib/iqra/types';

const sukunExamples = ['أَبْ', 'أَتْ', 'أَثْ', 'أَجْ', 'أَحْ', 'أَخْ', 'أَدْ', 'أَذْ', 'أَرْ', 'أَزْ', 'أَسْ', 'أَشْ'];
const sukunWords = [
  { a: 'أَكْلٍ', r: 'aklin' }, { a: 'شُرْبٌ', r: 'syurbun' }, { a: 'عِلْمٌ', r: 'ilmun' },
  { a: 'فَهْمٌ', r: 'fahmun' }, { a: 'صَبْرٌ', r: 'shabrun' }, { a: 'حَمْدٌ', r: 'hamdun' },
  { a: 'جَعَلَ', r: "ja'ala" }, { a: 'فَعَلَ', r: "fa'ala" }, { a: 'نَزَلَ', r: 'nazala' },
  { a: 'ذَهَبَ', r: 'dzahaba' }, { a: 'رَجَعَ', r: "raja'a" }, { a: 'عَمِلَ', r: 'amila' },
];
const qalqalahLetters = [
  { a: 'اَقْ', name: 'Qaf', note: 'q' }, { a: 'اَطْ', name: 'Tha', note: 'th' },
  { a: 'اَبْ', name: 'Ba', note: 'b' }, { a: 'اَجْ', name: 'Jim', note: 'j' },
  { a: 'اَدْ', name: 'Dal', note: 'd' },
];
const alifLamWords = [
  { a: 'الْقَمَرُ', r: 'al-qamaru' }, { a: 'الشَّمْسُ', r: 'asy-syamsu' },
  { a: 'الْبَيْتُ', r: 'al-baytu' }, { a: 'الْكِتَابُ', r: 'al-kitābu' },
  { a: 'الرَّجُلُ', r: 'ar-rajulu' }, { a: 'الْمَسْجِدُ', r: 'al-masjidu' },
];
const practiceWords = [
  { a: 'يَقْرَأُ', r: "yaqra'u" }, { a: 'تَكْتُبُ', r: 'taktubu' }, { a: 'يَدْخُلُ', r: 'yadkhulu' },
  { a: 'تَخْرُجُ', r: 'takhruju' }, { a: 'أَكْبَرُ', r: 'akbaru' }, { a: 'أَحْمَدُ', r: 'ahmadu' },
  { a: 'مَكْتُوبٌ', r: 'maktūbun' }, { a: 'مَسْكَنٌ', r: 'maskanun' },
];

function Grid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
      {items.map((c, i) => (
        <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="text-3xl font-arabic text-foreground">{c}</div>
        </div>
      ))}
    </div>
  );
}

function ExampleGrid({ items }: { items: Array<{ a: string; r: string }> }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {items.map((ex, i) => (
        <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
          <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
        </div>
      ))}
    </div>
  );
}

export function buildLessons(lang: string): LessonData[] {
  const isId = lang === 'id';
  const sukun = isId ? 'Sukun (ْ) — Huruf Mati' : 'Sukun (ْ) — No Vowel';
  const sukunP1 = isId ? 'Lingkaran kecil di atas huruf berarti huruf tersebut mati — hentikan bunyi pada huruf tersebut.' : 'A small circle above a letter means it has no vowel — stop the sound on that letter.';
  const sukunP2 = isId ? 'Latihan membaca huruf bersukun. Hentikan bunyi di huruf yang bertanda sukun.' : 'Practice reading letters with sukun. Stop the sound on the letter marked with sukun.';

  return [
    {
      number: 1, id: 'sukun-no-vowel', title: sukun,
      pages: [
        { title: isId ? 'Pengenalan Sukun' : 'Introduction to Sukun', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{sukunP1}</p><Grid items={sukunExamples} /></div>) },
        { title: isId ? 'Latihan Sukun' : 'Sukun Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{sukunP2}</p><Grid items={sukunExamples} /></div>) },
      ],
    },
    {
      number: 2, id: 'words-with-sukun', title: isId ? 'Kata dengan Sukun' : 'Words with Sukun',
      pages: [
        { title: isId ? 'Contoh Kata Bersukun' : 'Words with Sukun Examples', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Perhatikan letak sukun dalam kata-kata berikut.' : 'Notice the sukun position in these words.'}</p><ExampleGrid items={sukunWords} /></div>) },
        { title: isId ? 'Latihan Membaca' : 'Reading Practice', content: (<div className="space-y-4"><div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah kata-kata ini dengan benar.' : 'Read these words correctly.'}</p><ExampleGrid items={sukunWords.slice(0, 6)} /></div></div>) },
      ],
    },
    {
      number: 3, id: 'qalqalah-letters', title: isId ? 'Huruf Qalqalah (ق ط ب ج د)' : 'Qalqalah Letters (ق ط ب ج د)',
      pages: [
        { title: isId ? 'Pengenalan Qalqalah' : 'Introduction to Qalqalah', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Apabila lima huruf ini bersukun, bacalah dengan bunyi memantul.' : 'When these five letters have sukun, pronounce with a slight bounce/echo.'}</p><div className="grid grid-cols-3 sm:grid-cols-5 gap-3">{qalqalahLetters.map((q, i) => (<div key={i} className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50"><div className="text-3xl font-arabic text-foreground mb-1">{q.a}</div><div className="text-xs text-foreground/60">{q.name} ({q.note})</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Qalqalah' : 'Qalqalah Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah dengan bunyi memantul pada huruf qalqalah.' : 'Read with a bouncing sound on the qalqalah letters.'}</p><ExampleGrid items={[{ a: 'اَقْ', r: 'aq' }, { a: 'اَطْ', r: 'ath' }, { a: 'اَبْ', r: 'ab' }, { a: 'اَجْ', r: 'aj' }, { a: 'اَدْ', r: 'ad' }, { a: 'حَقٌّ', r: 'haqqun' }]} /></div>) },
      ],
    },
    {
      number: 4, id: 'alif-lam', title: isId ? 'Alif Lam (ال)' : 'Alif Lam (ال)',
      pages: [
        { title: isId ? 'Pengenalan Alif Lam' : 'Introduction to Alif Lam', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Awalan ال (al) ditempelkan pada kata benda. Lam (ل) dibaca mati.' : 'The prefix ال (al) attaches to nouns. The lam (ل) has sukun.'}</p><ExampleGrid items={alifLamWords} /></div>) },
        { title: isId ? 'Latihan Alif Lam' : 'Alif Lam Practice', content: (<div className="space-y-4"><div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah kata-kata dengan alif lam.' : 'Read words with alif lam.'}</p><ExampleGrid items={[{ a: 'الرَّحْمٰنِ', r: 'ar-rahmāni' }, { a: 'الرَّحِيمِ', r: 'ar-rahīmi' }, { a: 'الْحَمْدُ', r: 'al-hamdu' }, { a: 'الْعَالَمِينَ', r: 'al-ālamīna' }]} /></div></div>) },
      ],
    },
    {
      number: 5, id: 'combined-practice', title: isId ? 'Latihan Gabungan' : 'Combined Practice',
      pages: [
        { title: isId ? 'Review Sukun, Qalqalah, Alif Lam' : 'Review: Sukun, Qalqalah, Alif Lam', content: (<div className="space-y-4"><div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Terapkan semua yang telah dipelajari.' : 'Apply everything you have learned.'}</p><ExampleGrid items={practiceWords} /></div></div>) },
        { title: isId ? 'Latihan Akhir' : 'Final Practice', content: (<div className="space-y-4"><div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah kalimat-kalimat pendek ini.' : 'Read these short sentences.'}</p><ExampleGrid items={[{ a: 'الْحَمْدُ لِلَّهِ', r: 'al-hamdu lillāh' }, { a: 'بِسْمِ اللَّهِ', r: 'bismillāh' }, { a: 'مَا شَاءَ اللَّهُ', r: 'mā syā\'allāh' }]} /></div></div>) },
      ],
    },
  ];
}
