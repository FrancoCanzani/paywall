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
          >
            <path
              fill='currentColor'
              d='M3 16h9v5H3zm-1-6h6v5H2zm7 0h6v5H9zm7 0h6v5h-6zm-3 6h8v5h-8zM3 4h8v5H3zm9 0h9v5h-9z'
            />
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
