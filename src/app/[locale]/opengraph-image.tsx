import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function Image() {
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
            fontFamily: 'sans-serif',
            marginBottom: 12,
          }}
        >
          القرآن
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#a09070',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
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
            fontFamily: 'sans-serif',
          }}
        >
          quran.pradha.id
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
