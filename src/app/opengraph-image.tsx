import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NomadReady: Thailand — Digital Nomad Guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Cyan glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '36px', fontWeight: 700, color: '#f1f5f9' }}>
            Nomad
          </span>
          <span style={{ fontSize: '36px', fontWeight: 700, color: '#06b6d4' }}>
            Ready
          </span>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4' }} />
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Thailand, Figured Out.
        </p>

        {/* Title */}
        <h1 style={{ fontSize: '52px', fontWeight: 800, color: '#f1f5f9', textAlign: 'center', lineHeight: 1.1, maxWidth: '900px', margin: '0 0 20px 0' }}>
          The Complete Digital Nomad Guide to Thailand
        </h1>

        {/* Features */}
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          {['11 Chapters', 'AI Assistant', '5 Cities', 'Interactive Tools'].map((item) => (
            <div
              key={item}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: '1px solid #334155',
                color: '#94a3b8',
                fontSize: '16px',
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            fontSize: '14px',
          }}
        >
          <span>nomadready.com</span>
          <span style={{ margin: '0 4px' }}>&#183;</span>
          <span>Updated March 2026</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
