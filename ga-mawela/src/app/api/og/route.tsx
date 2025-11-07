import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Ga Mawela Truth Platform';
  const description = searchParams.get('description') || 'Investigative journalism platform uncovering truth and accountability in South Africa.';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontSize: 32,
          fontWeight: 600,
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: '#f59e0b',
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 48, fontWeight: 'bold', color: '#0f172a' }}>GM</span>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 24,
            textAlign: 'center',
            opacity: 0.8,
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            opacity: 0.6,
          }}
        >
          truth.gamawela.org
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}