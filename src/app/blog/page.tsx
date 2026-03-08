'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/sanity/queries';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => { getPosts().then(setPosts); }, []);

  return (
    <main className="page-body">

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 56px 60px', position: 'relative', zIndex: 1 }}>
        <div className="section-label">Writing</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>The<br /><em style={{ color: 'var(--cream-dim)' }}>Journal</em></h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '16px', color: 'var(--cream-faint)', lineHeight: 1.6, maxWidth: '400px', marginBottom: '64px' }}>Slow essays, visual diaries and dispatches from places that shaped us.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.map((post, i) => (
            <Link key={post.slug.current} href={`/blog/${post.slug.current}`} style={{
              display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '32px',
              padding: '28px 0', borderBottom: '1px solid var(--cream-faint)',
              borderTop: i === 0 ? '1px solid var(--cream-faint)' : 'none',
              textDecoration: 'none', color: 'inherit', cursor: 'none', transition: 'padding-left 0.4s',
            }}
            onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
            onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0px')}
            >
              <div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{post.category}</span>
                  <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(237,232,224,0.2)' }}>{post.date}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 300, color: 'var(--white)', marginBottom: '6px' }}>{post.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--cream-faint)', lineHeight: 1.65 }}>{post.excerpt}</div>
              </div>
              <span style={{ fontSize: '22px', color: 'var(--cream-faint)' }}>↗</span>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}
