'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/sanity/queries';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const bp = useBreakpoint();
  const mobile = bp === 'mobile' || bp === 'tablet';
  useEffect(() => { getProducts().then(setProducts); }, []);
  return (
    <main className="page-body" style={{ padding: mobile ? '70px 0 40px' : '90px 0 80px' }}>
      <div className="s2-gridlines" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', height: mobile ? '320px' : '420px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: mobile ? '40px 20px' : '60px 56px' }}>
          <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '0.35em' }}>Merch</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 'clamp(40px,10vw,64px)' : 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>The<br /><em style={{ color: 'rgba(240,230,208,0.85)' }}>Shop</em></h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: mobile ? '14px' : '16px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.6, maxWidth: '400px' }}>No checkout yet — reach out and we&apos;ll sort you out personally.</p>
        </div>
      </div>
      <div style={{ padding: mobile ? '40px 20px' : '60px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: mobile ? '16px' : '32px' }}>
          {products.map(p => (
            <Link key={p.slug.current} href={`/shop/${p.slug.current}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'auto', display: 'block' }}>
              <div style={{ background: 'var(--black)', transition: 'transform 0.3s' }}
                onMouseEnter={e => { if (!mobile) e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { if (!mobile) e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ aspectRatio: '3/4', background: p.imageUrl ? `url(${p.imageUrl}) center/cover no-repeat` : 'var(--bg)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.8)', border: '1px solid rgba(240,230,208,0.2)', padding: '3px 8px', background: 'rgba(7,6,13,0.6)' }}>{p.badge}</div>
                </div>
                <div style={{ padding: mobile ? '12px 4px 8px' : '20px 4px 8px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>{p.category}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: mobile ? '14px' : '18px', color: 'var(--cream)', marginBottom: '6px' }}>{p.name}</div>
                  {!mobile && <p style={{ fontSize: '11px', color: 'rgba(240,230,208,0.5)', lineHeight: 1.65, marginBottom: '14px' }}>{p.description}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(240,230,208,0.08)', paddingTop: '10px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '16px' : '20px', fontWeight: 300, color: 'rgba(240,230,208,0.85)' }}>{p.price}</div>
                    {!mobile && <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.45)' }}>Inquire →</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
