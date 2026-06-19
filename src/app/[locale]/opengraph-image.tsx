import { ImageResponse } from 'next/og';
// @ts-ignore
import ArabicShaper from 'arabic-persian-reshaper/ArabicShaper';

export const runtime = 'edge';


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

export default async function Image() {
  const [arabicData, latinData] = await Promise.all([
    loadFont(`${BASE}/fonts/NotoNaskhArabic-Regular.ttf`),
    loadFont(`${BASE}/fonts/Geist-Regular.ttf`),
  ]);

  const hasFonts = arabicData && latinData;

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
          padding: 60,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 72,
            color: '#e0d8c8',
            fontWeight: 700,
            fontFamily: 'Noto Naskh Arabic',
            marginBottom: 12,
          }}
        >
          {ArabicShaper.convertArabic('القرآن').split('').reverse().join('')}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#a09070',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Read the Quran with Translation
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            fontSize: 12,
            color: '#6a6575',
            letterSpacing: '0.1em',
          }}
        >
          quran.pradha.id
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: hasFonts
        ? [
            { name: 'Noto Naskh Arabic', data: arabicData, weight: 400, style: 'normal' },
            { name: 'sans-serif', data: latinData, weight: 400, style: 'normal' },
          ]
        : undefined,
    },
  );
}
