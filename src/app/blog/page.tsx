'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/sanity/queries';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const bp = useBreakpoint();
  const mobile = bp === 'mobile' || bp === 'tablet';
  useEffect(() => { getPosts().then(setPosts); }, []);
  return (
    <main className="page-body" style={{ padding: mobile ? '70px 0 40px' : '90px 0 80px' }}>
      <div className="s2-gridlines" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', height: mobile ? '240px' : '420px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: mobile ? '40px 20px' : '60px 56px' }}>
          <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '0.35em' }}>Writing</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 'clamp(40px,10vw,64px)' : 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>The<br /><em style={{ color: 'rgba(240,230,208,0.85)' }}>Journal</em></h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: mobile ? '14px' : '16px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.6, maxWidth: '400px' }}>Slow essays, visual diaries and dispatches from places that shaped us.</p>
        </div>
      </div>
      <div style={{ padding: mobile ? '40px 20px' : '60px 56px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.map((post, i) => (
            <Link key={post.slug.current} href={`/blog/${post.slug.current}`} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr auto', alignItems: 'center', gap: mobile ? '4px' : '32px', padding: mobile ? '20px 0' : '28px 0', borderBottom: '1px solid var(--cream-faint)', borderTop: i === 0 ? '1px solid var(--cream-faint)' : 'none', textDecoration: 'none', color: 'inherit', cursor: 'auto', transition: 'padding-left 0.4s' }}
              onMouseEnter={e => { if (!mobile) e.currentTarget.style.paddingLeft = '12px'; }}
              onMouseLeave={e => { if (!mobile) e.currentTarget.style.paddingLeft = '0px'; }}
            >
              <div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)' }}>{post.category}</span>
                  <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(240,230,208,0.55)' }}>{post.date}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '18px' : 'clamp(20px,2.2vw,28px)', fontWeight: 300, color: 'var(--cream)', marginBottom: '6px' }}>{post.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.65 }}>{post.excerpt}</div>
              </div>
              {!mobile && <span style={{ fontSize: '22px', color: 'rgba(240,230,208,0.7)' }}>↗</span>}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
