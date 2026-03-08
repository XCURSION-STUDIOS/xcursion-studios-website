'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/sanity/queries';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => { getProducts().then(setProducts); }, []);

  return (
    <main className="page-body">

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 56px 60px', position: 'relative', zIndex: 1 }}>
        <div className="section-label">Merch</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>The<br /><em style={{ color: 'var(--cream-dim)' }}>Shop</em></h1>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '16px', color: 'var(--cream-faint)', lineHeight: 1.6, maxWidth: '300px', marginBottom: '24px' }}>No checkout yet — reach out and we&apos;ll sort you out personally.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'var(--cream-faint)' }}>
          {products.map(p => (
            <Link key={p.slug.current} href={`/shop/${p.slug.current}`} style={{ background: 'var(--black)', textDecoration: 'none', color: 'inherit', cursor: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: p.gradient, borderRight: '1px solid var(--cream-faint)' }}>
                <span style={{ fontFamily: 'var(--font-sc)', fontSize: 'clamp(60px,10vw,130px)', color: 'rgba(237,232,224,0.04)', fontWeight: 300 }}>{p.label}</span>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cream-faint)', border: '1px solid var(--cream-faint)', padding: '4px 10px' }}>{p.badge}</div>
              </div>
              <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '16px' }}>{p.category}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px,3vw,42px)', lineHeight: 1.0, color: 'var(--white)', marginBottom: '16px' }}>{p.name}</div>
                  <p style={{ fontSize: '12px', color: 'var(--cream-faint)', lineHeight: 1.75, marginBottom: '32px' }}>{p.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--cream-faint)', paddingTop: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300, color: 'var(--cream-dim)' }}>{p.price}</div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)' }}>Inquire →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </main>
  );
}
