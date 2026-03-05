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

  if (!product) return <main className="page-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div style={{ color: 'var(--cream-faint)', fontSize: '11px', letterSpacing: '0.2em' }}>Loading...</div></main>;

  const handleSubmit = () => {
    if (!name || !email || !size) return alert('Please fill in name, email and size.');
    setSubmitted(true);
  };

  return (
    <main className="page-body">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 56px 80px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/shop" style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', textDecoration: 'none', cursor: 'none' }}>← All Items</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--cream-faint)', minHeight: '600px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--cream-faint)', overflow: 'hidden', minHeight: '560px', background: product.gradient }}>
            <span style={{ fontFamily: 'var(--font-sc)', fontSize: 'clamp(100px,18vw,220px)', color: 'rgba(237,232,224,0.04)', fontWeight: 300, userSelect: 'none' }}>{product.label}</span>
            <div style={{ position: 'absolute', top: '24px', left: '24px', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', border: '1px solid var(--cream-faint)', padding: '5px 12px' }}>{product.badge}</div>
          </div>
          <div style={{ padding: '56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '16px' }}>{product.category}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,5vw,72px)', lineHeight: 0.95, color: 'var(--white)', marginBottom: '24px' }}>{product.name}</h1>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 300, color: 'var(--cream-dim)', marginBottom: '28px' }}>{product.price}</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 300, lineHeight: 1.8, color: 'var(--cream-dim)', marginBottom: '40px', borderBottom: '1px solid var(--cream-faint)', paddingBottom: '32px' }}>{product.description}</p>
              <div style={{ marginBottom: '40px' }}>
                {product.specs?.map((s: any) => (
                  <div key={s._key} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--cream-faint)', fontSize: '11px' }}>
                    <span style={{ color: 'var(--cream-faint)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.label}</span>
                    <span style={{ color: 'var(--cream-dim)' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {!submitted ? (
              <div style={{ border: '1px solid var(--cream-faint)', padding: '40px' }}>
                <h3 style={{ fontFamily: 'var(--font-sc)', fontSize: '16px', letterSpacing: '0.12em', color: 'var(--white)', marginBottom: '8px', fontWeight: 300 }}>Inquire to Buy</h3>
                <p style={{ fontSize: '11px', color: 'var(--cream-faint)', lineHeight: 1.7, marginBottom: '28px' }}>No checkout yet — send us a message and we&apos;ll sort you out personally.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {[['Name', name, setName, 'text', 'Your name'], ['Email', email, setEmail, 'email', 'your@email.com']].map(([label, val, setter, type, placeholder]) => (
                    <div key={label as string}>
                      <div style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '8px' }}>{label as string}</div>
                      <input type={type as string} placeholder={placeholder as string} value={val as string}
                        onChange={e => (setter as (v: string) => void)(e.target.value)}
                        style={{ width: '100%', background: 'transparent', border: '1px solid var(--cream-faint)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '12px 14px', outline: 'none' }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '8px' }}>Size</div>
                  <select value={size} onChange={e => setSize(e.target.value)}
                    style={{ width: '100%', background: 'var(--black)', border: '1px solid var(--cream-faint)', color: size ? 'var(--cream)' : 'rgba(237,232,224,0.25)', fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '12px 14px', outline: 'none', appearance: 'none' }}>
                    <option value="">Select a size</option>
                    {['XS','S','M','L','XL','XXL'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '8px' }}>Message (optional)</div>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Anything else we should know?"
                    style={{ width: '100%', background: 'transparent', border: '1px solid var(--cream-faint)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '12px 14px', outline: 'none', resize: 'vertical', minHeight: '80px' }} />
                </div>
                <button onClick={handleSubmit} style={{ width: '100%', padding: '16px', background: 'transparent', border: '1px solid var(--cream-faint)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'none' }}>
                  Send Inquiry →
                </button>
              </div>
            ) : (
              <div style={{ border: '1px solid var(--cream-faint)', padding: '40px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', color: 'var(--cream-dim)', lineHeight: 1.6 }}>Message received — we&apos;ll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {other && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 56px 80px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '24px' }}>You might also like</div>
          <Link href={`/shop/${other.slug.current}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px', border: '1px solid var(--cream-faint)', textDecoration: 'none', color: 'inherit', cursor: 'none' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-sc)', fontSize: '18px', color: 'var(--white)', fontWeight: 300, marginBottom: '4px' }}>{other.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}>{other.category}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--cream-dim)', fontWeight: 300 }}>{other.price}</div>
              <span style={{ fontSize: '18px', color: 'var(--cream-faint)' }}>↗</span>
            </div>
          </Link>
        </div>
      )}
    </main>
  );
}
