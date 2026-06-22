import type { LessonData } from '@/lib/iqra/types';

const letters = ['ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش'];

function VowelGrid({ vowel, translit }: { vowel: string; translit: string }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
      {letters.map((c, i) => (
        <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="text-3xl font-arabic text-foreground mb-1">{c}{vowel}</div>
          <div className="text-xs text-foreground/60">{c}{translit}</div>
        </div>
      ))}
    </div>
  );
}

const comparisonRows = [
  { a: 'بَ', i: 'بِ', u: 'بُ' },
  { a: 'تَ', i: 'تِ', u: 'تُ' },
  { a: 'جَ', i: 'جِ', u: 'جُ' },
  { a: 'دَ', i: 'دِ', u: 'دُ' },
  { a: 'سَ', i: 'سِ', u: 'سُ' },
  { a: 'مَ', i: 'مِ', u: 'مُ' },
];

const madExamples = [
  { a: 'بَا', r: 'bā (2 counts)' },
  { a: 'بِي', r: 'bī (2 counts)' },
  { a: 'بُو', r: 'bū (2 counts)' },
  { a: 'تَانٍ', r: 'tānin' },
  { a: 'تِينٍ', r: 'tīnin' },
  { a: 'تُونٌ', r: 'tūnun' },
  { a: 'جَاءَ', r: 'jā\'a' },
  { a: 'مَا', r: 'mā' },
  { a: 'فِي', r: 'fī' },
  { a: 'لَهُ', r: 'lahu' },
  { a: 'بَيْتٌ', r: 'baytun' },
  { a: 'سَيْفٌ', r: 'sayfun' },
];

const practiceWords = [
  { a: 'نَعَمْ', r: 'na\'am' },
  { a: 'إِذًا', r: 'idzan' },
  { a: 'كُتُبٌ', r: 'kutubun' },
  { a: 'سَمِعَ', r: 'sami\'a' },
  { a: 'عِلْمٌ', r: 'ilmun' },
  { a: 'شُكْرٌ', r: 'syukrun' },
];

function ExampleGrid({ items }: { items: Array<{ a: string; r: string }> }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
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

  return [
    {
      number: 1,
      id: 'kasrah-i-sound',
      title: isId ? 'Kasrah (ِ) — Bunyi "i"' : 'Kasrah (ِ) — "i" Sound',
      pages: [
        {
          title: isId ? 'Pengenalan Kasrah' : 'Introduction to Kasra',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Garis di bawah huruf menghasilkan bunyi "i".'
                  : 'A line below the letter produces the "i" sound.'}
              </p>
              <VowelGrid vowel="ِ" translit="i" />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Kasrah' : 'Kasra Practice',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId ? 'Bacalah setiap huruf dengan bunyi "i".' : 'Read each letter with the "i" sound.'}
              </p>
              <VowelGrid vowel="ِ" translit="i" />
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-xs text-foreground/60 text-center">
                  {isId ? 'Tips: Kasrah selalu di bawah huruf.' : 'Tip: Kasra is always below the letter.'}
                </p>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      number: 2,
      id: 'dhammah-u-sound',
      title: isId ? 'Dhammah (ُ) — Bunyi "u"' : 'Dhammah (ُ) — "u" Sound',
      pages: [
        {
          title: isId ? 'Pengenalan Dhammah' : 'Introduction to Damma',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Dhammah seperti huruf waw kecil di atas huruf menghasilkan bunyi "u".'
                  : 'A small waw above the letter produces the "u" sound.'}
              </p>
              <VowelGrid vowel="ُ" translit="u" />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Dhammah' : 'Damma Practice',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId ? 'Bacalah setiap huruf dengan bunyi "u".' : 'Read each letter with the "u" sound.'}
              </p>
              <VowelGrid vowel="ُ" translit="u" />
            </div>
          ),
        },
      ],
    },
    {
      number: 3,
      id: 'vowel-comparison',
      title: isId ? 'Perbandingan Harakat' : 'Vowel Comparison',
      pages: [
        {
          title: isId ? 'Tiga Harakat: Fathah, Kasrah, Dhammah' : 'Three Vowels: Fatha, Kasra, Damma',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Latihan mengenali tiga harakat: fathah (a), kasrah (i), dhammah (u).'
                  : 'Practice recognizing the three vowels: fatha (a), kasra (i), damma (u).'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {comparisonRows.map((row, i) => (
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
          ),
        },
        {
          title: isId ? 'Latihan Perbedaan Harakat' : 'Vowel Discrimination Practice',
          content: (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Bacalah kata-kata ini dengan harakat yang benar.' : 'Read these words with the correct vowel.'}
                </p>
                <ExampleGrid items={practiceWords} />
              </div>
            </div>
          ),
        },
      ],
    },
    {
      number: 4,
      id: 'tanwin-double-vowels',
      title: isId ? 'Tanwin (Vokal Rangkap)' : 'Tanwin (Double Vowels)',
      pages: [
        {
          title: isId ? 'Macam-macam Tanwin' : 'Types of Tanwin',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Tanwin menggandakan bunyi vokal: fathatain (ً = an), kasratain (ٍ = in), dammatain (ٌ = un).'
                  : 'Tanwin doubles the vowel sound: fathatain (ً = an), kasratain (ٍ = in), dammatain (ٌ = un).'}
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-foreground/60 mb-2">Fathatain (ً) — "an"</p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {['بًا', 'تًا', 'ثًا', 'جًا', 'حًا', 'خًا', 'دًا', 'ذًا'].map((c, i) => (
                      <div key={i} className="text-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50">
                        <div className="text-2xl font-arabic text-foreground">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/60 mb-2">Kasratain (ٍ) — "in"</p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {['بٍ', 'تٍ', 'ثٍ', 'جٍ', 'حٍ', 'خٍ', 'دٍ', 'ذٍ'].map((c, i) => (
                      <div key={i} className="text-center p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50">
                        <div className="text-2xl font-arabic text-foreground">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/60 mb-2">Dhammatain (ٌ) — "un"</p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {['بٌ', 'تٌ', 'ثٌ', 'جٌ', 'حٌ', 'خٌ', 'دٌ', 'ذٌ'].map((c, i) => (
                      <div key={i} className="text-center p-2 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50">
                        <div className="text-2xl font-arabic text-foreground">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Tanwin' : 'Tanwin Practice',
          content: (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Bacalah kata-kata bertanwin berikut:' : 'Read the following words with tanwin:'}
                </p>
                <ExampleGrid items={[
                  { a: 'كِتَابًا', r: 'kitāban' },
                  { a: 'مَسْجِدًا', r: 'masjidan' },
                  { a: 'رَسُولٌ', r: 'rasūlun' },
                  { a: 'مُؤْمِنٌ', r: 'mu\'minun' },
                  { a: 'سَمِيعٍ', r: 'samī\'in' },
                  { a: 'عَلِيمٍ', r: 'alīmin' },
                ]} />
              </div>
            </div>
          ),
        },
      ],
    },
    {
      number: 5,
      id: 'mad-thabii',
      title: isId ? "Mad Thabi'i (Bacaan Panjang)" : "Mad Thabi'i (Natural Lengthening)",
      pages: [
        {
          title: isId ? 'Pengertian Mad Thabii' : 'Introduction to Mad Thabi\'i',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Mad thabi\'i terjadi apabila: fathah diikuti alif (ا), kasrah diikuti ya sukun (ي), dhammah diikuti waw sukun (و). Panjangkan 2 harakat.'
                  : 'Mad thabi\'i occurs when: fatha is followed by alif (ا), kasra by ya sukun (ي), damma by waw sukun (و). Lengthen for 2 counts.'}
              </p>
              <ExampleGrid items={madExamples} />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Mad Thabii' : 'Mad Thabi\'i Practice',
          content: (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Bacalah dengan panjang 2 ketukan.' : 'Read with 2 counts of lengthening.'}
                </p>
                <ExampleGrid items={[
                  { a: 'نَارٌ', r: 'nārun' },
                  { a: 'نُورٌ', r: 'nūrun' },
                  { a: 'بِيرٌ', r: 'bīrun' },
                  { a: 'جَاءَ', r: 'jā\'a' },
                  { a: 'سُورَةٌ', r: 'sūratun' },
                  { a: 'دِينَ', r: 'dīni' },
                ]} />
              </div>
            </div>
          ),
        },
      ],
    },
  ];
}
