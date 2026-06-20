import { ImageResponse } from 'next/og';
import { getSurah, getSurahTranslation, TOTAL_SURAHS } from '@/lib/quranApi';
// @ts-ignore
import ArabicShaper from 'arabic-persian-reshaper/ArabicShaper';

export const runtime = 'nodejs';

const EASTERN_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toArabicNumeral(n: number): string {
  return String(n).replace(/\d/g, d => EASTERN_DIGITS[parseInt(d, 10)]);
}

const TRANSPARENT_CHARS = new Set([
  0x0610, 0x0612, 0x0613, 0x0614, 0x0615,
  0x064B, 0x064C, 0x064D, 0x064E, 0x064F, 0x0650, 0x0651, 0x0652,
  0x0653, 0x0654, 0x0655, 0x0656, 0x0657, 0x0658, 0x0670,
  0x06D6, 0x06D7, 0x06D8, 0x06D9, 0x06DA, 0x06DB, 0x06DC,
  0x06DF, 0x06E0, 0x06E1, 0x06E2, 0x06E3, 0x06E4,
  0x06E7, 0x06E8, 0x06EA, 0x06EB, 0x06EC, 0x06ED,
]);

function reverseArabicLine(line: string): string {
  const clusters: string[] = [];
  let current = '';
  for (const ch of line) {
    if (TRANSPARENT_CHARS.has(ch.charCodeAt(0)) && current) {
      current += ch;
    } else {
      if (current) clusters.push(current);
      current = ch;
    }
  }
  if (current) clusters.push(current);
  return clusters.reverse().join('');
}

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

function stripBismillah(text: string): string {
  if (!text.startsWith(BISMILLAH)) return text;
  const rest = text.slice(BISMILLAH.length);
  return rest.startsWith(' ') ? rest.slice(1) : rest;
}

function getArabicLines(text: string, surahNum: number, ayahNum: number, fontSize: number): string[] {
  let displayText = text;
  if (ayahNum === 1 && surahNum !== 1 && surahNum !== 9) {
    displayText = stripBismillah(text);
  }
  
  const reshaped = ArabicShaper.convertArabic(displayText);
  
  // Calculate average characters per line based on font size
  let maxChars = 85;
  if (fontSize <= 18) maxChars = 218;
  else if (fontSize <= 24) maxChars = 172;
  else if (fontSize <= 32) maxChars = 132;
  else if (fontSize <= 42) maxChars = 101;
  else maxChars = 85;

  const words = reshaped.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 > maxChars) {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  // Reverse each line by grapheme clusters to render RTL in LTR engine
  return lines.map(line => reverseArabicLine(line));
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

  const arabicLength = targetAyah.text.length;
  const arabicFontSize = arabicLength > 700 ? 18 : arabicLength > 400 ? 24 : arabicLength > 200 ? 32 : arabicLength > 80 ? 42 : 52;

  const translationText = translationData?.ayahs?.find(
    a => a.numberInSurah === targetAyah.numberInSurah,
  )?.text;

  const cleanTranslation = translationText ? translationText.replace(/<[^>]*>/g, '') : '';
  const displayTranslation = cleanTranslation.length > 220
    ? cleanTranslation.substring(0, 220) + '...'
    : cleanTranslation;

  const arabicLines = getArabicLines(targetAyah.text, surahNum, targetAyah.numberInSurah, arabicFontSize);

  const baseName = locale === 'id'
    ? (surah as any).name_latin || surah.englishName
    : surah.englishName;
  const name = `${baseName} (${surah.englishNameTranslation})`;

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

        <div style={{ display: 'flex', fontSize: 18, color: '#a09070', marginBottom: 28 }}>
          Ayah {targetAyah.numberInSurah}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '90%',
            marginBottom: displayTranslation ? 16 : 0,
          }}
        >
          {arabicLines.map((line, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                fontSize: arabicFontSize,
                color: '#e0d8c8',
                textAlign: 'center',
                lineHeight: arabicLength > 150 ? 1.6 : 2,
                fontFamily: 'Noto Naskh Arabic',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', fontSize: 18, color: '#8a7a5a', marginBottom: displayTranslation ? 28 : 0 }}>
          Page {targetAyah.page} — {toArabicNumeral(targetAyah.page)}
        </div>

        {displayTranslation ? (
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
            {displayTranslation}
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
