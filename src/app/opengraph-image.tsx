import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const alt = 'Paywall Skipper - Access News Without Limits';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='120'
            height='120'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#1f2937'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z' />
            <path d='M8 7h6' />
            <path d='M8 11h8' />
            <path d='M8 15h6' />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='80'
            height='80'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#10b981'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{ marginLeft: -30, marginTop: 60 }}
          >
            <path d='M12 20v-6M6 20V10M18 20V4' />
          </svg>
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Paywall Skip
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#4b5563',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Access Without Limits - Free and Easy
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
