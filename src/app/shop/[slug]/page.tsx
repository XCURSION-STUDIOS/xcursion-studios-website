'use client';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { getProduct, getProducts } from '@/sanity/queries';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [other, setOther] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getProduct(slug).then(setProduct);
    getProducts().then(all => setOther(all.find((p: any) => p.slug.current !== slug)));
  }, [slug]);

  if (!product) return <main className="page-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div style={{ color: 'rgba(240,230,208,0.7)', fontSize: '11px', letterSpacing: '0.2em' }}>Loading...</div></main>;

  const handleSubmit = () => {
    if (!name || !email || !size) return alert('Please fill in name, email and size.');
    setSubmitted(true);
  };

  return (
    <main className="page-body">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 56px 80px' }}>

        {/* Back link */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/shop" style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.5)', textDecoration: 'none', cursor: 'none' }}>← All Items</Link>
        </div>

        {/* Single grid — one middle divider via columnGap + background trick */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          gridTemplateRows: 'auto auto auto',
          columnGap: '48px',
          rowGap: '80px',
          marginBottom: '80px',
        }}>

          {/* Vertical dividers — one per row to respect row gaps */}
          <div style={{ gridColumn: '2', gridRow: '1', background: 'rgba(240,230,208,0.1)', width: '1px' }} />
          <div style={{ gridColumn: '2', gridRow: '2', background: 'rgba(240,230,208,0.1)', width: '1px' }} />
          <div style={{ gridColumn: '2', gridRow: '3', background: 'rgba(240,230,208,0.1)', width: '1px' }} />

          {/* Row 1 left — main image */}
          <div style={{ gridColumn: '1', gridRow: '1', aspectRatio: '4/5', background: product.imageUrl ? `url(${product.imageUrl}) center/cover no-repeat` : 'var(--bg)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.8)', border: '1px solid rgba(240,230,208,0.2)', padding: '3px 10px', background: 'rgba(7,6,13,0.6)' }}>{product.badge}</div>
          </div>

          {/* Row 1 right — title + form */}
          <div style={{ gridColumn: '3', gridRow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '8px' }}>
            <div>
              <div style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>{product.category}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,4vw,56px)', lineHeight: 0.95, color: 'var(--cream)', marginBottom: '16px' }}>{product.name}</h1>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 300, color: 'rgba(240,230,208,0.85)', marginBottom: '32px', borderBottom: '1px solid rgba(240,230,208,0.08)', paddingBottom: '32px' }}>{product.price}</div>
              <p style={{ fontSize: '13px', color: 'rgba(240,230,208,0.6)', lineHeight: 1.8, marginBottom: '32px' }}>{product.description}</p>
            </div>
            {!submitted ? (
              <div>
                <div style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.35)', marginBottom: '20px' }}>Inquire to Buy</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  {[['Name', name, setName, 'text', 'Your name'], ['Email', email, setEmail, 'email', 'your@email.com']].map(([label, val, setter, type, placeholder]) => (
                    <div key={label as string}>
                      <div style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.4)', marginBottom: '6px' }}>{label as string}</div>
                      <input type={type as string} placeholder={placeholder as string} value={val as string}
                        onChange={e => (setter as (v: string) => void)(e.target.value)}
                        style={{ width: '100%', background: 'transparent', border: '1px solid rgba(240,230,208,0.12)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '10px 12px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.4)', marginBottom: '6px' }}>Size</div>
                  <select value={size} onChange={e => setSize(e.target.value)}
                    style={{ width: '100%', background: 'var(--black)', border: '1px solid rgba(240,230,208,0.12)', color: size ? 'var(--cream)' : 'rgba(237,232,224,0.2)', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '10px 12px', outline: 'none', appearance: 'none' }}>
                    <option value="">Select a size</option>
                    {['XS','S','M','L','XL','XXL'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.4)', marginBottom: '6px' }}>Message (optional)</div>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Anything else we should know?"
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(240,230,208,0.12)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '10px 12px', outline: 'none', resize: 'none', height: '72px', boxSizing: 'border-box' }} />
                </div>
                <button onClick={handleSubmit} style={{ width: '100%', padding: '14px', background: 'transparent', border: '1px solid rgba(240,230,208,0.2)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'none' }}>
                  Send Inquiry →
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', color: 'var(--cream)', lineHeight: 1.6 }}>Message received —<br />we&apos;ll be in touch soon.</p>
              </div>
            )}
          </div>

          {/* Row 2 left — image 2 */}
          <div style={{ gridColumn: '3', gridRow: '2', aspectRatio: '4/5', background: product.imageUrl2 ? `url(${product.imageUrl2}) center/cover no-repeat` : 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!product.imageUrl2 && <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.15)' }}>Image 2</span>}
          </div>

          {/* Row 2 right — specs */}
          <div style={{ gridColumn: '1', gridRow: '2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.35)', marginBottom: '24px' }}>Details</div>
            {product.specs?.length > 0 ? product.specs.map((s: any) => (
              <div key={s._key} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(240,230,208,0.08)', fontSize: '11px' }}>
                <span style={{ color: 'rgba(240,230,208,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.label}</span>
                <span style={{ color: 'var(--cream)' }}>{s.value}</span>
              </div>
            )) : <p style={{ fontSize: '12px', color: 'rgba(240,230,208,0.2)', fontStyle: 'italic' }}>Add specs in Sanity studio</p>}
          </div>

          {/* Row 3 left — tagline */}
          <div style={{ gridColumn: '3', gridRow: '3', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 300, color: 'rgba(240,230,208,0.85)', lineHeight: 1.4 }}>
              {product.image3caption || 'Built for movement. Designed to last.'}
            </p>
          </div>

          {/* Row 3 right — image 3 */}
          <div style={{ gridColumn: '1', gridRow: '3', aspectRatio: '4/5', background: product.imageUrl3 ? `url(${product.imageUrl3}) center/cover no-repeat` : 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!product.imageUrl3 && <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.15)' }}>Image 3</span>}
          </div>

        </div>

        {/* You might also like */}
        {other && (
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.35)', marginBottom: '24px' }}>You might also like</div>
            <Link href={`/shop/${other.slug.current}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px', border: '1px solid rgba(240,230,208,0.1)', textDecoration: 'none', color: 'inherit', cursor: 'none' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--cream)', fontWeight: 300, marginBottom: '4px' }}>{other.name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(240,230,208,0.45)', letterSpacing: '0.1em' }}>{other.category}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--cream)', fontWeight: 300 }}>{other.price}</div>
                <span style={{ fontSize: '18px', color: 'rgba(240,230,208,0.4)' }}>↗</span>
              </div>
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
