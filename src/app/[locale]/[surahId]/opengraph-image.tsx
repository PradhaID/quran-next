import { ImageResponse } from 'next/og';
import { getSurah, getSurahTranslation, TOTAL_SURAHS } from '@/lib/quranApi';

export const runtime = 'edge';

const EASTERN_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toArabicNumeral(n: number): string {
  return String(n).replace(/\d/g, d => EASTERN_DIGITS[parseInt(d, 10)]);
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://quran.pradha.id';

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; surahId: string }>;
}) {
  const { locale, surahId } = await params;
  const decodedId = decodeURIComponent(surahId);
  const parts = decodedId.split(':');
  const surahNum = parseInt(parts[0], 10);
  const ayahNum = parts.length > 1 ? parseInt(parts[1], 10) : null;

  if (isNaN(surahNum) || surahNum < 1 || surahNum > TOTAL_SURAHS) {
    return new ImageResponse(
      <div
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1625', color: '#a09070', fontSize: 24 }}
      >
        Not Found
      </div>,
      { width: 1200, height: 630 },
    );
  }

  const [surah, translationData, amiriData, geistData] = await Promise.all([
    getSurah(surahNum).catch(() => null),
    getSurahTranslation(surahNum, locale).catch(() => null),
    loadFont(`${BASE}/fonts/NotoNaskhArabic-Regular.ttf`),
    loadFont(`${BASE}/fonts/Geist-Regular.ttf`),
  ]);

  if (!surah) {
    return new ImageResponse(
      <div
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1625', color: '#a09070', fontSize: 24 }}
      >
        Not Found
      </div>,
      { width: 1200, height: 630 },
    );
  }

  const targetAyah = ayahNum
    ? surah.ayahs.find(a => a.numberInSurah === ayahNum)
    : surah.ayahs[0];

  if (!targetAyah) {
    return new ImageResponse(
      <div
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1625', color: '#a09070', fontSize: 24 }}
      >
        Not Found
      </div>,
      { width: 1200, height: 630 },
    );
  }

  const translationText = translationData?.ayahs?.find(
    a => a.numberInSurah === targetAyah.numberInSurah,
  )?.text;

  const name = locale === 'id'
    ? (surah as any).name_latin || surah.englishName
    : surah.englishName;

  const hasFonts = amiriData && geistData;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1625 0%, #2a2535 100%)',
          padding: '60px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 22, color: '#a09070', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {name} — {surah.number}
          </span>
        </div>

        <div style={{ display: 'flex', fontSize: 13, color: '#8a7a5a', marginBottom: 6 }}>
          page {String(targetAyah.page).padStart(3, '0')} | {toArabicNumeral(targetAyah.page)}
        </div>

        <div style={{ display: 'flex', fontSize: 14, color: '#a09070', marginBottom: 28 }}>
          Ayah {targetAyah.numberInSurah}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 52,
            color: '#e0d8c8',
            textAlign: 'center',
            lineHeight: 2,
            direction: 'rtl',
            fontFamily: 'Noto Naskh Arabic',
            maxWidth: '90%',
            marginBottom: translationText ? 28 : 0,
          }}
        >
          {targetAyah.text}
        </div>

        {translationText ? (
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: '#a09070',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: '80%',
              paddingTop: 20,
              borderTop: '1px solid rgba(160, 144, 112, 0.25)',
            }}
          >
            {translationText.replace(/<[^>]*>/g, '')}
          </div>
        ) : null}

        <div style={{ display: 'flex', position: 'absolute', bottom: 28, fontSize: 12, color: '#6a6575', letterSpacing: '0.1em' }}>
          quran.pradha.id
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: hasFonts
        ? [
            { name: 'Noto Naskh Arabic', data: amiriData, weight: 400, style: 'normal' },
            { name: 'sans-serif', data: geistData, weight: 400, style: 'normal' },
          ]
        : undefined,
    },
  );
}
