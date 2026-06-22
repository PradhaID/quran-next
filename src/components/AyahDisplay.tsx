import type { AyahData } from '@/lib/quranApi';
import SurahHeader from './SurahHeader';

interface AyahDisplayProps {
  ayahs: AyahData[];
  translationAyahs?: AyahData[];
  highlightAyah?: number | null;
}

export default function AyahDisplay({ ayahs, translationAyahs, highlightAyah }: AyahDisplayProps) {
  return (
    <div className="w-full">
      {ayahs.map((ayah, index) => {
        const showSurahHeader = ayah.surah
          ? ayah.numberInSurah === 1 && (index === 0 || ayahs[index - 1]?.surah?.number !== ayah.surah.number)
          : false;

        const translation = translationAyahs?.[index];
        const isHighlighted = highlightAyah != null && ayah.numberInSurah === highlightAyah;

        return (
          <div key={ayah.number} id={`ayah-${ayah.numberInSurah}`}>
            {showSurahHeader && ayah.surah && (
              <SurahHeader
                name={ayah.surah.name}
                englishName={ayah.surah.nameLatin || ayah.surah.englishName}
                number={ayah.surah.number}
                numberOfAyahs={ayah.surah.numberOfAyahs}
                translationName={ayah.surah.translationName || ayah.surah.englishNameTranslation}
              />
            )}

            <div
              className={[
                'group flex flex-col py-3 px-4 rounded-2xl transition-all duration-200 scroll-mt-24',
                isHighlighted
                  ? 'bg-primary/[0.06] border-l-4 border-primary shadow-sm'
                  : 'hover:bg-primary/[0.02]',
              ].join(' ')}
            >
              <div className="flex items-start justify-end gap-4">
                <div
                  className="text-right text-3xl md:text-4xl lg:text-5xl font-arabic leading-[2.2] text-foreground/90 flex-1 select-all"
                  dir="rtl"
                >
                  {ayah.text}
                </div>
                <div className="flex-shrink-0 mt-1.5 flex flex-col items-center gap-0.5">
                  {ayah.surah ? (
                    <a
                      href={`/${ayah.surah.number}:${ayah.numberInSurah}`}
                      className={[
                        'inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border transition-colors',
                        isHighlighted
                          ? 'bg-primary text-white border-primary'
                          : 'bg-primary/5 text-primary border-primary/10 group-hover:bg-primary/10',
                      ].join(' ')}
                    >
                      {ayah.numberInSurah}
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary text-xs font-bold border border-primary/10">
                      {ayah.numberInSurah}
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-foreground/30">
                    {ayah.page}
                  </span>
                </div>
              </div>

              {translation && (
                <div className="mt-2 text-base text-foreground/60 leading-relaxed pl-12 border-l-2 border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-md:opacity-100">
                  {translation.text}
                </div>
              )}
            </div>

            {index < ayahs.length - 1 && (
              <hr className="border-black/[0.03] dark:border-white/[0.03]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
