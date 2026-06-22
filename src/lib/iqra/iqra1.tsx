import type { LessonData } from '@/lib/iqra/types';

const letters = [
  [
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
  [
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
  [
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
];

const pairs = [
  { a: 'أَأَ', r: 'a-a' },
  { a: 'بَبَ', r: 'ba-ba' },
  { a: 'تَتَ', r: 'ta-ta' },
  { a: 'ثَثَ', r: 'tsa-tsa' },
  { a: 'جَجَ', r: 'ja-ja' },
  { a: 'حَحَ', r: 'ha-ha' },
  { a: 'خَخَ', r: 'kha-kha' },
  { a: 'دَدَ', r: 'da-da' },
  { a: 'ذَذَ', r: 'dza-dza' },
  { a: 'رَرَ', r: 'ra-ra' },
  { a: 'زَزَ', r: 'za-za' },
  { a: 'سَسَ', r: 'sa-sa' },
  { a: 'شَشَ', r: 'sya-sya' },
  { a: 'صَصَ', r: 'sha-sha' },
  { a: 'ضَضَ', r: 'dha-dha' },
  { a: 'طَطَ', r: 'tha-tha' },
  { a: 'ظَظَ', r: 'zha-zha' },
  { a: 'عَعَ', r: 'a-a' },
  { a: 'غَغَ', r: 'gha-gha' },
  { a: 'فَفَ', r: 'fa-fa' },
  { a: 'قَقَ', r: 'qa-qa' },
  { a: 'كَكَ', r: 'ka-ka' },
  { a: 'لَلَ', r: 'la-la' },
  { a: 'مَمَ', r: 'ma-ma' },
  { a: 'نَنَ', r: 'na-na' },
  { a: 'هَهَ', r: 'ha-ha' },
  { a: 'وَوَ', r: 'wa-wa' },
  { a: 'يَيَ', r: 'ya-ya' },
];

const mixedPairs = [
  { a: 'أَبَ', r: 'aba' },
  { a: 'بَتَ', r: 'bata' },
  { a: 'تَثَ', r: 'tatsa' },
  { a: 'ثَجَ', r: 'tsaja' },
  { a: 'جَحَ', r: 'jaha' },
  { a: 'حَخَ', r: 'hakha' },
  { a: 'خَدَ', r: 'khada' },
  { a: 'دَذَ', r: 'dadza' },
  { a: 'ذَرَ', r: 'dzara' },
  { a: 'رَزَ', r: 'raza' },
  { a: 'زَسَ', r: 'zasa' },
  { a: 'سَشَ', r: 'sasya' },
  { a: 'شَصَ', r: 'syasha' },
  { a: 'صَضَ', r: 'shadha' },
  { a: 'ضَطَ', r: 'dhatha' },
  { a: 'طَظَ', r: 'thazha' },
  { a: 'ظَعَ', r: 'zh-a' },
  { a: 'عَغَ', r: 'agha' },
  { a: 'غَفَ', r: 'ghafa' },
  { a: 'فَقَ', r: 'faqa' },
  { a: 'قَكَ', r: 'qaka' },
  { a: 'كَلَ', r: 'kala' },
  { a: 'لَمَ', r: 'lama' },
  { a: 'مَنَ', r: 'mana' },
  { a: 'نَهَ', r: 'naha' },
  { a: 'هَوَ', r: 'hawa' },
  { a: 'وَيَ', r: 'waya' },
];

const examples = [
  [
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
  [
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
  [
    { arabic: 'نَظَرَ', reading: 'nazhara' },
    { arabic: 'كَتَبَ', reading: 'kataba' },
    { arabic: 'جَلَسَ', reading: 'jalasa' },
    { arabic: 'سَمِعَ', reading: "sami'a" },
    { arabic: 'عَلِمَ', reading: 'alima' },
    { arabic: 'فَتَحَ', reading: 'fataha' },
    { arabic: 'ذَهَبَ', reading: 'dzahaba' },
    { arabic: 'رَجَعَ', reading: "raja'a" },
  ],
  [
    { arabic: 'يَخْرُجُ', reading: 'yakhruju' },
    { arabic: 'تَكْتُبُ', reading: 'taktubu' },
    { arabic: 'يَدْخُلُ', reading: 'yadkhulu' },
    { arabic: 'نَصْرٌ', reading: 'nashrun' },
    { arabic: 'صَبْرٌ', reading: 'shabrun' },
    { arabic: 'حَمْدٌ', reading: 'hamdun' },
    { arabic: 'عِلْمٌ', reading: 'ilmun' },
    { arabic: 'فَهْمٌ', reading: 'fahmun' },
  ],
];

const moreExamples = [
  [
    { arabic: 'يَقْرَأُ', reading: "yaqra'u" },
    { arabic: 'يَفْعَلُ', reading: "yaf'alu" },
    { arabic: 'يَشْرَبُ', reading: 'yasyrabu' },
    { arabic: 'يَلْعَبُ', reading: "yal'abu" },
  ],
  [
    { arabic: 'أَكْلٌ', reading: 'aklun' },
    { arabic: 'شُرْبٌ', reading: 'syurbun' },
    { arabic: 'فِعْلٌ', reading: "fi'lun" },
    { arabic: 'قَلْبٌ', reading: 'qalbun' },
  ],
];

function LetterGrid({ items }: { items: Array<{ arabic: string; name: string; translit: string }> }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {items.map((l, i) => (
        <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="text-3xl font-arabic text-foreground mb-1">{l.arabic}</div>
          <div className="text-xs text-foreground/60">
            <span className="font-semibold">{l.name}</span>
            <br />({l.translit})
          </div>
        </div>
      ))}
    </div>
  );
}

function ExampleGrid({ items }: { items: Array<{ arabic: string; reading: string }> }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {items.map((ex, i) => (
        <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="text-3xl font-arabic text-foreground mb-1">{ex.arabic}</div>
          <div className="text-xs text-foreground/60 font-medium">{ex.reading}</div>
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
      id: 'alif-dzal',
      title: isId ? 'Alif sampai Dzal' : 'Alif to Dhal',
      pages: [
        {
          title: isId ? 'Pengenalan Huruf Alif—Dzal' : 'Introduction: Alif—Dhal',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? '9 huruf pertama dengan harakat fathah (َ), dibaca "a".'
                  : 'The first 9 letters with the vowel fatha (َ), pronounced "a".'}
              </p>
              <LetterGrid items={letters[0]} />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Huruf Alif—Dzal' : 'Practice: Alif—Dhal',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Bacalah setiap huruf dengan fasih. Ulangi sampai lancar.'
                  : 'Read each letter fluently. Repeat until smooth.'}
              </p>
              <LetterGrid items={letters[0]} />
            </div>
          ),
        },
      ],
    },
    {
      number: 2,
      id: 'ra-ain',
      title: isId ? 'Ra sampai Ain' : "Ra to 'Ain",
      pages: [
        {
          title: isId ? 'Pengenalan Huruf Ra—Ain' : 'Introduction: Ra—\'Ain',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? '9 huruf berikutnya dengan harakat fathah.'
                  : 'The next 9 letters with the vowel fatha.'}
              </p>
              <LetterGrid items={letters[1]} />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Huruf Ra—Ain' : 'Practice: Ra—\'Ain',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Perhatikan perbedaan bunyi antara huruf-huruf yang mirip.'
                  : 'Pay attention to similar-sounding letters.'}
              </p>
              <LetterGrid items={letters[1]} />
            </div>
          ),
        },
      ],
    },
    {
      number: 3,
      id: 'ghain-ya',
      title: isId ? 'Ghain sampai Ya' : 'Ghain to Ya',
      pages: [
        {
          title: isId ? 'Pengenalan Huruf Ghain—Ya' : 'Introduction: Ghain—Ya',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? '10 huruf terakhir. Sekarang kamu sudah mengenal semua 29 huruf Hijaiyah!'
                  : 'The final 10 letters. Now you know all 29 Hijaiyah letters!'}
              </p>
              <LetterGrid items={letters[2]} />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Huruf Ghain—Ya' : 'Practice: Ghain—Ya',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Kuasai semua huruf sebelum lanjut ke pelajaran berikutnya.'
                  : 'Master all letters before moving to the next lesson.'}
              </p>
              <LetterGrid items={letters[2]} />
            </div>
          ),
        },
      ],
    },
    {
      number: 4,
      id: 'same-letter-pairs',
      title: isId ? 'Pasangan Huruf Sama' : 'Same-Letter Pairs',
      pages: [
        {
          title: isId ? 'Dua Huruf Sama' : 'Two Identical Letters',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Latih membaca dua huruf yang SAMA, tidak digabung (sambung). Setiap huruf dibaca terpisah dengan bunyi "a".'
                  : 'Practice reading two IDENTICAL letters without connecting. Each letter is read separately with the "a" sound.'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {pairs.map((ex, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50">
                    <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
                    <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Pasangan Sama' : 'Same-Letter Practice',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Fokus: setiap huruf dibaca mandiri dengan fathah — أَ + أَ = أَأَ. Jangan digabung menjadi satu!' 
                  : 'Focus: each letter reads independently with fatha — أَ + أَ = أَأَ. Do not merge them!'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {pairs.slice(0, 16).map((ex, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50">
                    <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
                    <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      number: 5,
      id: 'different-letter-pairs',
      title: isId ? 'Pasangan Huruf Berbeda' : 'Different-Letter Pairs',
      pages: [
        {
          title: isId ? 'Dua Huruf Berbeda' : 'Two Different Letters',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Dua huruf hijaiah BERBEDA yang masing-masing berharakat fathah. Baca dari kanan ke kiri, huruf per huruf.'
                  : 'Two DIFFERENT hijaiyah letters each with fatha. Read from right to left, letter by letter.'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {mixedPairs.map((ex, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
                    <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Pasangan Berbeda' : 'Mixed-Pair Practice',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Pastikan setiap huruf terbaca jelas. Jangan terburu-buru.'
                  : 'Make sure each letter is read clearly. Do not rush.'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {mixedPairs.slice(0, 20).map((ex, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="text-3xl font-arabic text-foreground mb-1">{ex.a}</div>
                    <div className="text-xs text-foreground/60 font-medium">{ex.r}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      number: 6,
      id: 'combining-letters',
      title: isId ? 'Menggabungkan Huruf' : 'Combining Letters',
      pages: [
        {
          title: isId ? 'Gabungan Dua Huruf' : 'Two-Letter Combinations',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Latihan membaca dua huruf yang digabung. Baca dari kanan ke kiri.'
                  : 'Practice reading two combined letters. Read from right to left.'}
              </p>
              <ExampleGrid items={examples[0]} />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Membaca' : 'Reading Practice',
          content: (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Kata-kata pendek latihan membaca.' : 'Short words for reading practice.'}
                </p>
                <ExampleGrid items={moreExamples[0]} />
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Lebih banyak contoh gabungan huruf.' : 'More combined letter examples.'}
                </p>
                <ExampleGrid items={moreExamples[1]} />
              </div>
            </div>
          ),
        },
      ],
    },
    {
      number: 7,
      id: 'three-letter-combinations',
      title: isId ? 'Kombinasi Tiga Huruf' : 'Three-Letter Combinations',
      pages: [
        {
          title: isId ? 'Gabungan Tiga Huruf' : 'Three-Letter Combinations',
          content: (
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
              <p className="text-xs text-foreground/60 mb-4">
                {isId
                  ? 'Latihan membaca tiga huruf yang digabung menjadi kata.'
                  : 'Practice reading three-letter word combinations.'}
              </p>
              <ExampleGrid items={examples[1]} />
            </div>
          ),
        },
        {
          title: isId ? 'Latihan Akhir' : 'Final Practice',
          content: (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Bacalah kata-kata berikut dengan lancar.' : 'Read the following words fluently.'}
                </p>
                <ExampleGrid items={examples[2]} />
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5">
                <p className="text-xs text-foreground/60 mb-4">
                  {isId ? 'Latihan lanjutan — kata dengan tiga huruf.' : 'Advanced practice — three-letter words.'}
                </p>
                <ExampleGrid items={examples[3]} />
              </div>
            </div>
          ),
        },
      ],
    },
  ];
}
