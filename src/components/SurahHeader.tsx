interface SurahHeaderProps {
  name: string;
  englishName: string;
  number: number;
}

export default function SurahHeader({ name, englishName, number }: SurahHeaderProps) {
  return (
    <div className="text-center my-10 py-6 border-y border-primary/20 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-primary/[0.03] text-8xl font-arabic select-none">۝</span>
      </div>
      <div className="relative z-10">
        <div className="text-sm uppercase tracking-widest text-primary/60 mb-2">
          {number === 1 ? '' : 'بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ'}
        </div>
        <div className="text-4xl font-arabic text-primary mb-3 leading-relaxed">{name}</div>
        <div className="text-xs uppercase tracking-widest text-foreground/40 mb-1">Surah {number}</div>
        <div className="text-lg font-bold text-foreground">{englishName}</div>
      </div>
    </div>
  );
}
