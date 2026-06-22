import type { LessonData } from '@/lib/iqra/types';

const waqfExamples = [
  { a: 'ثُمَّ نَظَرَ', r: 'thumma nazhara...' }, { a: 'ثُمَّ عَبَسَ', r: 'thumma abasa...' },
  { a: 'ثُمَّ أَدْبَرَ', r: 'thumma adbara...' }, { a: 'ثُمَّ اسْتَكْبَرَ', r: 'thumma astakbara...' },
  { a: 'وَقِيلَ', r: 'wa qīla' }, { a: 'فَالْيَوْمَ', r: 'fal-yawma' },
  { a: 'وَلَا يُوثَقُ', r: 'wa lā yūthaqu' }, { a: 'وَالسَّمَاءُ', r: 'was-samā\'u' },
];

const waqfSigns = [
  { sign: 'م', label: 'Waqf Lazim (Must Stop)', labelId: 'Waqaf Lazim (Harus Berhenti)', desc: 'If you don\'t stop here, the meaning changes.', descId: 'Jika tidak berhenti, makna berubah.' },
  { sign: 'ط', label: 'Waqf Mutlak (Better to Stop)', labelId: 'Waqaf Mutlak (Lebih Baik Berhenti)', desc: 'Stopping is preferred.', descId: 'Berhenti lebih utama.' },
  { sign: 'ج', label: 'Waqf Jaiz (Allowed to Stop)', labelId: 'Waqaf Jaiz (Boleh Berhenti)', desc: 'You may stop or continue.', descId: 'Boleh berhenti, boleh lanjut.' },
  { sign: 'صلي', label: 'Al-Wasl Awla (Better to Continue)', labelId: 'Al-Wasl Awla (Lebih Baik Lanjut)', desc: 'Continuing is preferred.', descId: 'Lebih baik melanjutkan.' },
  { sign: 'قف', label: 'Qif (Please Stop)', labelId: 'Qif (Harap Berhenti)', desc: 'It is advised to stop here.', descId: 'Disarankan berhenti — tanda khusus.' },
];

const madExamples = [
  { a: 'قَالَ', r: 'qāla (2 counts)' }, { a: 'قِيلَ', r: 'qīla (2 counts)' }, { a: 'يَقُولُ', r: 'yaqūlu (2 counts)' },
  { a: 'جَاءَ', r: "jā'a (4-5 counts)" }, { a: 'سُوءَ', r: "sū'a (4-5 counts)" }, { a: 'جِيءَ', r: "jī'a (4-5 counts)" },
  { a: 'الْآنَ', r: 'al-āna (4-5 counts)' }, { a: 'أُولَٰئِكَ', r: "ulā'ika (4-5 counts)" },
];

const munfasil = [
  { a: 'يَا أَيُّهَا', r: 'yā ayyuhā' }, { a: 'إِنَّا أَنْزَلْنَا', r: 'innā anzalnā' },
  { a: 'فِي أَمْرٍ', r: 'fī amrin' }, { a: 'قُوا أَنْفُسَكُمْ', r: 'qū anfusakum' },
  { a: 'السَّمَاءَ أُمَّهَاتِهِمْ', r: "as-samā'a ummahātihim" }, { a: 'لَنَسْفَعًا بِالنَّاصِيَةِ', r: "lanasfa'an bin-nāsiyah" },
];

const practiceVerses = [
  { a: 'مَالِكِ يَوْمِ الدِّينِ', s: 'Waqf signs, mad 2-4 counts' },
  { a: 'إِيَّاكَ نَعْبُدُ', s: 'Mad jaiz munfasil, waqf' },
  { a: 'اهْدِنَا الصِّرَاطَ', s: 'Alif lam syamsiyah + mad' },
  { a: 'أَنْعَمْتَ عَلَيْهِمْ', s: 'Original mad, waqf' },
  { a: 'غَيْرِ الْمَغْضُوبِ', s: 'Lam qamariyah, mad' },
];

export function buildLessons(lang: string): LessonData[] {
  const isId = lang === 'id';

  return [
    {
      number: 1,
      id: 'waqf-stopping',
      title: isId ? 'Waqaf (وقف) — Berhenti' : 'Waqf (وقف) — Stopping',
      pages: [
        { title: isId ? 'Pengenalan Waqaf' : 'Introduction to Waqf', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Waqaf adalah berhenti membaca di akhir ayat atau di tengah ayat yang ditandai. Saat berhenti, harakat akhir diganti dengan sukun.' : 'Waqf means to stop recitation at the end of an ayah or at a marked stopping point.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{waqfExamples.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Waqaf' : 'Waqf Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Latihan berhenti di akhir kata. Ubah harakat akhir menjadi sukun.' : 'Practice stopping at the end of words. Change the final vowel to sukun.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{waqfExamples.slice(0, 4).map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 2,
      id: 'waqf-stop-signs',
      title: isId ? 'Tanda-Tanda Waqaf' : 'Waqf Stop Signs',
      pages: [
        { title: isId ? 'Macam-macam Tanda Waqaf' : 'Types of Waqf Signs', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Setiap tanda waqaf memiliki arti berbeda tentang boleh tidaknya berhenti.' : 'Each waqf sign has a different meaning about whether to stop or continue.'}</p><div className="space-y-4">{waqfSigns.map((sign, i) => (<div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-primary flex-shrink-0 w-12 text-center">{sign.sign}</div><div><div className="font-medium text-foreground text-sm">{isId ? sign.labelId : sign.label}</div><div className="text-xs text-foreground/60">{isId ? sign.descId : sign.desc}</div></div></div>))}</div></div>) },
        { title: isId ? 'Latihan Membaca Tanda Waqaf' : 'Waqf Sign Reading Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Cari tanda-tanda waqaf ini dalam mushaf Al-Quran.' : 'Look for these waqf signs in the Quran mushaf.'}</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{waqfSigns.map((sign, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-3xl font-arabic text-primary mb-1">{sign.sign}</div><div className="text-xs text-foreground/60">{isId ? sign.labelId : sign.label}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 3,
      id: 'mad-lengthening',
      title: isId ? 'Mad (مد) — Bacaan Panjang' : 'Mad (مد) — Lengthening',
      pages: [
        { title: isId ? 'Macam-macam Mad' : 'Types of Mad', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Mad berarti memanjangkan suara huruf. Tanda mad adalah garis kecil ~ di atas huruf. Panjang: 2, 4, atau 6 ketukan.' : 'Mad means lengthening the sound of a letter. Length: 2, 4, or 6 counts.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{madExamples.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Mad' : 'Mad Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Panjangkan bacaan sesuai ketentuan mad.' : 'Lengthen the recitation according to mad rules.'}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{madExamples.slice(0, 6).map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-2xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 4,
      id: 'mad-wajib-munfasil',
      title: isId ? 'Mad Wajib Munfasil' : 'Mad Wajib Munfasil',
      pages: [
        { title: isId ? 'Pengertian Mad Wajib Munfasil' : 'Introduction to Mad Wajib Munfasil', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Apabila huruf mad (ا و ي) bertemu hamzah (ء) di kata yang BERBEDA, dibaca panjang 4-5 ketukan.' : 'When a mad letter meets hamzah in a DIFFERENT word, lengthen 4-5 counts.'}</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{munfasil.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Mad Wajib Munfasil' : 'Mad Wajib Munfasil Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Perhatikan perbedaan mad asli (2 ketukan) dan mad wajib munfasil (4-5 ketukan).' : 'Notice the difference between original mad (2 counts) and mad wajib munfasil (4-5 counts).'}</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{munfasil.slice(0, 4).map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50"><div className="text-xl font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60 font-medium">{ex.r}</div></div>))}</div></div>) },
      ],
    },
    {
      number: 5,
      id: 'combined-practice',
      title: isId ? 'Latihan Gabungan' : 'Combined Practice',
      pages: [
        { title: isId ? 'Review Semua Materi' : 'Review All Topics', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Terapkan waqaf, mad, dan mad wajib munfasil dalam ayat-ayat pendek.' : 'Apply waqf, mad, and mad wajib munfasil in short verses.'}</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{practiceVerses.map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-lg font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60">{ex.s}</div></div>))}</div></div>) },
        { title: isId ? 'Latihan Akhir' : 'Final Practice', content: (<div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5"><p className="text-xs text-foreground/60 mb-4">{isId ? 'Baca ayat-ayat Al-Fatihah dengan menerapkan semua hukum waqaf dan mad.' : 'Read verses from Al-Fatihah applying all waqf and mad rules.'}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{practiceVerses.slice(0, 4).map((ex, i) => (<div key={i} className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10"><div className="text-lg font-arabic text-foreground mb-1">{ex.a}</div><div className="text-xs text-foreground/60">{ex.s}</div></div>))}</div></div>) },
      ],
    },
  ];
}
