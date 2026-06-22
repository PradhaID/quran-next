import type { LessonData } from '@/lib/iqra/types';

const idghamData = [
  { a: 'مِنْ رَبِّهِمْ', r: 'mir rabbihim' }, { a: 'وَجَنَّاتٍ تَجْرِي', r: 'wa jannātin tajrī' },
  { a: 'لَيْلَةُ الْقَدْرِ', r: 'laylatul qadr' }, { a: 'مِنْ وَلِيٍّ', r: 'miw waliyyin' },
  { a: 'خَيْرًا مِّنْهُ', r: 'khayram minhu' }, { a: 'مِنْ نِعْمَةٍ', r: "min ni'matin" },
  { a: "فَاسْعَوْا إِلَىٰ", r: "fas'aw ilā" }, { a: 'إِنْ يَقُولُونَ', r: 'in yaqulūna' },
];

const iqlabData = [
  { a: 'مِنْ بَعْدِهِمْ', r: "mim ba'dihim" }, { a: 'خُلِقَ مِنْ بَحْمَةٍ', r: 'khuliqa min bahmatin' },
  { a: 'سَمِيعٌ بَصِيرٌ', r: "samī'um basīrun" }, { a: 'عَلِيمٌ بِذَاتِ', r: 'alīmun bidzāti' },
];

const ikhfaData = [
  { a: 'مِنْ تَحْتِهَا', r: 'min tahtihā' }, { a: 'أَنْذَرْتَهُمْ', r: 'andzartahum' },
  { a: 'عَنْ صَلَاتِهِمْ', r: 'an shalātihim' }, { a: 'مِنْ قَبْلُ', r: 'min qablu' },
  { a: 'أَنْفُسَهُمْ', r: 'anfusahum' }, { a: 'مِنْ شَيْءٍ', r: "min syay'in" },
];

const ghunnahData = [
  { a: 'إِنَّ', r: 'in-na (ghunnah)' }, { a: 'أَمَّنْ', r: 'am-man (ghunnah)' },
  { a: 'ثُمَّ', r: 'tsum-ma (ghunnah)' }, { a: 'عَنَّا', r: 'an-nā (ghunnah)' },
  { a: 'مِمَّا', r: 'mim-mā (ghunnah)' }, { a: 'يَمُنُّ', r: 'yamunnu (ghunnah)' },
  { a: 'وَلَا الضَّالِّينَ', r: 'walaḍ ḍāllīn' }, { a: 'أَنْعَمْتَ', r: 'an-amta (ikhfa)' },
];

const verses = [
  { a: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', n: 'Verse 1 — Basmalah', s: 'Lam qamariyah, basic mad, lam jalalah thin & thick', nId: 'Ayat 1 — Basmalah', sId: 'Lam qamariyah, mad asli, lam jalalah tipis & tebal' },
  { a: 'يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم', n: 'Short verse — various rules', nId: 'Ayat pendek — berbagai hukum', s: 'Mad wajib munfasil, basic mad, tasydid, lam syamsiyah', sId: 'Mad wajib munfasil, mad asli, tasydid, lam syamsiyah' },
  { a: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', n: "Surah Al-Ikhlas verse 1", nId: 'Surah Al-Ikhlas ayat 1', s: 'Qalqalah, thick lam jalalah, tanwin meets hamzah — izhar halqi', sId: 'Qalqalah, lam jalalah tebal, tanwin bertemu hamzah — izhar halqi' },
  { a: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', n: 'Verse 3', nId: 'Ayat 3', s: 'Sukun, basic mad, small qalqalah on د', sId: 'Sukun, mad asli, qalqalah sugra pada د' },
];

export function buildLessons(lang: string): LessonData[] {
  const isId = lang === 'id';

  return [
    {
      number: 1, id: 'idgham-assimilation', title: isId ? 'Idgham (إدغام) — Meleburkan' : 'Idgham (إدغام) — Assimilation',
      pages: [
        { title: isId ? 'Pengertian Idgham' : 'Introduction to Idgham', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Apabila nun sukun (نْ) atau tanwin bertemu salah satu huruf ي م و ن ر ل, nun sukun dileburkan ke huruf berikutnya.' : 'When nun sakinah or tanwin meets ي م و ن ر ل, the nun assimilates into the next letter.'}<span className="block mt-1 font-arabic text-lg text-center text-foreground/80">ي ر م ل و ن</span></p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{idghamData.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Idgham' : 'Idgham Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Perhatikan idgham dengan dan tanpa ghunnah.' : 'Notice idgham with and without ghunnah.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{idghamData.slice(0, 6).map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 2, id: 'iqlab-conversion', title: isId ? 'Iqlab (إقلاب) — Mengubah' : 'Iqlab (إقلاب) — Conversion',
      pages: [
        { title: isId ? 'Pengertian Iqlab' : 'Introduction to Iqlab', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Apabila nun sukun (نْ) atau tanwin bertemu huruf ب (ba), nun berubah menjadi bunyi mim (م) samar disertai ghunnah.' : 'When nun sakinah or tanwin meets ب, the nun converts into a hidden meem sound with ghunnah.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{iqlabData.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div><div className="text-xs text-foreground/40 mt-1">{isId ? 'نْ atau tanwin → bunyi م' : 'نْ or tanwin → م sound'}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Iqlab' : 'Iqlab Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Ucapkan bunyi "m" samar sebelum ba.' : 'Pronounce a hidden "m" sound before ba.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{iqlabData.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 3, id: 'ikhfa-hidden', title: isId ? 'Ikhfa (إخفاء) — Menyamar' : 'Ikhfa (إخفاء) — Hidden',
      pages: [
        { title: isId ? '15 Huruf Ikhfa' : '15 Ikhfa Letters', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Apabila nun sukun (نْ) atau tanwin bertemu salah satu dari 15 huruf ikhfa, nun dibaca samar.' : 'When nun sakinah or tanwin meets any of the 15 ikhfa letters, the nun is pronounced hidden.'}<span className="block mt-1 font-arabic text-lg text-center text-foreground/80">ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك</span></p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{ikhfaData.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200/50"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Ikhfa' : 'Ikhfa Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Bacalah nun dengan samar (dengung) sebelum huruf ikhfa.' : 'Pronounce the nun hidden (nasalized) before ikhfa letters.'}</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{ikhfaData.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200/50"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 4, id: 'ghunnah-nasalization', title: isId ? 'Ghunnah (غُنَّة) — Dengung' : 'Ghunnah (غُنَّة) — Nasalization',
      pages: [
        { title: isId ? 'Pengertian Ghunnah' : 'Introduction to Ghunnah', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Ghunnah adalah bunyi dengung dari hidung yang dihasilkan saat mengucapkan nun (ن) atau mim (م) yang bertasydid. Panjang ghunnah adalah 2 ketukan.' : 'Ghunnah is the nasal sound produced when pronouncing a shadda-d meem or noon. Ghunnah lasts 2 counts.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{ghunnahData.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Ghunnah' : 'Ghunnah Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Tahan dengung selama 2 ketukan pada huruf yang bertasydid.' : 'Hold the nasal sound for 2 counts on the shadda-d letter.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{ghunnahData.slice(0, 6).map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 5, id: 'full-verse-recitation', title: isId ? 'Bacaan Ayat Penuh' : 'Full Verse Recitation',
      pages: [
        { title: isId ? 'Aplikasi Semua Hukum' : 'Applying All Rules', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Terapkan semua hukum di atas dalam ayat-ayat pendek Al-Quran.' : 'Apply all the above rules in short Quranic verses.'}</p><div className="space-y-4">{verses.map((v, i) => (<div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/10"><div className="text-xl font-arabic text-foreground text-center mb-2 leading-loose">{v.a}</div><div className="text-xs font-medium text-foreground/70">{isId ? v.nId : v.n}</div><div className="text-xs text-foreground/50 mt-0.5">{isId ? v.sId : v.s}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Akhir' : 'Final Practice', content: (<div className="space-y-4"><div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Baca dengan tartil, perhatikan setiap hukum tajwid.' : 'Read with tartil, paying attention to every tajweed rule.'}</p><div className="space-y-4">{verses.slice(0, 2).map((v, i) => (<div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/10"><div className="text-xl font-arabic text-foreground text-center mb-2 leading-loose">{v.a}</div><div className="text-xs font-medium text-foreground/70">{isId ? v.nId : v.n}</div></div>))}</div></div></div>) },
      ],
    },
  ];
}
