import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'South Charlotte Plumbing — Licensed plumber serving Myers Park, SouthPark, Ballantyne';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0F1923',
          backgroundImage: 'linear-gradient(135deg, #1B2E4A 0%, #0F1923 100%)',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#C8963E' }} />
          <div style={{ color: '#C8963E', fontSize: '24px', fontWeight: 700, letterSpacing: '4px' }}>
            SOUTH CHARLOTTE PLUMBING
          </div>
        </div>
        <div style={{ color: '#FFFFFF', fontSize: '88px', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px' }}>
          South Charlotte&rsquo;s
        </div>
        <div style={{ color: '#C8963E', fontSize: '88px', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px' }}>
          trusted plumber.
        </div>
        <div style={{ color: '#9CA3AF', fontSize: '28px', marginTop: '28px' }}>
          Licensed NC & SC · 24/7 Emergency · 980-405-4186
        </div>
      </div>
    ),
    { ...size }
  );
}
