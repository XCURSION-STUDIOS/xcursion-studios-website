'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/sanity/queries';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => { getProducts().then(setProducts); }, []);

  return (
    <main className="page-body">

      <div style={{ position: 'relative' }}>
        <div className="s2-gridlines" style={{ position: 'fixed', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 56px 60px', position: 'relative', zIndex: 1 }}>
        <div className="section-label" style={{color:"var(--gold)",letterSpacing:"0.35em"}}>Merch</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>The<br /><em style={{ color: 'rgba(240,230,208,0.85)' }}>Shop</em></h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '16px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.6, maxWidth: '400px', marginBottom: '64px' }}>No checkout yet — reach out and we&apos;ll sort you out personally.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(240,230,208,0.06)' }}>
          {products.map(p => (
            <Link key={p.slug.current} href={`/shop/${p.slug.current}`} style={{ background: 'var(--black)', textDecoration: 'none', color: 'inherit', cursor: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: p.imageUrl ? `url(${p.imageUrl}) center/cover no-repeat` : 'var(--bg)', borderRight: '1px solid var(--cream-faint)' }}>
                <span style={{ fontFamily: 'var(--font-sc)', fontSize: 'clamp(60px,10vw,130px)', color: 'rgba(237,232,224,0.04)', fontWeight: 300 }}>{p.label}</span>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', border: '1px solid var(--cream-faint)', padding: '4px 10px' }}>{p.badge}</div>
              </div>
              <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', marginBottom: '16px' }}>{p.category}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px,3vw,42px)', lineHeight: 1.0, color: 'var(--cream)', marginBottom: '16px' }}>{p.name}</div>
                  <p style={{ fontSize: '12px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.75, marginBottom: '32px' }}>{p.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--cream-faint)', paddingTop: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300, color: 'rgba(240,230,208,0.85)' }}>{p.price}</div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)' }}>Inquire →</span>
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
